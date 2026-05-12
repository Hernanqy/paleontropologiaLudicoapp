"use client";

import dynamic from "next/dynamic";

const EarthImpactScene = dynamic(
  () => import("@/components/EarthImpactScene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-video w-full items-center justify-center rounded-3xl border border-white/10 bg-black text-slate-400">
        Cargando escena 3D...
      </div>
    ),
  }
);

export default function EarthImpactSceneClient() {
  return <EarthImpactScene />;
}