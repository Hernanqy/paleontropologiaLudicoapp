import BackButton from "@/components/BackButton";
import HomoHabilisScene from "@/components/HomoHabilisScene";
import Link from "next/link";

export default function HomoHabilisPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <BackButton
          href="/recorrido/valle-del-rift"
          label="Volver al Valle del Rift"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
              Hace aproximadamente 2,4 a 1,4 millones de años
            </p>

            <h1 className="mt-4 text-4xl font-black md:text-7xl">
              Homo habilis
            </h1>

            <p className="mt-4 text-2xl text-slate-300">
              Manos, piedra y oportunidad
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">
              En esta etapa, los objetos del ambiente empiezan a transformarse
              en herramientas. Tallar piedra, cortar alimento y compartir
              aprendizajes abre nuevas formas de adaptarse.
            </p>

            <div className="mt-10">
              <HomoHabilisScene />
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Escena interactiva
            </p>

            <p className="mt-4 text-lg leading-relaxed text-slate-200">
              El jugador debe elegir tres acciones correctas relacionadas con el
              uso de herramientas. La clave no es solo la piedra, sino probar,
              observar y aprender con otros.
            </p>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Decisión
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                ¿Qué cambia cuando una especie fabrica o usa herramientas?
              </h2>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
              <p className="font-bold text-emerald-300">Aprendizaje</p>

              <p className="mt-2 leading-relaxed text-slate-300">
                La tecnología empieza como una forma de adaptación: permite
                transformar el ambiente, acceder a nuevos recursos y transmitir
                soluciones dentro del grupo.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/recorrido/homo-erectus"
                className="inline-flex w-full justify-center rounded-2xl bg-orange-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-orange-300"
              >
                Continuar a Homo erectus
              </Link>

              <Link
                href="/recorrido/valle-del-rift"
                className="inline-flex w-full justify-center rounded-2xl border border-white/10 px-6 py-4 font-bold text-white transition hover:bg-white/[0.08]"
              >
                Volver al Valle del Rift
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}