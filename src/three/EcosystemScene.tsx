import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import { facilities } from "../data/facilities";
import { pillars } from "../data/pillars";

/* ------------------------------------------------------------------ */
/*  The Zendale Ecosystem — the site's one maximal 3D moment.          */
/*  Eight facility nodes and five capability pillars begin scattered,  */
/*  then converge and interlock into one rotating structure:           */
/*  many parts, one system.                                            */
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

function buildNodes(): NodeDef[] {
  const nodes: NodeDef[] = [];
  facilities.forEach((f, i) => {
    const a = (i / facilities.length) * Math.PI * 2;
    nodes.push({
      id: f.id,
      label: f.name,
      code: f.code,
      kind: "facility",
      target: new THREE.Vector3(Math.cos(a) * 3.3, Math.sin(i * 2.1) * 0.55, Math.sin(a) * 3.3),
      start: new THREE.Vector3(
        (seeded(i, 1) - 0.5) * 14,
        (seeded(i, 2) - 0.5) * 9,
        (seeded(i, 3) - 0.5) * 10 - 2
      ),
      action: f.internal ? { type: "route", to: f.internal } : { type: "external", url: f.url },
    });
  });
  pillars.forEach((p, i) => {
    const a = (i / pillars.length) * Math.PI * 2 + 0.5;
    nodes.push({
      id: p.id,
      label: p.name,
      code: p.code,
      kind: "pillar",
      motif: p.motif,
      target: new THREE.Vector3(Math.cos(a) * 1.7, Math.cos(i * 1.7) * 0.35, Math.sin(a) * 1.7),
      start: new THREE.Vector3(
        (seeded(i + 20, 4) - 0.5) * 12,
        (seeded(i + 20, 5) - 0.5) * 8,
        (seeded(i + 20, 6) - 0.5) * 9 - 1
      ),
      action: { type: "route", to: p.route },
    });
  });
  return nodes;
}

/** Filaments: each facility links to its two nearest pillars; pillars form an inner ring. */
function buildLinks(nodes: NodeDef[]): [number, number][] {
  const links: [number, number][] = [];
  const pillarIdx = nodes.map((n, i) => (n.kind === "pillar" ? i : -1)).filter((i) => i >= 0);
  nodes.forEach((n, i) => {
    if (n.kind !== "facility") return;
    const sorted = [...pillarIdx].sort(
      (a, b) => n.target.distanceTo(nodes[a].target) - n.target.distanceTo(nodes[b].target)
    );
    links.push([i, sorted[0]], [i, sorted[1]]);
  });
  for (let k = 0; k < pillarIdx.length; k++) {
    links.push([pillarIdx[k], pillarIdx[(k + 1) % pillarIdx.length]]);
  }
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

  useFrame((state) => {
    if (!group.current) return;
    const p = easeOutCubic(progressRef.current);
    tmp.lerpVectors(node.start, node.target, p);
    group.current.position.copy(tmp);
    const s = hovered ? 1.35 : 1;
    group.current.scale.lerp(new THREE.Vector3(s, s, s), 0.12);
    group.current.rotation.y = state.clock.elapsedTime * (node.kind === "pillar" ? 0.35 : 0.2);
  });

  const steel = "#4A6FA5";
  const brass = "#C89B5A";
  const color = node.kind === "pillar" ? brass : steel;

  return (
    <group
      ref={group}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(node.id); document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { setHovered(null); document.body.style.cursor = ""; }}
      onClick={(e) => { e.stopPropagation(); onActivate(node); }}
    >
      {/* Each node carries its own subtle geometry */}
      {node.kind === "facility" && (
        <>
          <mesh>
            <octahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.9 : 0.45} wireframe />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.07, 16, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} />
          </mesh>
        </>
      )}
      {node.motif === "lattice" && (
        <mesh>
          <icosahedronGeometry args={[0.26, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 1 : 0.5} wireframe />
        </mesh>
      )}
      {node.motif === "briefcase" && (
        <mesh>
          <boxGeometry args={[0.34, 0.26, 0.26]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.8 : 0.4} />
        </mesh>
      )}
      {node.motif === "circuit" && (
        <>
          <mesh>
            <boxGeometry args={[0.34, 0.34, 0.34]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 1 : 0.5} wireframe />
          </mesh>
          <mesh>
            <boxGeometry args={[0.12, 0.12, 0.12]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.3} />
          </mesh>
        </>
      )}
      {node.motif === "compass" && (
        <mesh>
          <octahedronGeometry args={[0.26, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.9 : 0.45} flatShading />
        </mesh>
      )}
      {node.motif === "rings" && (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.07, 0, 0]}>
            <torusGeometry args={[0.16, 0.028, 12, 32]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 1 : 0.55} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.07, 0, 0]}>
            <torusGeometry args={[0.16, 0.028, 12, 32]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 1 : 0.55} />
          </mesh>
        </>
      )}
      {hovered && (
        <Html position={[0, 0.5, 0]} center distanceFactor={7} style={{ pointerEvents: "none" }}>
          <div
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              color: "#F7F5F1",
              background: "rgba(11,27,51,0.85)",
              border: "1px solid rgba(200,155,90,0.5)",
              padding: "6px 10px",
            }}
          >
            {node.code} · {node.label}
          </div>
        </Html>
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
    if (!geom.current) return;
    const p = easeOutCubic(progressRef.current);
    if (settled.current) return; // geometry is final once assembly completes
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
      <lineBasicMaterial color="#4A6FA5" transparent opacity={0.32} />
    </lineSegments>
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
      <pointsMaterial color="#4A6FA5" size={0.03} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function SceneContents({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  const nodes = useMemo(buildNodes, []);
  const links = useMemo(() => buildLinks(nodes), [nodes]);
  const progressRef = useRef(reduced ? 1 : 0);
  const world = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();

  useFrame((_, delta) => {
    if (!reduced && progressRef.current < 1) {
      progressRef.current = Math.min(1, progressRef.current + delta / 2.6);
    }
    if (world.current && !reduced) {
      world.current.rotation.y += delta * 0.07;
    }
  });

  function activate(node: NodeDef) {
    if (node.action.type === "external") {
      window.open(node.action.url, "_blank", "noopener,noreferrer");
    } else {
      navigate(node.action.to);
    }
  }

  return (
    <>
      <fog attach="fog" args={["#0B1B33", 6, 16]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 5, 6]} intensity={40} color="#DCE6F2" />
      <pointLight position={[-5, -3, 2]} intensity={18} color="#C89B5A" />
      <group ref={world} rotation={[0.28, 0, 0]}>
        {nodes.map((n) => (
          <NodeMesh
            key={n.id}
            node={n}
            progressRef={progressRef}
            hovered={hoveredId === n.id}
            setHovered={setHoveredId}
            onActivate={activate}
          />
        ))}
        <Filaments nodes={nodes} links={links} progressRef={progressRef} />
      </group>
      <Particles count={mobile ? 140 : 520} />
    </>
  );
}

export default function EcosystemScene({ reduced, mobile }: { reduced: boolean; mobile: boolean }) {
  return (
    <Canvas
      dpr={mobile ? [1, 1.5] : [1, 2]}
      camera={{ position: [0, 1.1, 7.4], fov: 46 }}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      aria-hidden="true"
    >
      <SceneContents reduced={reduced} mobile={mobile} />
    </Canvas>
  );
}
