import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import { facilities } from "../data/facilities";
import { pillars } from "../data/pillars";

/* ------------------------------------------------------------------ */
/*  The Zendale Ecosystem — the site's one maximal 3D moment.          */
/*                                                                     */
/*  The signature: 13 nodes (8 facilities, 5 capability pillars)       */
/*  begin scattered in space, then converge and interlock into the     */
/*  Zendale Z itself — pillars anchoring the corners and centre of     */
/*  the letterform, facilities forming the strokes, filaments          */
/*  tracing the brand's diagonal. The ecosystem assembles the logo:    */
/*  many parts, one system, one mark.                                  */
/* ------------------------------------------------------------------ */

interface NodeDef {
  id: string;
  label: string;
  code: string;
  kind: "facility" | "pillar";
  motif?: string;
  target: THREE.Vector3;
  start: THREE.Vector3;
  action: { type: "external"; url: string } | { type: "route"; to: string };
}

/** Deterministic pseudo-random so the scatter is identical every load. */
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/* The Z letterform in the XZ-tilted plane the camera faces.
   Corners: A top-left, B top-right, C bottom-left, D bottom-right. */
const A = new THREE.Vector3(-2.35, 1.45, 0);
const B = new THREE.Vector3(2.35, 1.45, 0);
const C = new THREE.Vector3(-2.35, -1.45, 0);
const D = new THREE.Vector3(2.35, -1.45, 0);

const lerp3 = (p: THREE.Vector3, q: THREE.Vector3, t: number) =>
  new THREE.Vector3().lerpVectors(p, q, t);

function scatter(i: number): THREE.Vector3 {
  return new THREE.Vector3(
    (seeded(i, 1) - 0.5) * 15,
    (seeded(i, 2) - 0.5) * 10,
    (seeded(i, 3) - 0.5) * 10 - 2
  );
}

/** Slight per-node depth so the letterform reads as a structure, not a decal. */
function depth(i: number): number {
  return (seeded(i, 11) - 0.5) * 0.55;
}

function buildNodes(): NodeDef[] {
  const f = facilities;
  const p = pillars;
  const act = (x: (typeof f)[number]): NodeDef["action"] =>
    x.internal ? { type: "route", to: x.internal } : { type: "external", url: x.url };
  // Placement along the Z path: pillars hold the four corners + the centre;
  // facilities form the strokes between them.
  const placed: { def: (typeof f)[number] | (typeof p)[number]; kind: "facility" | "pillar"; pos: THREE.Vector3 }[] = [
    { def: p[0], kind: "pillar", pos: A.clone() },                    // Clinical — top-left corner
    { def: f[0], kind: "facility", pos: lerp3(A, B, 0.34) },          // Sky High
    { def: f[1], kind: "facility", pos: lerp3(A, B, 0.67) },          // Sky High ICU
    { def: p[1], kind: "pillar", pos: B.clone() },                    // Corporate — top-right corner
    { def: f[2], kind: "facility", pos: lerp3(B, C, 0.26) },          // Finnih
    { def: p[4], kind: "pillar", pos: lerp3(B, C, 0.5).setZ(0.5) },   // Partnerships — the heart of the Z, pushed forward
    { def: f[3], kind: "facility", pos: lerp3(B, C, 0.74) },          // Lifecentre
    { def: p[2], kind: "pillar", pos: C.clone() },                    // MedTech — bottom-left corner
    { def: f[4], kind: "facility", pos: lerp3(C, D, 0.22) },          // Kindred Path
    { def: f[5], kind: "facility", pos: lerp3(C, D, 0.45) },          // Endoscopy
    { def: f[6], kind: "facility", pos: lerp3(C, D, 0.68) },          // Med Support
    { def: f[7], kind: "facility", pos: lerp3(C, D, 0.85) },          // VHELAR
    { def: p[3], kind: "pillar", pos: D.clone() },                    // Consulting — bottom-right corner
  ];
  return placed.map((n, i) => ({
    id: n.def.id,
    label: n.def.name,
    code: n.def.code,
    kind: n.kind,
    motif: n.kind === "pillar" ? (n.def as (typeof p)[number]).motif : undefined,
    target: n.pos.clone().add(new THREE.Vector3(0, 0, n.pos.z === 0.5 ? 0 : depth(i))),
    start: scatter(i),
    action:
      n.kind === "pillar"
        ? { type: "route", to: (n.def as (typeof p)[number]).route }
        : act(n.def as (typeof f)[number]),
  }));
}

