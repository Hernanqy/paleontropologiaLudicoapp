"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Stars, useTexture } from "@react-three/drei";
import {
  MouseEvent,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { Maximize, Minimize, RotateCcw } from "lucide-react";

type Phase = "idle" | "incoming" | "impact" | "dust";

function Earth({ phase }: { phase: Phase }) {
  const earthRef = useRef<THREE.Mesh>(null);
  const dustRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const texture = useTexture("/assets/textures/earth-cretaceous.png");

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.16;
    }

    if (dustRef.current) {
      dustRef.current.rotation.y += delta * 0.035;
      const mat = dustRef.current.material as THREE.MeshStandardMaterial;

      if (phase === "dust" || phase === "impact") {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.5, 0.035);
      } else {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0, 0.04);
      }
    }

    if (cloudRef.current) {
      cloudRef.current.rotation.y -= delta * 0.025;
      const mat = cloudRef.current.material as THREE.MeshStandardMaterial;

      if (phase === "dust") {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.34, 0.025);
      } else {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0, 0.04);
      }
    }

    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;

      if (phase === "impact") {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.45, 0.1);
      } else {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.12, 0.03);
      }
    }
  });

  return (
    <group>
      <mesh ref={glowRef} scale={1.18}>
        <sphereGeometry args={[1.02, 64, 64]} />
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshStandardMaterial map={texture} roughness={1} metalness={0} />
      </mesh>

      <mesh ref={dustRef} scale={1.035}>
        <sphereGeometry args={[1.03, 96, 96]} />
        <meshStandardMaterial
          color="#9ca3af"
          transparent
          opacity={0}
          roughness={1}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={cloudRef} scale={1.065}>
        <sphereGeometry args={[1.03, 96, 96]} />
        <meshStandardMaterial
          color="#cbd5e1"
          transparent
          opacity={0}
          roughness={1}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Asteroid() {
  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(0.18, 2);
    const position = geo.attributes.position;

    for (let i = 0; i < position.count; i++) {
      const vertex = new THREE.Vector3().fromBufferAttribute(position, i);
      const distortion = 0.75 + Math.random() * 0.55;

      vertex.multiplyScalar(distortion);
      position.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group>
      <pointLight intensity={7} distance={3} color="#fb923c" />

      <mesh geometry={geometry}>
        <meshStandardMaterial
          color="#3f2b1f"
          roughness={0.9}
          metalness={0.05}
          emissive="#7c2d12"
          emissiveIntensity={0.4}
        />
      </mesh>

      <mesh scale={1.25}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshBasicMaterial
          color="#fb923c"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0.06, 0.05, 0.04]} scale={0.55}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshBasicMaterial
          color="#fff7ed"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function FireTrail() {
  return (
    <group>
      <mesh position={[-0.85, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.22, 1.9, 32, 1, true]} />
        <meshBasicMaterial
          color="#fb923c"
          transparent
          opacity={0.32}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[-1.25, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.34, 2.4, 32, 1, true]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh position={[-0.45, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.09, 1.2, 32, 1, true]} />
        <meshBasicMaterial
          color="#fff7ed"
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Meteor({
  phase,
  onImpact,
}: {
  phase: Phase;
  onImpact: () => void;
}) {
  const meteorRef = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const hitTriggered = useRef(false);

  const start = useMemo(() => new THREE.Vector3(-4.2, 1.35, 0.35), []);
  const control = useMemo(() => new THREE.Vector3(-1.2, 1.05, 0.25), []);
  const target = useMemo(() => new THREE.Vector3(0.98, 0.22, 0.12), []);

  useEffect(() => {
    if (!meteorRef.current) return;

    if (phase === "idle") {
      progress.current = 0;
      hitTriggered.current = false;
      meteorRef.current.visible = false;
      meteorRef.current.position.copy(start);
    }

    if (phase === "incoming") {
      progress.current = 0;
      hitTriggered.current = false;
      meteorRef.current.visible = true;
      meteorRef.current.position.copy(start);
    }
  }, [phase, start]);

  useFrame((_, delta) => {
    if (!meteorRef.current) return;
    if (phase !== "incoming") return;

    progress.current += delta * 0.26;
    const t = Math.min(progress.current, 1);

    const p0 = start.clone().multiplyScalar((1 - t) * (1 - t));
    const p1 = control.clone().multiplyScalar(2 * (1 - t) * t);
    const p2 = target.clone().multiplyScalar(t * t);
    const currentPosition = p0.add(p1).add(p2);

    const nextT = Math.min(t + 0.01, 1);
    const n0 = start.clone().multiplyScalar((1 - nextT) * (1 - nextT));
    const n1 = control.clone().multiplyScalar(2 * (1 - nextT) * nextT);
    const n2 = target.clone().multiplyScalar(nextT * nextT);
    const nextPosition = n0.add(n1).add(n2);

    meteorRef.current.position.copy(currentPosition);

    const direction = new THREE.Vector3()
      .subVectors(nextPosition, currentPosition)
      .normalize();

    const angle = Math.atan2(direction.y, direction.x);

    meteorRef.current.rotation.set(0, 0, angle);

    const speedScale = 1 + t * 0.35;
    meteorRef.current.scale.setScalar(speedScale);

    if (t >= 1 && !hitTriggered.current) {
      hitTriggered.current = true;
      meteorRef.current.visible = false;
      onImpact();
    }
  });

  return (
    <group ref={meteorRef} visible={false}>
      <FireTrail />
      <Asteroid />
    </group>
  );
}

function ExplosionFlash({ phase }: { phase: Phase }) {
  const flashRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (flashRef.current) {
      const mat = flashRef.current.material as THREE.MeshBasicMaterial;

      if (phase === "impact") {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.9, 0.25);
        flashRef.current.scale.lerp(new THREE.Vector3(2.1, 2.1, 2.1), 0.14);
      } else {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0, 0.08);
        flashRef.current.scale.lerp(new THREE.Vector3(0.4, 0.4, 0.4), 0.08);
      }
    }

    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;

      if (phase === "impact") {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0.5, 0.18);
        ringRef.current.scale.lerp(new THREE.Vector3(1.6, 1.6, 1.6), 0.12);
      } else {
        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 0, 0.08);
        ringRef.current.scale.lerp(new THREE.Vector3(0.25, 0.25, 0.25), 0.08);
      }
    }
  });

  return (
    <group position={[1.02, 0.22, 0.12]}>
      <mesh ref={flashRef} scale={0.4}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshBasicMaterial
          color="#fff7ed"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={ringRef} scale={0.25}>
        <torusGeometry args={[0.32, 0.018, 12, 80]} />
        <meshBasicMaterial
          color="#fdba74"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function Scene3D({
  phase,
  onImpact,
}: {
  phase: Phase;
  onImpact: () => void;
}) {
  return (
    <>
      <color attach="background" args={["#020617"]} />

      <ambientLight intensity={1.15} />
      <directionalLight position={[3.5, 2.2, 3]} intensity={2.4} />
      <pointLight position={[4, 2, 2]} intensity={1.8} color="#fb923c" />

      <Stars
        radius={90}
        depth={34}
        count={2600}
        factor={4}
        saturation={0}
        fade
        speed={0.18}
      />

      <Earth phase={phase} />
      <ExplosionFlash phase={phase} />
      <Meteor phase={phase} onImpact={onImpact} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        minPolarAngle={Math.PI / 2.35}
        maxPolarAngle={Math.PI / 1.75}
      />
    </>
  );
}

function SceneCanvas({
  phase,
  onImpact,
}: {
  phase: Phase;
  onImpact: () => void;
}) {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 42 }}>
      <Suspense
        fallback={
          <Html center>
            <div className="rounded-full bg-black/60 px-4 py-2 text-sm text-white">
              Cargando escena...
            </div>
          </Html>
        }
      >
        <Scene3D phase={phase} onImpact={onImpact} />
      </Suspense>
    </Canvas>
  );
}

