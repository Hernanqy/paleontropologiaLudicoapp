import AustralopithecusScene from "@/components/AustralopithecusScene";
import BackButton from "@/components/BackButton";
import Link from "next/link";

export default function AustralopithecusPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <BackButton
          href="/recorrido/primeros-primates"
          label="Volver a primeros primates"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
              Entre 3,5 y 2,95 millones de años atrás
            </p>

            <h1 className="mt-4 text-4xl font-black md:text-7xl">
              Australopithecus afarensis
            </h1>

            <p className="mt-4 text-2xl text-slate-300">
              Caminar y adaptarse
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">
              En ambientes abiertos, caminar erguido podía ayudar a ver más
              lejos, liberar las manos y desplazarse de otra manera. Pero no
              eliminaba los peligros: la adaptación siempre depende del ambiente.
            </p>

            <div className="mt-10">
              <AustralopithecusScene />
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Escena interactiva
            </p>

            <p className="mt-4 text-lg leading-relaxed text-slate-200">
              El jugador debe elegir tres acciones correctas para sobrevivir en
              una sabana abierta. La clave es caminar erguido, usar las manos y
              buscar apoyo del grupo.
            </p>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Decisión
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                ¿Qué ventaja puede aportar caminar erguido en ambientes
                abiertos?
              </h2>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
              <p className="font-bold text-emerald-300">Aprendizaje</p>

              <p className="mt-2 leading-relaxed text-slate-300">
                El bipedismo fue una adaptación importante, pero no la única.
                Ver más lejos, liberar las manos y cooperar aumentan las
                posibilidades de supervivencia.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/recorrido/valle-del-rift"
                className="inline-flex w-full justify-center rounded-2xl bg-orange-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-orange-300"
              >
                Continuar al Valle del Rift
              </Link>

              <Link
                href="/recorrido/primeros-primates"
                className="inline-flex w-full justify-center rounded-2xl border border-white/10 px-6 py-4 font-bold text-white transition hover:bg-white/[0.08]"
              >
                Volver a primeros primates
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}