/** Filaments: the Z path itself, plus cross-braces from the centre pillar to the corners. */
function buildLinks(nodes: NodeDef[]): [number, number][] {
  const links: [number, number][] = [];
  for (let i = 0; i < nodes.length - 1; i++) links.push([i, i + 1]); // the letterform path
  const centre = 5; // Partnerships
  [0, 3, 7, 12].forEach((corner) => links.push([centre, corner])); // the network braces
  return links;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function NodeMesh({
  node,
  progressRef,
  hovered,
  setHovered,
  onActivate,
}: {
  node: NodeDef;
  progressRef: React.MutableRefObject<number>;
  hovered: boolean;
  setHovered: (id: string | null) => void;
  onActivate: (node: NodeDef) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const scaleTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!group.current) return;
    const p = easeOutCubic(progressRef.current);
    tmp.lerpVectors(node.start, node.target, p);
    // A gentle breathing drift once assembled, so the structure feels alive.
    const t = state.clock.elapsedTime;
    const idx = node.code.charCodeAt(4);
    tmp.y += Math.sin(t * 0.6 + idx) * 0.03 * p;
    group.current.position.copy(tmp);
    const s = hovered ? 1.4 : 1;
    group.current.scale.lerp(scaleTarget.set(s, s, s), 0.12);
    group.current.rotation.y = t * (node.kind === "pillar" ? 0.4 : 0.22);
  });

  const steel = "#6E93C9"; // lifted for bloom on ink navy
  const brass = "#E0B26E";
  const color = node.kind === "pillar" ? brass : steel;

  return (
    <group
      ref={group}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(node.id); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(null); document.body.style.cursor = ""; }}
      onClick={(e) => { e.stopPropagation(); onActivate(node); }}
    >
      {node.kind === "facility" && (
        <>
          <mesh>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 2.4 : 1.1} wireframe />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.065, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 4 : 2.4} />
          </mesh>
        </>
      )}
      {node.motif === "lattice" && (
        <mesh>
          <icosahedronGeometry args={[0.27, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 2.6 : 1.3} wireframe />
        </mesh>
      )}
      {node.motif === "briefcase" && (
        <mesh>
          <boxGeometry args={[0.36, 0.27, 0.27]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 2.2 : 1.1} />
        </mesh>
      )}
      {node.motif === "circuit" && (
        <>
          <mesh>
            <boxGeometry args={[0.36, 0.36, 0.36]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 2.6 : 1.3} wireframe />
          </mesh>
          <mesh>
            <boxGeometry args={[0.13, 0.13, 0.13]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} />
          </mesh>
        </>
      )}
      {node.motif === "compass" && (
        <mesh>
          <octahedronGeometry args={[0.27, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 2.4 : 1.2} flatShading />
        </mesh>
      )}
      {node.motif === "rings" && (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.08, 0, 0]}>
            <torusGeometry args={[0.18, 0.03, 12, 32]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 2.8 : 1.5} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.08, 0, 0]}>
            <torusGeometry args={[0.18, 0.03, 12, 32]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 2.8 : 1.5} />
          </mesh>
        </>
      )}
    </group>
  );
}

function Filaments({ nodes, links, progressRef }: { nodes: NodeDef[]; links: [number, number][]; progressRef: React.MutableRefObject<number> }) {
  const geom = useRef<THREE.BufferGeometry>(null);
  const positions = useMemo(() => new Float32Array(links.length * 6), [links]);
  const a = useMemo(() => new THREE.Vector3(), []);
  const b = useMemo(() => new THREE.Vector3(), []);
  const settled = useRef(false);

  useFrame(() => {
    if (!geom.current || settled.current) return;
    const p = easeOutCubic(progressRef.current);
    links.forEach(([i, j], k) => {
      a.lerpVectors(nodes[i].start, nodes[i].target, p);
      b.lerpVectors(nodes[j].start, nodes[j].target, p);
      positions.set([a.x, a.y, a.z, b.x, b.y, b.z], k * 6);
    });
    const attr = geom.current.getAttribute("position") as THREE.BufferAttribute | undefined;
    if (!attr) {
      geom.current.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    } else {
      attr.needsUpdate = true;
    }
    if (p >= 1) settled.current = true;
  });

  return (
    <lineSegments>
      <bufferGeometry ref={geom} />
      <lineBasicMaterial color="#4A6FA5" transparent opacity={0.45} />
    </lineSegments>
  );
}

