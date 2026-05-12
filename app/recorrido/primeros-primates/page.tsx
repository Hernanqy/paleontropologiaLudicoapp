import BackButton from "@/components/BackButton";
import PrimerosPrimatesScene from "@/components/PrimerosPrimatesScene";
import Link from "next/link";

export default function PrimerosPrimatesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <BackButton href="/recorrido/purgatorius" label="Volver a Purgatorius" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
              Después del Paleoceno
            </p>

            <h1 className="mt-4 text-4xl font-black md:text-7xl">
              Primeros primates
            </h1>

            <p className="mt-4 text-2xl text-slate-300">
              Ver, trepar, explorar
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">
              La vida en ambientes con árboles favorece nuevas formas de moverse
              y percibir. En este desafío, la visión, las manos y la coordinación
              ayudan a encontrar una ruta segura entre las ramas.
            </p>

            <div className="mt-10">
              <PrimerosPrimatesScene />
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Escena interactiva
            </p>

            <p className="mt-4 text-lg leading-relaxed text-slate-200">
              El jugador debe elegir tres acciones correctas para avanzar entre
              las ramas. La clave es mirar bien, agarrarse fuerte y elegir una
              ruta segura.
            </p>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Decisión
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                ¿Qué rasgos ayudan a explorar ramas, frutos y refugios?
              </h2>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
              <p className="font-bold text-emerald-300">Aprendizaje</p>

              <p className="mt-2 leading-relaxed text-slate-300">
                Muchos rasgos primates se relacionan con movimiento, visión,
                coordinación, manos hábiles y exploración en ambientes con
                árboles.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/recorrido/australopithecus"
                className="inline-flex w-full justify-center rounded-2xl bg-orange-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-orange-300"
              >
                Continuar a Australopithecus
              </Link>

              <Link
                href="/recorrido/purgatorius"
                className="inline-flex w-full justify-center rounded-2xl border border-white/10 px-6 py-4 font-bold text-white transition hover:bg-white/[0.08]"
              >
                Volver a Purgatorius
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}