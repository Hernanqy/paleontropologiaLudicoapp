import BackButton from "@/components/BackButton";
import HomoSapiensScene from "@/components/HomoSapiensScene";
import Link from "next/link";

export default function HomoSapiensPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <BackButton
          href="/recorrido/neandertales"
          label="Volver a Neandertales"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
              Desde hace aproximadamente 300 mil años
            </p>

            <h1 className="mt-4 text-4xl font-black md:text-7xl">
              Homo sapiens
            </h1>

            <p className="mt-4 text-2xl text-slate-300">
              Lenguaje, memoria y cooperación
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">
              Los primeros Homo sapiens no eran “nosotros hoy” en un sentido
              cultural actual, pero sí pertenecían a nuestra especie. Su
              capacidad para comunicar, enseñar, organizarse y transmitir
              conocimientos de forma acumulativa potenció nuevas estrategias de
              adaptación.
            </p>

            <div className="mt-10">
              <HomoSapiensScene />
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Escena interactiva
            </p>

            <p className="mt-4 text-lg leading-relaxed text-slate-200">
              El jugador debe elegir tres acciones correctas relacionadas con
              lenguaje, memoria social, enseñanza y cooperación.
            </p>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Decisión
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                ¿Cuál es una de las grandes ventajas adaptativas de Homo
                sapiens?
              </h2>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
              <p className="font-bold text-emerald-300">Aprendizaje</p>

              <p className="mt-2 leading-relaxed text-slate-300">
                Nuestra supervivencia depende profundamente de aprender con
                otros, recordar, comunicar y construir cultura compartida. La
                adaptación humana también es social y simbólica.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/recorrido/actualidad"
                className="inline-flex w-full justify-center rounded-2xl bg-orange-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-orange-300"
              >
                Continuar al final
              </Link>

              <Link
                href="/recorrido/neandertales"
                className="inline-flex w-full justify-center rounded-2xl border border-white/10 px-6 py-4 font-bold text-white transition hover:bg-white/[0.08]"
              >
                Volver a Neandertales
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}