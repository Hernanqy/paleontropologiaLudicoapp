import BackButton from "@/components/BackButton";
import ValleRiftScene from "@/components/ValleRiftScene";
import Link from "next/link";

export default function ValleDelRiftPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <BackButton
          href="/recorrido/australopithecus"
          label="Volver a Australopithecus"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
              África oriental
            </p>

            <h1 className="mt-4 text-4xl font-black md:text-7xl">
              Valle del Rift
            </h1>

            <p className="mt-4 text-2xl text-slate-300">
              Cuando el paisaje cambia
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">
              El Valle del Rift ayuda a explicar cómo los cambios del paisaje y
              del clima pudieron abrir ambientes más secos y despejados. Ese
              cambio hacia zonas de sabana generó nuevos desafíos para los
              homínidos tempranos.
            </p>

            <div className="mt-10">
              <ValleRiftScene />
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Escena interactiva
            </p>

            <p className="mt-4 text-lg leading-relaxed text-slate-200">
              El jugador debe elegir estrategias para adaptarse a un ambiente
              que se transforma: bosques más fragmentados, recursos dispersos,
              zonas abiertas, agua, grietas y nuevos peligros.
            </p>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Decisión
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                ¿Qué estrategias ayudan cuando el ambiente cambia hacia la
                sabana?
              </h2>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
              <p className="font-bold text-emerald-300">Aprendizaje</p>

              <p className="mt-2 leading-relaxed text-slate-300">
                El cambio ambiental pudo favorecer estrategias como moverse
                entre zonas, observar a distancia, buscar recursos variados y
                permanecer en grupo. La adaptación surge de la relación entre
                organismo y ambiente.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/recorrido/homo-habilis"
                className="inline-flex w-full justify-center rounded-2xl bg-orange-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-orange-300"
              >
                Continuar a Homo habilis
              </Link>

              <Link
                href="/recorrido/australopithecus"
                className="inline-flex w-full justify-center rounded-2xl border border-white/10 px-6 py-4 font-bold text-white transition hover:bg-white/[0.08]"
              >
                Volver a Australopithecus
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}