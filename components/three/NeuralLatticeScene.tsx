"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Neural Lattice — translucent icosahedron with luminous edges,
 * internal vertex nodes, and a soft particle drift.
 */

type SceneProps = { reduced?: boolean; mobile?: boolean };

function Lattice({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const edgesRef = useRef<THREE.LineSegments>(null);

  const geom = useMemo(() => new THREE.IcosahedronGeometry(1.4, 0), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geom), [geom]);
  const positions = useMemo(() => {
    const arr: THREE.Vector3[] = [];
    const pos = geom.attributes.position;
    const seen = new Set<string>();
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      const key = `${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`;
      if (!seen.has(key)) {
        seen.add(key);
        arr.push(v);
      }
    }
    return arr;
  }, [geom]);

  useFrame((state, delta) => {
    if (reduced) return;
    if (group.current) {
      group.current.rotation.y += delta * 0.12;
      group.current.rotation.x += delta * 0.05;
    }
    // breathing edge intensity
    if (edgesRef.current) {
      const t = state.clock.elapsedTime;
      const mat = edgesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.55 + Math.sin(t * 1.4) * 0.15;
    }
  });

  return (
    <group ref={group}>
      {/* glassy faceted body */}
      <mesh geometry={geom}>
        <meshPhysicalMaterial
          color="#0B5F4A"
          transmission={0.85}
          thickness={1.2}
          roughness={0.2}
          metalness={0.1}
          ior={1.4}
          attenuationColor={"#0B5F4A"}
          attenuationDistance={2.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* inner shell — slightly smaller */}
      <mesh scale={0.6}>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial
          color="#4ADE80"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
      {/* edges */}
      <lineSegments ref={edgesRef} geometry={edges}>
        <lineBasicMaterial color="#4ADE80" transparent opacity={0.7} />
      </lineSegments>
      {/* vertex nodes */}
      {positions.map((p, i) => (
        <Node key={i} position={p} index={i} reduced={reduced} />
      ))}
      {/* core glow */}
      <pointLight color="#00FFA3" intensity={1.5} distance={3} />
    </group>
  );
}

function Node({
  position,
  index,
  reduced,
}: {
  position: THREE.Vector3;
  index: number;
  reduced: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (reduced || !mesh.current) return;
    const t = state.clock.elapsedTime + index * 0.6;
    const s = 1 + Math.sin(t * 1.4) * 0.25;
    mesh.current.scale.setScalar(s);
  });
  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color="#00FFA3" />
    </mesh>
  );
}

function Particles({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // shell distribution outside lattice radius
      const r = 1.85 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.04;
    const mat = points.current.material as THREE.PointsMaterial;
    mat.opacity = 0.45 + Math.sin(state.clock.elapsedTime) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#00FFA3"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function NeuralLatticeScene({ reduced = false, mobile = false }: SceneProps) {
  const dpr: [number, number] = mobile ? [1, 1.4] : [1, 1.75];
  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 4.2], fov: 35 }}
      style={{ background: "transparent" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <ambientLight color="#0F1B18" intensity={0.6} />
      <directionalLight color="#4ADE80" intensity={1.0} position={[3, 4, 5]} />
      <directionalLight color="#00FFA3" intensity={0.4} position={[-3, -2, 4]} />
      <Lattice reduced={reduced} />
      <Particles count={mobile ? 24 : 60} />
    </Canvas>
  );
}
