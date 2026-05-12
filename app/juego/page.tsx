import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function JuegoPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <section className="max-w-5xl mx-auto">
        <BackButton />

        <p className="mt-14 text-emerald-300 uppercase tracking-[0.3em] text-sm">
          Modo juego
        </p>

        <h1 className="mt-4 text-4xl md:text-6xl font-black">
          Sobrevivir al mundo después del impacto
        </h1>

        <p className="mt-6 text-xl text-slate-300 max-w-3xl">
          Una aventura 2D donde cada decisión puede abrir o cerrar posibilidades
          de adaptación.
        </p>

        <div className="mt-12 aspect-video rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-emerald-950 flex items-center justify-center">
          <p className="text-slate-400">
            Acá irá el primer prototipo jugable con Phaser
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/linea-evolutiva"
            className="rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-slate-950 hover:bg-emerald-300 transition"
          >
            Ver línea evolutiva
          </Link>

          <Link
            href="/aula"
            className="rounded-2xl border border-white/10 px-6 py-4 font-bold text-white hover:bg-white/[0.08] transition"
          >
            Trabajar en aula
          </Link>
        </div>
      </section>
    </main>
  );
}