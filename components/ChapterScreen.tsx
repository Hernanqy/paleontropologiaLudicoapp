import Link from "next/link";
import BackButton from "@/components/BackButton";
import SceneFrame from "@/components/SceneFrame";

type ChapterScreenProps = {
  chapter: {
    title: string;
    subtitle: string;
    time: string;
    previous: string;
    next: string;
    challenge: string;
    question: string;
    options: string[];
    learning: string;
  };
};

export default function ChapterScreen({ chapter }: ChapterScreenProps) {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10 overflow-hidden">
      <section className="max-w-6xl mx-auto">
        <BackButton href={chapter.previous} />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px] items-start">
          <div>
            <p className="text-orange-300 uppercase tracking-[0.3em] text-sm">
              {chapter.time}
            </p>

            <h1 className="mt-4 text-4xl md:text-7xl font-black">
              {chapter.title}
            </h1>

            <p className="mt-4 text-2xl text-slate-300">
              {chapter.subtitle}
            </p>

            <div className="mt-10">
  <SceneFrame title={chapter.title}>
    <div>
      <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
        {chapter.subtitle}
      </p>

      <p className="mt-4 max-w-xl text-slate-300">
        Escena visual 2D: fondo por capas, personaje, ambiente y animación.
      </p>
    </div>
  </SceneFrame>
</div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Desafío
            </p>

            <p className="mt-4 text-lg text-slate-200 leading-relaxed">
              {chapter.challenge}
            </p>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Decisión
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                {chapter.question}
              </h2>

              <div className="mt-5 space-y-3">
                {chapter.options.map((option) => (
                  <button
                    key={option}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-left text-slate-200 hover:bg-orange-400 hover:text-slate-950 transition"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-emerald-400/10 border border-emerald-300/20 p-4">
              <p className="text-sm text-emerald-300 font-bold">
                Aprendizaje
              </p>
              <p className="mt-2 text-slate-300 leading-relaxed">
                {chapter.learning}
              </p>
            </div>

            <Link
              href={chapter.next}
              className="mt-8 inline-flex w-full justify-center rounded-2xl bg-orange-400 px-6 py-4 font-bold text-slate-950 hover:bg-orange-300 transition"
            >
              Continuar
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}