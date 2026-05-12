"use client";

import { Maximize, Minimize } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type SceneFrameProps = {
  title?: string;
  children?: React.ReactNode;
};

export default function SceneFrame({ title = "Escena visual", children }: SceneFrameProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === sceneRef.current);
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  async function toggleFullscreen() {
    if (!sceneRef.current) return;

    if (!document.fullscreenElement) {
      await sceneRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }

  return (
    <div
      ref={sceneRef}
      className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-black"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(251,146,60,0.22),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.18),transparent_35%)]" />

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-emerald-950 to-transparent" />

      <div className="absolute left-6 top-6 z-20">
        <p className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-slate-300 backdrop-blur">
          {title}
        </p>
      </div>

      <button
        type="button"
        onClick={toggleFullscreen}
        className="absolute right-6 top-6 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-sm text-white backdrop-blur hover:bg-white/10 transition"
      >
        {isFullscreen ? (
          <>
            <Minimize size={16} />
            Salir
          </>
        ) : (
          <>
            <Maximize size={16} />
            Pantalla completa
          </>
        )}
      </button>

      <div className="relative z-10 flex h-full items-center justify-center p-8 text-center">
        {children ?? (
          <p className="max-w-xl text-slate-400">
            Escena visual 2D: fondo por capas, personaje, ambiente y animación.
          </p>
        )}
      </div>
    </div>
  );
}