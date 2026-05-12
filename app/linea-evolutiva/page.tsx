import Link from "next/link";
import BackButton from "@/components/BackButton";
import { Globe2, Leaf, Skull, Sparkles } from "lucide-react";

const eras = [
  {
    title: "El impacto",
    time: "66 millones de años atrás",
    text: "Un evento transforma el planeta. Los grandes dinosaurios desaparecen, pero la vida encuentra nuevos caminos.",
    icon: Skull,
  },
  {
    title: "La oscuridad",
    time: "Después de la extinción",
    text: "El clima cambia, escasean los recursos y sobrevivir depende de pequeñas ventajas.",
    icon: Leaf,
  },
  {
    title: "La diversificación",
    time: "Millones de años después",
    text: "Los mamíferos se expanden, aparecen nuevas formas de vida y los ambientes seleccionan rasgos.",
    icon: Sparkles,
  },
  {
    title: "El presente",
    time: "Hoy",
    text: "Comprender la evolución nos ayuda a pensar la biodiversidad, el ambiente y nuestro lugar en la historia de la vida.",
    icon: Globe2,
  },
];

export default function LineaEvolutivaPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <section className="max-w-5xl mx-auto">
        <BackButton href="/intro" label="Volver a introducción" />

        <p className="mt-14 text-orange-300 uppercase tracking-[0.3em] text-sm">
          Línea evolutiva
        </p>

        <h1 className="mt-4 text-4xl md:text-6xl font-black">
          De la extinción a la diversidad
        </h1>

        <p className="mt-6 text-xl text-slate-300 max-w-3xl">
          La evolución no avanza como una escalera. Cambia con el ambiente, las
          oportunidades, el azar y la supervivencia.
        </p>

        <div className="mt-14 space-y-6">
          {eras.map((era) => {
            const Icon = era.icon;

            return (
              <article
                key={era.title}
                className="grid gap-6 md:grid-cols-[80px_1fr] rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-orange-300 text-slate-950 flex items-center justify-center">
                  <Icon size={30} />
                </div>

                <div>
                  <p className="text-sm text-slate-400">{era.time}</p>
                  <h2 className="mt-1 text-2xl font-bold">{era.title}</h2>
                  <p className="mt-3 text-slate-300 leading-relaxed">
                    {era.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/juego"
            className="rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-slate-950 hover:bg-emerald-300 transition"
          >
            Ir al juego
          </Link>

          <Link
            href="/aula"
            className="rounded-2xl border border-white/10 px-6 py-4 font-bold text-white hover:bg-white/[0.08] transition"
          >
            Trabajar en aula
          </Link>
        </div>
      </section>
    </main>
  );
}