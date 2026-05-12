import BackButton from "@/components/BackButton";
import NeandertalesScene from "@/components/NeandertalesScene";
import Link from "next/link";

export default function NeandertalesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <BackButton
          href="/recorrido/homo-erectus"
          label="Volver a Homo erectus"
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-orange-300">
              Hace aproximadamente 400 mil a 40 mil años
            </p>

            <h1 className="mt-4 text-4xl font-black md:text-7xl">
              Neandertales
            </h1>

            <p className="mt-4 text-2xl text-slate-300">
              Adaptarse al frío, cuidar al grupo
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-400">
              En ambientes fríos y exigentes, sobrevivir requiere conocimiento,
              herramientas, cooperación y vida grupal. Cuidar, enseñar y
              compartir recursos puede convertirse en una ventaja adaptativa.
            </p>

            <div className="mt-10">
              <NeandertalesScene />
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Escena interactiva
            </p>

            <p className="mt-4 text-lg leading-relaxed text-slate-200">
              El jugador debe elegir tres acciones correctas para resistir un
              ambiente frío: compartir abrigo, enseñar técnicas y cuidar al
              grupo.
            </p>

            <div className="mt-8">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Decisión
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                ¿Qué valor tiene cuidar, enseñar y compartir recursos dentro de
                un grupo?
              </h2>
            </div>

            <div className="mt-8 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 p-4">
              <p className="font-bold text-emerald-300">Aprendizaje</p>

              <p className="mt-2 leading-relaxed text-slate-300">
                La adaptación también puede ser cultural y social. En ambientes
                difíciles, compartir conocimiento, recursos y cuidados aumenta
                las posibilidades de supervivencia colectiva.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/recorrido/homo-sapiens"
                className="inline-flex w-full justify-center rounded-2xl bg-orange-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-orange-300"
              >
                Continuar a Homo sapiens
              </Link>

              <Link
                href="/recorrido/homo-erectus"
                className="inline-flex w-full justify-center rounded-2xl border border-white/10 px-6 py-4 font-bold text-white transition hover:bg-white/[0.08]"
              >
                Volver a Homo erectus
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}