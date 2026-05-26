"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Screen = "playing" | "victory" | "fail";

const routes = [
  {
    id: "beringia",
    label: "Ruta por Beringia",
    good: true,
    className: "left-[74.7%] top-[22.8%] h-[10.4%] w-[22.3%]",
  },
  {
    id: "pacifico",
    label: "Ruta costera del Pacífico",
    good: true,
    className: "left-[74.7%] top-[37.5%] h-[10.4%] w-[22.3%]",
  },
  {
    id: "sudamerica",
    label: "Expansión hacia Sudamérica",
    good: true,
    className: "left-[74.7%] top-[52.2%] h-[10.4%] w-[22.3%]",
  },
  {
    id: "atlantico",
    label: "Cruce atlántico directo",
    good: false,
    className: "left-[74.7%] top-[66.8%] h-[10.4%] w-[22.3%]",
  },
];

export default function PoblamientoAmericanoScene() {
  const router = useRouter();

  const [screen, setScreen] = useState<Screen>("playing");
  const [selected, setSelected] = useState<string[]>([]);

  const hits = selected.filter(
    (id) => routes.find((route) => route.id === id)?.good
  ).length;

  const errors = selected.filter(
    (id) => routes.find((route) => route.id === id)?.good === false
  ).length;

  function choose(route: (typeof routes)[number]) {
    if (screen !== "playing") return;
    if (selected.includes(route.id)) return;

    const nextSelected = [...selected, route.id];
    setSelected(nextSelected);

    const nextHits = nextSelected.filter(
      (id) => routes.find((item) => item.id === id)?.good
    ).length;

    const nextErrors = nextSelected.filter(
      (id) => routes.find((item) => item.id === id)?.good === false
    ).length;

    if (nextHits >= 3) {
      setTimeout(() => setScreen("victory"), 350);
    }

    if (nextErrors >= 1) {
      setTimeout(() => setScreen("fail"), 350);
    }
  }

  function reset() {
    setScreen("playing");
    setSelected([]);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#102c32] text-white">
      <div className="flex min-h-screen items-center justify-center p-2 md:p-4">
        <section className="relative aspect-[16/9] w-full max-w-[1672px] overflow-hidden bg-black shadow-[0_30px_90px_rgba(0,0,0,.55)]">
          <img
            src="/assets/poblamiento-americano-game.png"
            alt="Poblamiento americano"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          {screen === "playing" && (
            <>
              <div className="absolute left-[5.4%] top-[4.3%] z-20 rounded bg-black/70 px-3 py-1 text-2xl font-black text-amber-300 md:text-3xl">
                15s
              </div>

              <div className="absolute left-[13.4%] top-[4.3%] z-20 rounded bg-black/70 px-3 py-1 text-2xl font-black text-lime-400 md:text-3xl">
                {hits}/3
              </div>

              <div className="absolute left-[21.5%] top-[4.3%] z-20 rounded bg-black/70 px-3 py-1 text-2xl font-black text-red-400 md:text-3xl">
                {errors}/1
              </div>

              {routes.map((route) => {
                const isSelected = selected.includes(route.id);

                return (
                  <button
                    key={route.id}
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      choose(route);
                    }}
                    className={`absolute z-30 rounded-2xl ${route.className} ${
                      isSelected
                        ? route.good
                          ? "shadow-[inset_0_0_42px_rgba(132,204,22,.42),0_0_24px_rgba(132,204,22,.38)]"
                          : "shadow-[inset_0_0_42px_rgba(239,68,68,.42),0_0_24px_rgba(239,68,68,.38)]"
                        : "transition hover:shadow-[inset_0_0_36px_rgba(251,191,36,.26)]"
                    } focus:outline-none focus:ring-4 focus:ring-amber-300/70`}
                    aria-label={route.label}
                  >
                    {isSelected && (
                      <span
                        className={`absolute right-5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border text-3xl font-black ${
                          route.good
                            ? "border-lime-300/70 bg-lime-950/75 text-lime-200"
                            : "border-red-300/70 bg-red-950/75 text-red-200"
                        }`}
                      >
                        {route.good ? "✓" : "×"}
                      </span>
                    )}
                  </button>
                );
              })}
            </>
          )}

          {screen === "victory" && (
            <div className="absolute inset-0 z-40 grid place-items-center bg-black/70 backdrop-blur-sm">
              <div className="max-w-2xl rounded-[2rem] border border-lime-400/35 bg-[#090704]/95 p-8 text-center shadow-[0_0_90px_rgba(132,204,22,.18)]">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-lime-300/40 bg-lime-950/50 text-5xl text-lime-200">
                  ✓
                </div>

                <h2 className="mt-6 font-serif text-5xl font-black uppercase text-amber-100">
                  Ruta reconstruida
                </h2>

                <p className="mt-4 text-xl leading-relaxed text-stone-300">
                  Identificaste las principales rutas vinculadas al poblamiento americano.
                </p>

                <button
                  type="button"
                  onClick={() => router.push("/recorrido/campo-laborde")}
                  className="mt-7 rounded-2xl border border-lime-300/40 bg-lime-950/45 px-8 py-4 text-lg font-black uppercase tracking-wide text-lime-100 transition hover:bg-lime-900/50"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {screen === "fail" && (
            <div className="absolute inset-0 z-40 grid place-items-center bg-black/75 backdrop-blur-sm">
              <div className="max-w-2xl rounded-[2rem] border border-red-400/35 bg-[#090704]/95 p-8 text-center shadow-[0_0_90px_rgba(239,68,68,.18)]">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-red-300/40 bg-red-950/50 text-5xl text-red-200">
                  ×
                </div>

                <h2 className="mt-6 font-serif text-5xl font-black uppercase text-amber-100">
                  Ruta incorrecta
                </h2>

                <p className="mt-4 text-xl leading-relaxed text-stone-300">
                  Revisá las hipótesis principales: Beringia, costa del Pacífico y expansión hacia Sudamérica.
                </p>

                <button
                  type="button"
                  onClick={reset}
                  className="mt-7 rounded-2xl border border-amber-300/40 bg-amber-950/45 px-8 py-4 text-lg font-black uppercase tracking-wide text-amber-100 transition hover:bg-amber-900/50"
                >
                  Intentar de nuevo
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
