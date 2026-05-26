"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Screen = "playing" | "victory" | "fail";

type HypothesisOption = {
  id: string;
  label: string;
  good: boolean;
  hotspot: string;
  mark: string;
};

const hypothesisOptions: HypothesisOption[] = [
  {
    id: "caza",
    label: "Caza y procesamiento de megafauna",
    good: true,
    hotspot: "left-[8.2%] top-[68.4%] h-[10.3%] w-[26.2%]",
    mark: "left-[31.2%] top-[73.7%]",
  },
  {
    id: "pantano",
    label: "Borde de ambiente pantanoso",
    good: true,
    hotspot: "left-[36.8%] top-[68.4%] h-[10.3%] w-[26.2%]",
    mark: "left-[59.8%] top-[73.7%]",
  },
  {
    id: "historia",
    label: "Parte de nuestra historia hace 12.600 años",
    good: true,
    hotspot: "left-[65.4%] top-[68.4%] h-[10.3%] w-[26.2%]",
    mark: "left-[88.4%] top-[73.7%]",
  },
  {
    id: "dinosaurios",
    label: "Humanos cazando dinosaurios",
    good: false,
    hotspot: "left-[8.2%] top-[81.3%] h-[10.3%] w-[26.2%]",
    mark: "left-[31.2%] top-[86.6%]",
  },
  {
    id: "ciudad",
    label: "Una ciudad antigua",
    good: false,
    hotspot: "left-[36.8%] top-[81.3%] h-[10.3%] w-[26.2%]",
    mark: "left-[59.8%] top-[86.6%]",
  },
  {
    id: "azar",
    label: "Huesos sin relación humana",
    good: false,
    hotspot: "left-[65.4%] top-[81.3%] h-[10.3%] w-[26.2%]",
    mark: "left-[88.4%] top-[86.6%]",
  },
];