export default function EarthImpactScene() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  function openExpanded() {
    setIsExpanded(true);
  }

  function closeExpanded(event?: MouseEvent<HTMLButtonElement>) {
    event?.stopPropagation();
    setIsExpanded(false);
  }

  function handleStartImpact(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();

    if (phase !== "idle") return;

    setPhase("incoming");
  }

  function handleImpact() {
    setPhase("impact");

    setTimeout(() => {
      setPhase("dust");
    }, 950);
  }

  function handleReset(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setPhase("idle");
  }

  const statusText =
    phase === "idle"
      ? "La Tierra gira: es el mundo donde vivían los dinosaurios."
      : phase === "incoming"
      ? "El meteorito entra desde la izquierda en una trayectoria de impacto."
      : phase === "impact"
      ? "El impacto libera una enorme cantidad de energía."
      : "El polvo y las nubes alteran el clima global.";

  return (
    <div className="w-full">
      <div
        onClick={openExpanded}
        className="group relative aspect-video cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl"
      >
        <SceneCanvas phase={phase} onImpact={handleImpact} />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.55)_100%)]" />

        <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-sm text-slate-200 backdrop-blur">
          Extinción · Tierra y meteorito
        </div>

        <div className="absolute right-4 top-4">
          <div className="pointer-events-none inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 py-2 text-sm text-slate-300 opacity-0 backdrop-blur transition group-hover:opacity-100">
            <Maximize size={16} />
            Click para pantalla completa
          </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3">
          <p className="max-w-xl rounded-2xl border border-white/10 bg-black/45 px-4 py-3 text-sm text-slate-200 backdrop-blur">
            {statusText}
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleStartImpact}
              disabled={phase !== "idle"}
              className="rounded-2xl bg-orange-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Activar meteorito
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/45 px-5 py-3 font-bold text-white backdrop-blur transition hover:bg-white/10"
            >
              <RotateCcw size={16} />
              Reiniciar
            </button>
          </div>
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-500">
        Click sobre la escena para pantalla completa. Presioná Esc o “Volver al
        recorrido” para salir.
      </p>

      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black">
          <SceneCanvas phase={phase} onImpact={handleImpact} />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.65)_100%)]" />

          <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-sm text-slate-200 backdrop-blur">
            Extinción · Tierra y meteorito
          </div>

          <button
            type="button"
            onClick={closeExpanded}
            className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10"
          >
            <Minimize size={16} />
            Volver al recorrido
          </button>

          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
            <p className="max-w-xl rounded-2xl border border-white/10 bg-black/55 px-4 py-3 text-sm text-slate-200 backdrop-blur">
              {statusText}
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleStartImpact}
                disabled={phase !== "idle"}
                className="rounded-2xl bg-orange-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-orange-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Activar meteorito
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-black/55 px-5 py-3 font-bold text-white backdrop-blur transition hover:bg-white/10"
              >
                <RotateCcw size={16} />
                Reiniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}