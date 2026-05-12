import Link from "next/link";
import BackButton from "@/components/BackButton";

export default function IntroPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <section className="relative min-h-screen flex items-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />
        <div className="absolute top-20 right-20 w-52 h-52 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-red-950/60 to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <BackButton />

          <p className="mt-16 text-sm uppercase tracking-[0.4em] text-orange-300">
            Introducción
          </p>

          <h1 className="mt-4 text-5xl md:text-7xl font-black tracking-tight">
            El día que cambió la vida en la Tierra
          </h1>

          <p className="mt-6 text-xl text-slate-300 max-w-3xl leading-relaxed">
            Hace 66 millones de años, un impacto alteró el clima, oscureció el
            cielo y transformó los ecosistemas. Muchos desaparecieron. Otros,
            pequeños y resistentes, encontraron nuevas oportunidades.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/linea-evolutiva"
              className="rounded-2xl bg-orange-400 px-6 py-4 font-bold text-slate-950 hover:bg-orange-300 transition"
            >
              Continuar
            </Link>

            <Link
              href="/charla"
              className="rounded-2xl border border-white/10 px-6 py-4 font-bold text-white hover:bg-white/[0.08] transition"
            >
              Ir a modo charla
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}