export default function CampoLabordeHipotesisScene() {
  const router = useRouter();

  const [screen, setScreen] = useState<Screen>("playing");
  const [seconds, setSeconds] = useState(20);
  const [selected, setSelected] = useState<string[]>([]);

  const hits = useMemo(() => {
    return selected.filter(
      (id) => hypothesisOptions.find((option) => option.id === id)?.good
    ).length;
  }, [selected]);

  const errors = useMemo(() => {
    return selected.filter(
      (id) => hypothesisOptions.find((option) => option.id === id)?.good === false
    ).length;
  }, [selected]);

  function choose(option: HypothesisOption) {
    if (screen !== "playing") return;
    if (selected.includes(option.id)) return;

    const nextSelected = [...selected, option.id];
    setSelected(nextSelected);

    const nextHits = nextSelected.filter(
      (id) => hypothesisOptions.find((item) => item.id === id)?.good
    ).length;

    const nextErrors = nextSelected.filter(
      (id) => hypothesisOptions.find((item) => item.id === id)?.good === false
    ).length;

    if (nextHits >= 3) {
      setTimeout(() => setScreen("victory"), 350);
      return;
    }

    if (nextErrors >= 2) {
      setTimeout(() => setScreen("fail"), 350);
    }
  }

  function reset() {
    setScreen("playing");
    setSeconds(20);
    setSelected([]);
  }

  useEffect(() => {
    if (screen !== "playing") return;

    const timer = window.setInterval(() => {
      setSeconds((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          setScreen("fail");
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [screen]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#102c32] text-white">
      <div className="flex min-h-screen items-center justify-center p-2 md:p-4">
        <section className="relative aspect-[16/9] w-full max-w-[1792px] overflow-hidden bg-black shadow-[0_30px_90px_rgba(0,0,0,.55)]">
          <img
            src="/assets/campo-laborde-hipotesis.jpg"
            alt="Hipótesis de Campo Laborde"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          {screen === "playing" && (
            <>
              <div className="absolute left-[2.6%] top-[2.8%] z-20 rounded-xl border border-amber-300/30 bg-black/75 px-4 py-2 text-2xl font-black text-amber-300 shadow-lg md:text-3xl">
                {seconds}s
              </div>

              <div className="absolute left-[8.8%] top-[2.8%] z-20 rounded-xl border border-lime-300/30 bg-black/75 px-4 py-2 text-2xl font-black text-lime-400 shadow-lg md:text-3xl">
                {hits}/3
              </div>

              <div className="absolute left-[15.6%] top-[2.8%] z-20 rounded-xl border border-red-300/30 bg-black/75 px-4 py-2 text-2xl font-black text-red-400 shadow-lg md:text-3xl">
                {errors}/2
              </div>

              {hypothesisOptions.map((option) => {
                const isSelected = selected.includes(option.id);

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      choose(option);
                    }}
                    className={`absolute z-30 rounded-xl ${option.hotspot} ${
                      isSelected
                        ? option.good
                          ? "shadow-[inset_0_0_46px_rgba(132,204,22,.34),0_0_22px_rgba(132,204,22,.28)]"
                          : "shadow-[inset_0_0_46px_rgba(239,68,68,.34),0_0_22px_rgba(239,68,68,.28)]"
                        : "transition hover:shadow-[inset_0_0_34px_rgba(251,191,36,.25)]"
                    } focus:outline-none focus:ring-4 focus:ring-amber-300/70`}
                    aria-label={option.label}
                  />
                );
              })}

              {hypothesisOptions.map((option) => {
                const isSelected = selected.includes(option.id);
                if (!isSelected) return null;

                return (
                  <div
                    key={`${option.id}-mark`}
                    className={`absolute z-40 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-3xl font-black shadow-xl ${option.mark} ${
                      option.good
                        ? "border-lime-300/80 bg-lime-950/80 text-lime-200 shadow-lime-500/30"
                        : "border-red-300/80 bg-red-950/80 text-red-200 shadow-red-500/30"
                    }`}
                  >
                    {option.good ? "✓" : "×"}
                  </div>
                );
              })}
            </>
          )}

          {screen === "victory" && (
            <div className="absolute inset-0 z-50 grid place-items-center bg-black/72 p-6 backdrop-blur-sm">
              <div className="max-w-2xl rounded-[2rem] border border-lime-400/35 bg-[#090704]/95 p-8 text-center shadow-[0_0_90px_rgba(132,204,22,.18)]">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-lime-300/40 bg-lime-950/50 text-5xl text-lime-200">
                  ✓
                </div>

                <h2 className="mt-6 font-serif text-5xl font-black uppercase text-amber-100">
                  Nuestra historia profunda
                </h2>

                <p className="mt-4 text-xl leading-relaxed text-stone-300">
                  Campo Laborde muestra que los grupos humanos que habitaron la región pampeana hace unos 12.600 años forman parte de nuestra historia.
                </p>

                <button
                  type="button"
                  onClick={() => router.push("/recorrido/homo-sapiens")}
                  className="mt-7 rounded-2xl border border-lime-300/40 bg-lime-950/45 px-8 py-4 text-lg font-black uppercase tracking-wide text-lime-100 transition hover:bg-lime-900/50"
                >
                  Volver al recorrido
                </button>
              </div>
            </div>
          )}

          {screen === "fail" && (
            <div className="absolute inset-0 z-50 grid place-items-center bg-black/78 p-6 backdrop-blur-sm">
              <div className="max-w-2xl rounded-[2rem] border border-red-400/35 bg-[#090704]/95 p-8 text-center shadow-[0_0_90px_rgba(239,68,68,.18)]">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-red-300/40 bg-red-950/50 text-5xl text-red-200">
                  ×
                </div>

                <h2 className="mt-6 font-serif text-5xl font-black uppercase text-amber-100">
                  Hipótesis incorrecta
                </h2>

                <p className="mt-4 text-xl leading-relaxed text-stone-300">
                  Revisá las hipótesis basadas en evidencias arqueológicas del sitio.
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