/** A slow orbital ring of fine particles circling the letterform. */
function OrbitRing({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const count = 90;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const r = 3.6 + seeded(i, 13) * 0.5;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = (seeded(i, 14) - 0.5) * 0.5;
      arr[i * 3 + 2] = Math.sin(a) * r * 0.45;
    }
    return arr;
  }, []);
  useFrame((_, delta) => {
    if (ref.current && !reduced) ref.current.rotation.y += delta * 0.05;
  });
  return (
    <points ref={ref} rotation={[0.4, 0, -0.14]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#C89B5A" size={0.035} transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function Particles({ count }: { count: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (seeded(i, 7) - 0.5) * 18;
      arr[i * 3 + 1] = (seeded(i, 8) - 0.5) * 12;
      arr[i * 3 + 2] = (seeded(i, 9) - 0.5) * 14 - 3;
    }
    return arr;
  }, [count]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#4A6FA5" size={0.028} transparent opacity={0.35} sizeAttenuation />
    </points>
  );
}

function SceneContents({
  reduced,
  mobile,
  onHoverLabel,
}: {
  reduced: boolean;
  mobile: boolean;
  onHoverLabel: (label: string | null) => void;
}) {
  const nodes = useMemo(buildNodes, []);
  const links = useMemo(() => buildLinks(nodes), [nodes]);
  const progressRef = useRef(reduced ? 1 : 0);
  const world = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();

  useFrame((state, delta) => {
    if (!reduced && progressRef.current < 1) {
      progressRef.current = Math.min(1, progressRef.current + delta / 2.8);
    }
    if (world.current && !reduced) {
      const t = state.clock.elapsedTime;
      // The Z sways rather than spins — the mark stays readable — and
      // follows the pointer with a restrained parallax.
      const targetY = Math.sin(t * 0.14) * 0.22 + state.pointer.x * 0.28;
      const targetX = 0.16 + state.pointer.y * -0.12;
      world.current.rotation.y += (targetY - world.current.rotation.y) * 0.04;
      world.current.rotation.x += (targetX - world.current.rotation.x) * 0.04;
    }
  });

  function setHovered(id: string | null) {
    setHoveredId(id);
    const n = nodes.find((x) => x.id === id);
    onHoverLabel(n ? `${n.code} · ${n.label}` : null);
  }

  function activate(node: NodeDef) {
    if (node.action.type === "external") {
      window.open(node.action.url, "_blank", "noopener,noreferrer");
    } else {
      navigate(node.action.to);
    }
  }

  return (
    <>
      <fog attach="fog" args={["#0B1B33", 7, 17]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 5, 6]} intensity={38} color="#DCE6F2" />
      <pointLight position={[-5, -3, 3]} intensity={20} color="#C89B5A" />
      <group ref={world} rotation={[0.16, 0, 0]}>
        {nodes.map((n) => (
          <NodeMesh
            key={n.id}
            node={n}
            progressRef={progressRef}
            hovered={hoveredId === n.id}
            setHovered={setHovered}
            onActivate={activate}
          />
        ))}
        <Filaments nodes={nodes} links={links} progressRef={progressRef} />
        <OrbitRing reduced={reduced} />
      </group>
      <Particles count={mobile ? 130 : 480} />
      {/* Bloom is what separates "dots and lines" from luminous structure.
          Disabled on mobile to protect framerate; fog still gives depth. */}
      {!mobile && (
        <EffectComposer>
          <Bloom intensity={0.85} luminanceThreshold={0.25} luminanceSmoothing={0.6} mipmapBlur />
          <Vignette eskil={false} offset={0.18} darkness={0.75} />
        </EffectComposer>
      )}
    </>
  );
}

export default function EcosystemScene({
  reduced,
  mobile,
  onHoverLabel,
}: {
  reduced: boolean;
  mobile: boolean;
  onHoverLabel: (label: string | null) => void;
}) {
  return (
    <Canvas
      dpr={mobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 0.4, 7.6], fov: 44 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      aria-hidden="true"
    >
      <SceneContents reduced={reduced} mobile={mobile} onHoverLabel={onHoverLabel} />
    </Canvas>
  );
}
