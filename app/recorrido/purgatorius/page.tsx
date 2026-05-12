import BackButton from "@/components/BackButton";
import PurgatoriusScene from "@/components/PurgatoriusScene";
import Link from "next/link";

export default function PurgatoriusPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <BackButton href="/recorrido/extincion" label="Volver a Extinción" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">
              Paleoceno temprano
            </p>

            <h1 className="mt-4 text-4xl font-black md:text-7xl">
              Purgatorius
            </h1>

            <p className="mt-4 text-2xl text-slate-300">
              Pequeños sobrevivientes
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">
              Después del impacto, el mundo no quedó vacío. Algunas formas de
              vida pequeñas y flexibles encontraron oportunidades entre ramas,
              sombras, refugios y nuevos recursos.
            </p>

            <div className="mt-10">
              <PurgatoriusScene />
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Escena interactiva
            </p>

            <p className="mt-4 text-lg leading-relaxed text-slate-200">
              En este desafío, el jugador debe elegir tres acciones correctas
              para evitar ser aplastado por el gigante. La clave es ser pequeño,
              ágil y buscar refugio.
            </p>

            <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
              <p className="font-bold text-emerald-300">Aprendizaje</p>

              <p className="mt-2 leading-relaxed text-slate-300">
                La supervivencia depende de la relación entre rasgos y ambiente.
                En este contexto, esconderse, trepar y usar refugios son ventajas
                adaptativas.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/recorrido/primeros-primates"
                className="inline-flex w-full justify-center rounded-2xl bg-emerald-300 px-6 py-4 font-bold text-slate-950 transition hover:bg-emerald-200"
              >
                Continuar a primeros primates
              </Link>

              <Link
                href="/recorrido/extincion"
                className="inline-flex w-full justify-center rounded-2xl border border-white/10 px-6 py-4 font-bold text-white transition hover:bg-white/[0.08]"
              >
                Volver a Extinción
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}