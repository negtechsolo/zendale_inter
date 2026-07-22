import { useEffect, useMemo, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import { facilities } from "../data/facilities";
import { pillars } from "../data/pillars";

interface NodeDef {
  id: string;
  label: string;
  code: string;
  kind: "facility" | "pillar";
  motif?: string;
  target: THREE.Vector3;
  start: THREE.Vector3;
  action:
    | { type: "external"; url: string }
    | { type: "route"; to: string };
}

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

const A = new THREE.Vector3(-2.25, 1.32, 0);
const B = new THREE.Vector3(2.25, 1.32, 0);
const C = new THREE.Vector3(-2.25, -1.32, 0);
const D = new THREE.Vector3(2.25, -1.32, 0);

const lerp3 = (from: THREE.Vector3, to: THREE.Vector3, amount: number) =>
  new THREE.Vector3().lerpVectors(from, to, amount);

function depth(index: number) {
  return (seeded(index, 11) - 0.5) * 0.34;
}

/**
 * Nodes begin close to their final position and slightly behind the network.
 * This preserves the assembly animation without throwing large shapes and
 * filaments across the headline during the first seconds of the page load.
 */
function gentleStart(target: THREE.Vector3) {
  return target.clone();
}

function buildNodes(): NodeDef[] {
  const f = facilities;
  const p = pillars;

  const facilityAction = (facility: (typeof f)[number]): NodeDef["action"] => ({
    type: "route",
    to: `/network/${facility.id}`,
  });

  const placed: Array<{
    def: (typeof f)[number] | (typeof p)[number];
    kind: "facility" | "pillar";
    pos: THREE.Vector3;
  }> = [
    { def: p[0], kind: "pillar", pos: A.clone() },
    { def: f[0], kind: "facility", pos: lerp3(A, B, 0.34) },
    { def: f[1], kind: "facility", pos: lerp3(A, B, 0.67) },
    { def: p[1], kind: "pillar", pos: B.clone() },
    { def: f[2], kind: "facility", pos: lerp3(B, C, 0.25) },
    { def: p[4], kind: "pillar", pos: lerp3(B, C, 0.5).setZ(0.36) },
    { def: f[3], kind: "facility", pos: lerp3(B, C, 0.75) },
    { def: p[2], kind: "pillar", pos: C.clone() },
    { def: f[4], kind: "facility", pos: lerp3(C, D, 0.22) },
    { def: f[5], kind: "facility", pos: lerp3(C, D, 0.45) },
    { def: f[6], kind: "facility", pos: lerp3(C, D, 0.68) },
    { def: f[7], kind: "facility", pos: lerp3(C, D, 0.85) },
    { def: p[3], kind: "pillar", pos: D.clone() },
  ];

  return placed.map((item, index) => {
    const target = item.pos
      .clone()
      .add(new THREE.Vector3(0, 0, item.pos.z === 0.36 ? 0 : depth(index)));

    return {
      id: item.def.id,
      label: item.def.name,
      code: item.def.code,
      kind: item.kind,
      motif:
        item.kind === "pillar"
          ? (item.def as (typeof p)[number]).motif
          : undefined,
      target,
      start: gentleStart(target),
      action:
        item.kind === "pillar"
          ? {
              type: "route",
              to: (item.def as (typeof p)[number]).route,
            }
          : facilityAction(item.def as (typeof f)[number]),
    };
  });
}

function buildLinks(nodes: NodeDef[]): Array<[number, number]> {
  const links: Array<[number, number]> = [];

  for (let index = 0; index < nodes.length - 1; index += 1) {
    links.push([index, index + 1]);
  }

  const centre = 5;
  [0, 3, 7, 12].forEach((corner) => links.push([centre, corner]));

  return links;
}

const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

function NodeMesh({
  node,
  progressRef,
  hovered,
  setHovered,
  onActivate,
}: {
  node: NodeDef;
  progressRef: MutableRefObject<number>;
  hovered: boolean;
  setHovered: (id: string | null) => void;
  onActivate: (node: NodeDef) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const position = useMemo(() => new THREE.Vector3(), []);
  const scaleTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!group.current) return;

    const progress = easeOutCubic(progressRef.current);
    position.lerpVectors(node.start, node.target, progress);

    const time = state.clock.elapsedTime;
    const phase = node.code.charCodeAt(node.code.length - 1);
    position.y += Math.sin(time * 0.55 + phase) * 0.022 * progress;

    group.current.position.copy(position);

    const scale = hovered ? 1.22 : 1;
    group.current.scale.lerp(scaleTarget.setScalar(scale), 0.13);
    group.current.rotation.z =
      Math.sin(time * 0.28 + phase) * (node.kind === "pillar" ? 0.08 : 0.045);
  });

  const steel = "#78A2DC";
  const brass = "#E0B26E";
  const color = node.kind === "pillar" ? brass : steel;

  return (
    <group
      ref={group}
      onPointerOver={(event) => {
        event.stopPropagation();
        setHovered(node.id);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(null);
        document.body.style.cursor = "";
      }}
      onClick={(event) => {
        event.stopPropagation();
        onActivate(node);
      }}
    >
      {node.kind === "facility" && (
        <>
          <mesh>
            <torusGeometry args={[0.145, 0.018, 10, 34]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={hovered ? 2.3 : 1.15}
              transparent
              opacity={0.92}
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color="#BBD5F7"
              emissive={color}
              emissiveIntensity={hovered ? 2.4 : 1.5}
            />
          </mesh>
        </>
      )}

      {node.motif === "lattice" && (
        <mesh>
          <icosahedronGeometry args={[0.23, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 2.5 : 1.25}
            wireframe
          />
        </mesh>
      )}

      {node.motif === "briefcase" && (
        <mesh>
          <boxGeometry args={[0.27, 0.2, 0.16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1.5 : 0.72}
            roughness={0.42}
          />
        </mesh>
      )}

      {node.motif === "circuit" && (
        <>
          <mesh>
            <boxGeometry args={[0.29, 0.29, 0.18]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={hovered ? 2.4 : 1.2}
              wireframe
            />
          </mesh>
          <mesh>
            <boxGeometry args={[0.085, 0.085, 0.085]} />
            <meshStandardMaterial
              color="#F5D69E"
              emissive={color}
              emissiveIntensity={1.6}
            />
          </mesh>
        </>
      )}

      {node.motif === "compass" && (
        <mesh>
          <octahedronGeometry args={[0.23, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1.75 : 0.86}
            flatShading
          />
        </mesh>
      )}

      {node.motif === "rings" && (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[-0.065, 0, 0]}>
            <torusGeometry args={[0.135, 0.021, 12, 30]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={hovered ? 1.8 : 0.92}
            />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0.065, 0, 0]}>
            <torusGeometry args={[0.135, 0.021, 12, 30]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={hovered ? 1.8 : 0.92}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

function Filaments({
  nodes,
  links,
  progressRef,
}: {
  nodes: NodeDef[];
  links: Array<[number, number]>;
  progressRef: MutableRefObject<number>;
}) {
  const geometry = useRef<THREE.BufferGeometry>(null);
  const positions = useMemo(() => new Float32Array(links.length * 6), [links]);
  const start = useMemo(() => new THREE.Vector3(), []);
  const end = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!geometry.current) return;

    const progress = easeOutCubic(progressRef.current);

    links.forEach(([from, to], index) => {
      start.lerpVectors(nodes[from].start, nodes[from].target, progress);
      end.lerpVectors(nodes[to].start, nodes[to].target, progress);
      positions.set(
        [start.x, start.y, start.z, end.x, end.y, end.z],
        index * 6,
      );
    });

    const attribute = geometry.current.getAttribute(
      "position",
    ) as THREE.BufferAttribute | null;

    if (!attribute) {
      geometry.current.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3),
      );
    } else {
      attribute.needsUpdate = true;
    }
  });

  return (
    <lineSegments>
      <bufferGeometry ref={geometry} />
      <lineBasicMaterial color="#5D83BA" transparent opacity={0.48} />
    </lineSegments>
  );
}

function FlowPulse({
  nodes,
  links,
  progressRef,
  offset,
  speed,
  color,
}: {
  nodes: NodeDef[];
  links: Array<[number, number]>;
  progressRef: MutableRefObject<number>;
  offset: number;
  speed: number;
  color: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const position = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    if (!mesh.current) return;

    const assembly = easeOutCubic(progressRef.current);
    mesh.current.visible = assembly > 0.82;

    const journey = (state.clock.elapsedTime * speed + offset) % links.length;
    const linkIndex = Math.floor(journey);
    const localProgress = journey - linkIndex;
    const [from, to] = links[linkIndex];

    position.lerpVectors(
      nodes[from].target,
      nodes[to].target,
      localProgress,
    );
    mesh.current.position.copy(position);
  });

  return (
    <mesh ref={mesh} visible={false}>
      <sphereGeometry args={[0.035, 12, 12]} />
      <meshBasicMaterial color={color} toneMapped={false} />
    </mesh>
  );
}

function BackgroundParticles({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      values[index * 3] = (seeded(index, 7) - 0.5) * 15;
      values[index * 3 + 1] = (seeded(index, 8) - 0.5) * 9;
      values[index * 3 + 2] = (seeded(index, 9) - 0.5) * 8 - 2.4;
    }

    return values;
  }, [count]);

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.006;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#6E93C9"
        size={0.025}
        transparent
        opacity={0.28}
        sizeAttenuation
      />
    </points>
  );
}


