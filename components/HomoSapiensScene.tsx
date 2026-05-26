"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Minimize } from "lucide-react";

type GameScreen = "playing" | "victory" | "fail";

type Choice = {
  id: string;
  label: string;
  good: boolean;
  className: string;
};

const choices: Choice[] = [
  {
    id: "cooperar",
    label: "Cooperar",
    good: true,
    className: "left-[13.1%] top-[68.7%] h-[9.1%] w-[23.9%]",
  },
  {
    id: "comunicar",
    label: "Comunicar",
    good: true,
    className: "left-[37.8%] top-[68.7%] h-[9.1%] w-[24%]",
  },
  {
    id: "ensenar",
    label: "Enseñar",
    good: true,
    className: "left-[63.1%] top-[68.7%] h-[9.1%] w-[24%]",
  },
  {
    id: "aislarse",
    label: "Aislarse",
    good: false,
    className: "left-[13.1%] top-[80.8%] h-[9.1%] w-[23.9%]",
  },
  {
    id: "improvisar",
    label: "Improvisar",
    good: false,
    className: "left-[37.8%] top-[80.8%] h-[9.1%] w-[24%]",
  },
  {
    id: "desperdiciar",
    label: "Desperdiciar",
    good: false,
    className: "left-[63.1%] top-[80.8%] h-[9.1%] w-[24%]",
  },
];

function getScreenImage(screen: GameScreen) {
  if (screen === "victory") return "/assets/homo-sapiens-victory.png";
  if (screen === "fail") return "/assets/homo-sapiens-fail.png";
  return "/assets/homo-sapiens-game.png";
}

export default function HomoSapiensScene() {
  const router = useRouter();

  const [expanded, setExpanded] = useState(true);
  const [screen, setScreen] = useState<GameScreen>("playing");
  const [seconds, setSeconds] = useState(15);
  const [selected, setSelected] = useState<string[]>([]);

  const hits = useMemo(() => {
    return selected.filter((id) => choices.find((choice) => choice.id === id)?.good).length;
  }, [selected]);

  const errors = useMemo(() => {
    return selected.filter((id) => choices.find((choice) => choice.id === id)?.good === false).length;
  }, [selected]);

  const imageSrc = getScreenImage(screen);

  function resetGame() {
    setScreen("playing");
    setSeconds(15);
    setSelected([]);
    setExpanded(true);
  }

  function closeExpanded() {
    setExpanded(false);
  }

  function choose(choice: Choice) {
    if (screen !== "playing") return;
    if (selected.includes(choice.id)) return;

    const nextSelected = [...selected, choice.id];
    setSelected(nextSelected);

    const nextHits = nextSelected.filter(
      (id) => choices.find((item) => item.id === id)?.good
    ).length;

    const nextErrors = nextSelected.filter(
      (id) => choices.find((item) => item.id === id)?.good === false
    ).length;

    if (nextHits >= 3) {
      setTimeout(() => setScreen("victory"), 250);
      return;
    }

    if (nextErrors >= 2) {
      setTimeout(() => setScreen("fail"), 250);
    }
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

  if (!expanded) {
    return (
      <section className="relative min-h-screen overflow-hidden bg-[#070504] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(245,158,11,.22),transparent_35%),linear-gradient(180deg,#090705,#020201)]" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
          <div className="rounded-full border border-amber-400/30 bg-black/50 px-5 py-2 text-sm font-black uppercase tracking-[.25em] text-amber-300">
            Homo sapiens
          </div>

          <h1 className="mt-6 font-serif text-5xl font-black uppercase text-amber-100 md:text-7xl">
            Desafío de supervivencia
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-300">
            Elegí tres ventajas clave que fortalecieron al grupo: cooperación,
            comunicación y enseñanza.
          </p>

          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="mt-8 rounded-2xl border border-amber-400/40 bg-amber-950/40 px-8 py-4 text-lg font-black uppercase tracking-wide text-amber-100 transition hover:bg-amber-900/50"
          >
            Abrir desafío
          </button>
        </div>
      </section>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#142f34] text-white">
      <div className="flex min-h-screen items-center justify-center p-2 md:p-4">
        <section className="relative aspect-[1672/941] w-full max-w-[1672px] overflow-hidden bg-black shadow-[0_30px_90px_rgba(0,0,0,.55)]">
          <img
            src={imageSrc}
            alt="Desafío interactivo de Homo sapiens"
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          {screen === "playing" && (
            <>
              <div className="absolute left-[58.8%] top-[5.5%] z-10 rounded bg-black/70 px-3 py-1 text-2xl font-black text-amber-300 md:text-3xl">
                {seconds}s
              </div>

              <div className="absolute left-[70.9%] top-[5.5%] z-10 rounded bg-black/70 px-3 py-1 text-2xl font-black text-lime-400 md:text-3xl">
                {hits}/3
              </div>

              <div className="absolute left-[83.2%] top-[5.5%] z-10 rounded bg-black/70 px-3 py-1 text-2xl font-black text-red-400 md:text-3xl">
                {errors}/2
              </div>

              {choices.map((choice) => {
                const isSelected = selected.includes(choice.id);

                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      choose(choice);
                    }}
                    className={`absolute z-20 rounded-2xl ${choice.className} ${
                      isSelected
                        ? choice.good
                          ? "shadow-[inset_0_0_40px_rgba(132,204,22,.38),0_0_22px_rgba(132,204,22,.35)]"
                          : "shadow-[inset_0_0_40px_rgba(239,68,68,.38),0_0_22px_rgba(239,68,68,.35)]"
                        : "transition hover:shadow-[inset_0_0_35px_rgba(251,191,36,.24)]"
                    } focus:outline-none focus:ring-4 focus:ring-amber-300/70`}
                    aria-label={choice.label}
                  >
                    {isSelected && (
                      <span
                        className={`absolute right-4 top-3 grid h-10 w-10 place-items-center rounded-full border text-2xl font-black ${
                          choice.good
                            ? "border-lime-300/70 bg-lime-950/70 text-lime-200"
                            : "border-red-300/70 bg-red-950/70 text-red-200"
                        }`}
                      >
                        {choice.good ? "✓" : "×"}
                      </span>
                    )}
                  </button>
                );
              })}
            </>
          )}

          {screen === "victory" && (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                router.push("/recorrido/poblamiento-americano");
              }}
              className="absolute bottom-[7.4%] left-1/2 z-30 h-[11%] w-[34%] -translate-x-1/2 rounded-2xl transition hover:shadow-[inset_0_0_40px_rgba(251,191,36,.25)] focus:outline-none focus:ring-4 focus:ring-lime-300/80"
              aria-label="Continuar"
            />
          )}

          {screen === "fail" && (
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                resetGame();
              }}
              className="absolute bottom-[7.4%] left-1/2 z-30 h-[11%] w-[40%] -translate-x-1/2 rounded-2xl transition hover:shadow-[inset_0_0_40px_rgba(251,191,36,.25)] focus:outline-none focus:ring-4 focus:ring-orange-300/80"
              aria-label="Intentar de nuevo"
            />
          )}

          <div className="absolute right-4 top-4 z-40 flex gap-3 opacity-85">
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                closeExpanded();
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-black"
            >
              <Minimize size={16} />
              Volver al recorrido
            </button>

            {screen !== "playing" && (
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  resetGame();
                }}
                className="rounded-full border border-white/10 bg-black/70 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-black"
              >
                Reiniciar
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}


