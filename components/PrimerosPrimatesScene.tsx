"use client";

import { useEffect, useState } from "react";
import { Check, Maximize, Minimize, RotateCcw, X } from "lucide-react";

type GameScreen = "playing" | "victory" | "fail";

type ChoiceId =
  | "mirar"
  | "agarrarse"
  | "rama-cercana"
  | "bajar-suelo"
  | "saltar-sin-mirar"
  | "fruto-desconocido";

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
    id: "mirar",
    correct: true,
    label: "Mirar al frente",
    x: 13.2,
    y: 70.4,
    w: 23.2,
    h: 10.4,
  },
  {
    id: "agarrarse",
    correct: true,
    label: "Agarrarse fuerte",
    x: 38.5,
    y: 70.4,
    w: 23.2,
    h: 10.4,
  },
  {
    id: "rama-cercana",
    correct: true,
    label: "Rama cercana",
    x: 63.6,
    y: 70.4,
    w: 23.2,
    h: 10.4,
  },
  {
    id: "bajar-suelo",
    correct: false,
    label: "Bajar al suelo",
    x: 13.2,
    y: 84.3,
    w: 23.2,
    h: 10.4,
  },
  {
    id: "saltar-sin-mirar",
    correct: false,
    label: "Saltar sin mirar",
    x: 38.5,
    y: 84.3,
    w: 23.2,
    h: 10.4,
  },
  {
    id: "fruto-desconocido",
    correct: false,
    label: "Fruto desconocido",
    x: 63.6,
    y: 84.3,
    w: 23.2,
    h: 10.4,
  },
];

const REQUIRED_CORRECT = 3;
const MAX_ERRORS = 2;
const START_TIME = 60;

export default function PrimerosPrimatesScene() {
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

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
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
      setScreen("fail");
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [hasStarted, timeLeft, screen]);

  function openExpanded() {
    setExpanded(true);
    setHasStarted(true);
  }

  function closeExpanded() {
    setExpanded(false);
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
          setScreen("fail");
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
          recién cuando entrás a pantalla grande.
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
      ? "/assets/primeros-primates-victory.png"
      : screen === "fail"
        ? "/assets/primeros-primates-fail.png"
        : "/assets/primeros-primates-game.png";

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
      <div className="relative aspect-[1792/1024] h-auto w-full max-h-screen max-w-screen overflow-hidden">
        <img
          src={imageSrc}
          alt="Desafío visual de primeros primates"
          className="h-full w-full select-none object-contain"
          draggable={false}
        />

        {screen === "playing" && (
          <>
            <div className="pointer-events-none absolute left-[58.2%] top-[3.8%] flex -translate-x-1/2 items-center gap-[2vw]">
              <HudValue
                color="orange"
                value={hasStarted ? formattedTime : "1:00"}
              />
              <HudValue color="green" value={`${correctCount}/3`} />
              <HudValue color="red" value={`${errorCount}/2`} />
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
            className="absolute bottom-[7.2%] left-1/2 h-[11%] w-[34%] -translate-x-1/2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-lime-300/80"
            aria-label="Continuar"
          />
        )}

        {screen === "fail" && (
          <button
            type="button"
            onClick={onReset}
            className="absolute bottom-[7.2%] left-1/2 h-[11%] w-[34%] -translate-x-1/2 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-300/80"
            aria-label="Reintentar"
          />
        )}

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

function HudValue({
  value,
  color,
}: {
  value: string;
  color: "orange" | "green" | "red";
}) {
  const colorClass =
    color === "orange"
      ? "text-orange-300"
      : color === "green"
        ? "text-lime-300"
        : "text-red-300";

  return (
    <div className="flex h-[5.2vw] min-h-[42px] w-[9.1vw] min-w-[90px] items-center justify-center rounded-2xl bg-black/55 backdrop-blur-[2px]">
      <span
        className={`text-[clamp(1.3rem,2.2vw,2.7rem)] font-black leading-none ${colorClass} drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]`}
      >
        {value}
      </span>
    </div>
  );
}