function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    if (!(camera instanceof THREE.OrthographicCamera)) return;

    // Fit the Zendale Z by the canvas height, so it stays large and centred
    // across normal laptop and wide desktop aspect ratios.
    camera.position.set(0, 0.08, 10);
    camera.zoom = Math.max(72, Math.min(96, size.height / 4.15));
    camera.near = 0.1;
    camera.far = 100;
    camera.updateProjectionMatrix();
  }, [camera, size.height, size.width]);

  return null;
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
  const progressRef = useRef(1);
  const world = useRef<THREE.Group>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();
  const worldX = 0;
  const worldY = 0;
  const worldScale = mobile ? 0.82 : 1;

  useFrame((state) => {
    if (!world.current) return;

    world.current.position.x += (worldX - world.current.position.x) * 0.06;
    world.current.position.y += (worldY - world.current.position.y) * 0.06;
    world.current.scale.lerp(
      new THREE.Vector3(worldScale, worldScale, worldScale),
      0.06,
    );

    if (!reduced) {
      const time = state.clock.elapsedTime;
      const targetRotationY =
        Math.sin(time * 0.1) * 0.065 + state.pointer.x * 0.075;
      const targetRotationX = 0.1 + state.pointer.y * -0.055;

      world.current.rotation.y +=
        (targetRotationY - world.current.rotation.y) * 0.035;
      world.current.rotation.x +=
        (targetRotationX - world.current.rotation.x) * 0.035;
    }
  });

  function setHovered(id: string | null) {
    setHoveredId(id);
    const node = nodes.find((candidate) => candidate.id === id);
    onHoverLabel(node ? `${node.code} · ${node.label}` : null);
  }

  function activate(node: NodeDef) {
    if (node.action.type === "external") {
      if (node.action.url) {
        window.open(node.action.url, "_blank", "noopener,noreferrer");
      }
      return;
    }

    navigate(node.action.to);
  }

  return (
    <>
      <fog attach="fog" args={["#0B1B33", 7.5, 16]} />
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 5, 6]} intensity={26} color="#DCE6F2" />
      <pointLight position={[-4, -2, 4]} intensity={14} color="#C89B5A" />

      <group
        ref={world}
        rotation={[0.06, 0, 0]}
        position={[worldX, worldY, 0]}
        scale={worldScale}
      >
        {nodes.map((node) => (
          <NodeMesh
            key={node.id}
            node={node}
            progressRef={progressRef}
            hovered={hoveredId === node.id}
            setHovered={setHovered}
            onActivate={activate}
          />
        ))}

        <Filaments nodes={nodes} links={links} progressRef={progressRef} />

        {!reduced && (
          <>
            <FlowPulse
              nodes={nodes}
              links={links}
              progressRef={progressRef}
              offset={0.2}
              speed={0.72}
              color="#E0B26E"
            />
            <FlowPulse
              nodes={nodes}
              links={links}
              progressRef={progressRef}
              offset={5.4}
              speed={0.58}
              color="#9BC2F5"
            />
            {!mobile && (
              <FlowPulse
                nodes={nodes}
                links={links}
                progressRef={progressRef}
                offset={10.1}
                speed={0.46}
                color="#E0B26E"
              />
            )}
          </>
        )}
      </group>

      <BackgroundParticles count={mobile ? 60 : 150} />

      {!mobile && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.32}
            luminanceThreshold={0.58}
            luminanceSmoothing={0.72}
            mipmapBlur
          />
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
      orthographic
      dpr={mobile ? [1, 1.25] : [1, 1.5]}
      camera={{ position: [0, 0.08, 10], zoom: 108, near: 0.1, far: 100 }}
      gl={{
        antialias: !mobile,
        alpha: true,
        powerPreference: "high-performance",
      }}
      frameloop={reduced ? "demand" : "always"}
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    >
      <ResponsiveCamera />
      <SceneContents
        reduced={reduced}
        mobile={mobile}
        onHoverLabel={onHoverLabel}
      />
    </Canvas>
  );
}
