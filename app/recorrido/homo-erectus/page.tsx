import BackButton from "@/components/BackButton";
import HomoErectusScene from "@/components/HomoErectusScene";
import Link from "next/link";

export default function HomoErectusPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <BackButton
          href="/recorrido/homo-habilis"
          label="Volver a Homo habilis"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
              Hace aproximadamente 1,9 millones a 110 mil años
            </p>

            <h1 className="mt-4 text-4xl font-black md:text-7xl">
              Homo erectus
            </h1>

            <p className="mt-4 text-2xl text-slate-300">
              Moverse, compartir y cuidar
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">
              Homo erectus se expandió por distintos ambientes. En esta etapa,
              la supervivencia empieza a verse cada vez más ligada al grupo:
              moverse juntos, compartir recursos y posiblemente cuidar a
              individuos vulnerables.
            </p>

            <div className="mt-10">
              <HomoErectusScene />
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Escena interactiva
            </p>

            <p className="mt-4 text-lg leading-relaxed text-slate-200">
              El jugador debe elegir tres estrategias colectivas para avanzar:
              moverse en grupo, compartir alimento y cuidar a quienes lo
              necesitan.
            </p>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Decisión
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                ¿Qué estrategias permiten sobrevivir cuando el grupo atraviesa
                nuevos territorios?
              </h2>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
              <p className="font-bold text-emerald-300">Aprendizaje</p>

              <p className="mt-2 leading-relaxed text-slate-300">
                La cooperación pudo ser una ventaja adaptativa: compartir
                recursos, moverse juntos y cuidar a individuos vulnerables
                aumenta las posibilidades de supervivencia del grupo.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/recorrido/neandertales"
                className="inline-flex w-full justify-center rounded-2xl bg-orange-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-orange-300"
              >
                Continuar a Neandertales
              </Link>

              <Link
                href="/recorrido/homo-habilis"
                className="inline-flex w-full justify-center rounded-2xl border border-white/10 px-6 py-4 font-bold text-white transition hover:bg-white/[0.08]"
              >
                Volver a Homo habilis
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}