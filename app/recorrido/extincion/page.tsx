import BackButton from "@/components/BackButton";
import EarthImpactSceneClient from "@/components/EarthImpactSceneClient";
import Link from "next/link";

export default function ExtincionPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <BackButton href="/" label="Volver al inicio" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
              Hace 66 millones de años
            </p>

            <h1 className="mt-4 text-4xl font-black md:text-7xl">
              Extinción
            </h1>

            <p className="mt-4 text-2xl text-slate-300">
              El mundo cambia
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">
              Antes de la expansión de los mamíferos y mucho antes de Homo
              sapiens, la Tierra estaba dominada por los dinosaurios. Activá el
              meteorito para ver cómo un evento global altera las condiciones de
              vida.
            </p>

            <div className="mt-10">
              <EarthImpactSceneClient />
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Desafío
            </p>

            <p className="mt-4 text-lg leading-relaxed text-slate-200">
              El cielo se oscurece, baja la temperatura y los ecosistemas se
              alteran. La vida no termina, pero sobrevivir ya no depende de las
              mismas ventajas.
            </p>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Decisión
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                ¿Qué estrategia puede ayudar a sobrevivir cuando el ambiente
                cambia de golpe?
              </h2>

              <div className="mt-5 space-y-3">
                <button className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-left text-slate-200 transition hover:bg-orange-400 hover:text-slate-950">
                  Ser enorme y necesitar mucho alimento.
                </button>

                <button className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-left text-slate-200 transition hover:bg-orange-400 hover:text-slate-950">
                  Buscar refugio y consumir distintos recursos.
                </button>

                <button className="w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 text-left text-slate-200 transition hover:bg-orange-400 hover:text-slate-950">
                  Permanecer siempre en el mismo lugar.
                </button>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
              <p className="font-bold text-emerald-300">
                Aprendizaje
              </p>

              <p className="mt-2 leading-relaxed text-slate-300">
                Una extinción no elimina toda la vida: cambia las condiciones de
                supervivencia. Los organismos más flexibles pueden encontrar
                nuevas oportunidades.
              </p>
            </div>

            <Link
              href="/recorrido/purgatorius"
              className="mt-8 inline-flex w-full justify-center rounded-2xl bg-orange-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-orange-300"
            >
              Continuar a Purgatorius
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}