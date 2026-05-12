"use client";

import { useEffect, useState } from "react";
import { Check, Maximize, Minimize, RotateCcw, X } from "lucide-react";

type GameScreen = "playing" | "victory" | "extinction";

type ChoiceId =
  | "esconderse"
  | "trepar"
  | "madriguera"
  | "campo-abierto"
  | "hacer-ruido"
  | "quedarse-quieto";

type Choice = {
  id: ChoiceId;
  correct: boolean;
  label: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const choices: Choice[] = [
  {
    id: "esconderse",
    correct: true,
    label: "Esconderse",
    x: 7.3,
    y: 66.3,
    w: 25.9,
    h: 11.3,
  },
  {
    id: "trepar",
    correct: true,
    label: "Trepar",
    x: 36.9,
    y: 66.3,
    w: 25.9,
    h: 11.3,
  },
  {
    id: "madriguera",
    correct: true,
    label: "Madriguera",
    x: 66.4,
    y: 66.3,
    w: 25.9,
    h: 11.3,
  },
  {
    id: "campo-abierto",
    correct: false,
    label: "Campo abierto",
    x: 7.3,
    y: 80.7,
    w: 25.9,
    h: 11.3,
  },
  {
    id: "hacer-ruido",
    correct: false,
    label: "Hacer ruido",
    x: 36.9,
    y: 80.7,
    w: 25.9,
    h: 11.3,
  },
  {
    id: "quedarse-quieto",
    correct: false,
    label: "Quedarse quieto",
    x: 66.4,
    y: 80.7,
    w: 25.9,
    h: 11.3,
  },
];

const REQUIRED_CORRECT = 3;
const MAX_ERRORS = 2;
const START_TIME = 60;

export default function PurgatoriusScene() {
  const [expanded, setExpanded] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const [screen, setScreen] = useState<GameScreen>("playing");
  const [selected, setSelected] = useState<ChoiceId[]>([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(START_TIME);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeExpanded();
      }
    }

    function handleFullscreenChange() {
      if (!document.fullscreenElement) {
        setExpanded(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = expanded ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [expanded]);

  useEffect(() => {
    if (!hasStarted) return;
    if (screen !== "playing") return;

    if (timeLeft <= 0) {
      setScreen("extinction");
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [hasStarted, timeLeft, screen]);

  async function openExpanded() {
    setExpanded(true);
    setHasStarted(true);

    try {
      await document.documentElement.requestFullscreen();
    } catch {
      // Si el navegador bloquea pantalla completa,
      // igual abrimos la vista grande dentro de la web.
    }
  }

  async function closeExpanded() {
    setExpanded(false);

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch {
      // No pasa nada si el navegador no permite salir desde código.
    }
  }

  function handleChoice(choice: Choice) {
    if (!hasStarted) return;
    if (screen !== "playing") return;
    if (selected.includes(choice.id)) return;

    const nextSelected = [...selected, choice.id];
    setSelected(nextSelected);

    if (choice.correct) {
      const nextCorrect = correctCount + 1;
      setCorrectCount(nextCorrect);

      if (nextCorrect >= REQUIRED_CORRECT) {
        window.setTimeout(() => {
          setScreen("victory");
        }, 500);
      }
    } else {
      const nextErrors = errorCount + 1;
      setErrorCount(nextErrors);

      if (nextErrors >= MAX_ERRORS) {
        window.setTimeout(() => {
          setScreen("extinction");
        }, 500);
      }
    }
  }

  function resetGame() {
    setScreen("playing");
    setSelected([]);
    setCorrectCount(0);
    setErrorCount(0);
    setTimeLeft(START_TIME);
    setHasStarted(false);
  }

  return (
    <div className="w-full">
      <GameFrame
        expanded={false}
        hasStarted={hasStarted}
        screen={screen}
        selected={selected}
        correctCount={correctCount}
        errorCount={errorCount}
        timeLeft={timeLeft}
        onChoice={handleChoice}
        onExpand={openExpanded}
        onClose={closeExpanded}
        onReset={resetGame}
      />

      {expanded && (
        <div className="fixed inset-0 z-50 bg-black">
          <GameFrame
            expanded
            hasStarted={hasStarted}
            screen={screen}
            selected={selected}
            correctCount={correctCount}
            errorCount={errorCount}
            timeLeft={timeLeft}
            onChoice={handleChoice}
            onExpand={openExpanded}
            onClose={closeExpanded}
            onReset={resetGame}
          />
        </div>
      )}

      {!expanded && (
        <p className="mt-3 text-sm text-slate-500">
          Tocá “Pantalla grande” para iniciar el desafío. El tiempo empieza
          recién cuando entrás a pantalla completa.
        </p>
      )}
    </div>
  );
}

function GameFrame({
  expanded,
  hasStarted,
  screen,
  selected,
  correctCount,
  errorCount,
  timeLeft,
  onChoice,
  onExpand,
  onClose,
  onReset,
}: {
  expanded: boolean;
  hasStarted: boolean;
  screen: GameScreen;
  selected: ChoiceId[];
  correctCount: number;
  errorCount: number;
  timeLeft: number;
  onChoice: (choice: Choice) => void;
  onExpand: () => void;
  onClose: () => void;
  onReset: () => void;
}) {
  const imageSrc =
    screen === "victory"
      ? "/assets/purgatorius/purgatorius-victory.png"
      : screen === "extinction"
        ? "/assets/purgatorius/purgatorius-extinction.png"
        : "/assets/purgatorius/purgatorius-game.png";

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div
      className={
        expanded
          ? "relative flex h-screen w-screen items-center justify-center overflow-hidden bg-black"
          : "relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl"
      }
    >
      <div className="relative aspect-[1672/941] max-h-full max-w-full overflow-hidden">
        <img
          src={imageSrc}
          alt="Desafío visual de Purgatorius"
          className="h-full w-full select-none object-contain"
          draggable={false}
        />

        {screen === "playing" && (
          <>
            {/* Indicadores sobre el HUD original de la imagen */}
            <div className="pointer-events-none absolute left-[58.3%] top-[3.7%] flex -translate-x-1/2 items-center gap-[1.9vw]">
              <div className="flex h-[5.2vw] min-h-[42px] w-[9.1vw] min-w-[90px] items-center justify-center rounded-2xl bg-black/55 backdrop-blur-[2px]">
                <span className="text-[clamp(1.3rem,2.2vw,2.7rem)] font-black leading-none text-orange-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  {hasStarted ? formattedTime : "1:00"}
                </span>
              </div>

              <div className="flex h-[5.2vw] min-h-[42px] w-[9.1vw] min-w-[90px] items-center justify-center rounded-2xl bg-black/55 backdrop-blur-[2px]">
                <span className="text-[clamp(1.3rem,2.2vw,2.7rem)] font-black leading-none text-lime-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  {correctCount}/3
                </span>
              </div>

              <div className="flex h-[5.2vw] min-h-[42px] w-[9.1vw] min-w-[90px] items-center justify-center rounded-2xl bg-black/55 backdrop-blur-[2px]">
                <span className="text-[clamp(1.3rem,2.2vw,2.7rem)] font-black leading-none text-red-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                  {errorCount}/2
                </span>
              </div>
            </div>

            {choices.map((choice) => {
              const wasSelected = selected.includes(choice.id);

              return (
                <button
                  key={choice.id}
                  type="button"
                  aria-label={choice.label}
                  onClick={() => onChoice(choice)}
                  className="absolute rounded-2xl focus:outline-none"
                  style={{
                    left: `${choice.x}%`,
                    top: `${choice.y}%`,
                    width: `${choice.w}%`,
                    height: `${choice.h}%`,
                  }}
                >
                  {wasSelected && (
                    <>
                      <span
                        className={`pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl ${
                          choice.correct ? "bg-lime-300/50" : "bg-red-400/50"
                        }`}
                      />

                      <span
                        className={`pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 text-white shadow-2xl ${
                          choice.correct
                            ? "border-lime-100 bg-lime-500/85 shadow-lime-300/40"
                            : "border-red-100 bg-red-500/85 shadow-red-300/40"
                        }`}
                      >
                        {choice.correct ? <Check size={34} /> : <X size={34} />}
                      </span>
                    </>
                  )}
                </button>
              );
            })}
          </>
        )}

        {screen === "victory" && (
          <button
            type="button"
            onClick={onClose}
            className="absolute bottom-[7.4%] left-1/2 h-[11%] w-[34%] -translate-x-1/2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-lime-300/80"
            aria-label="Continuar"
          />
        )}

        {screen === "extinction" && (
          <button
            type="button"
            onClick={onReset}
            className="absolute bottom-[7.4%] left-1/2 h-[11%] w-[34%] -translate-x-1/2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300/80"
            aria-label="Reintentar"
          />
        )}

        {/* Controles flotantes */}
        <div className="absolute right-4 top-4 flex gap-3 opacity-85">
          {expanded ? (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10"
            >
              <Minimize size={16} />
              Volver al recorrido
            </button>
          ) : (
            <button
              type="button"
              onClick={onExpand}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10"
            >
              <Maximize size={16} />
              Pantalla grande
            </button>
          )}

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-white/10"
          >
            <RotateCcw size={16} />
            Reiniciar
          </button>
        </div>

        {/* Inicio pequeño, abajo, no tapa la escena */}
        {!hasStarted && screen === "playing" && (
          <div className="absolute inset-0 flex items-end justify-center bg-black/10 pb-[3%]">
            <button
              type="button"
              onClick={onExpand}
              className="rounded-2xl border border-orange-300/40 bg-black/75 px-5 py-3 text-base font-black text-orange-200 shadow-2xl backdrop-blur-md transition hover:bg-orange-300 hover:text-slate-950"
            >
              Iniciar pantalla grande
            </button>
          </div>
        )}
      </div>
    </div>
  );
}