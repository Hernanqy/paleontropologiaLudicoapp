import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function AulaPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <section className="max-w-5xl mx-auto">
        <BackButton />

        <p className="mt-14 text-sky-300 uppercase tracking-[0.3em] text-sm">
          Modo aula
        </p>

        <h1 className="mt-4 text-4xl md:text-6xl font-black">
          Después de jugar, aprendemos
        </h1>

        <p className="mt-6 text-xl text-slate-300 max-w-3xl">
          Actividades, preguntas y recursos para trabajar evolución, adaptación,
          evidencia fósil y selección natural con estudiantes.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-bold">Pregunta disparadora</h2>
            <p className="mt-3 text-slate-400">
              ¿Sobrevive siempre el más fuerte o el mejor adaptado al ambiente?
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-bold">Actividad grupal</h2>
            <p className="mt-3 text-slate-400">
              Comparar distintas especies y pensar qué rasgos podrían favorecer
              su supervivencia.
            </p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-bold">Cierre</h2>
            <p className="mt-3 text-slate-400">
              Relacionar extinción, adaptación, biodiversidad y cambios
              ambientales actuales.
            </p>
          </article>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/juego"
            className="rounded-2xl bg-sky-300 px-6 py-4 font-bold text-slate-950 hover:bg-sky-200 transition"
          >
            Volver al juego
          </Link>

          <Link
            href="/"
            className="rounded-2xl border border-white/10 px-6 py-4 font-bold text-white hover:bg-white/[0.08] transition"
          >
            Menú principal
          </Link>
        </div>
      </section>
    </main>
  );
}