import Link from "next/link";
import { GraduationCap, Play, Route, Sparkles } from "lucide-react";

const screens = [
  {
    title: "Comenzar recorrido",
    description:
      "Desde la extinción de los dinosaurios hasta Homo sapiens y el presente.",
    href: "/recorrido/extincion",
    icon: Route,
    color: "bg-orange-400",
    featured: true,
  },
  {
    title: "Modo juego",
    description: "Una aventura 2D sobre adaptación, supervivencia y decisiones.",
    href: "/juego",
    icon: Play,
    color: "bg-emerald-400",
    featured: false,
  },
  {
    title: "Modo aula",
    description: "Actividades para transformar la experiencia en aprendizaje.",
    href: "/aula",
    icon: GraduationCap,
    color: "bg-sky-300",
    featured: false,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      <section className="cinematic-bars relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />

        <div className="absolute inset-0 bg-drift">
          <div className="absolute inset-0 stars-layer" />
          <div className="absolute inset-0 hero-glow" />
        </div>

        <div className="dust-layer absolute inset-0" />

        <div className="light-sweep absolute -left-1/4 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-orange-200/10 to-transparent blur-2xl" />

        <div className="impact-glow absolute right-10 top-20 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />

        <div className="meteor pointer-events-none absolute left-1/2 top-0 z-0 h-24 w-[420px]">
          <div className="meteor-tail absolute right-10 top-1/2 h-3 w-80 -translate-y-1/2 rounded-full" />
          <div className="absolute right-0 top-1/2 h-10 w-10 -translate-y-1/2 rounded-full bg-orange-300 shadow-[0_0_45px_rgba(251,146,60,0.9)]" />
          <div className="absolute right-2 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white/80 blur-[1px]" />
        </div>

        <div className="orb-a absolute top-20 right-20 h-56 w-56 rounded-full bg-orange-400/15 blur-3xl" />
        <div className="orb-b absolute top-40 left-20 h-40 w-40 rounded-full bg-red-500/10 blur-3xl" />
        <div className="orb-c absolute bottom-16 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />

        <div className="foreground-parallax absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-emerald-950 via-emerald-950/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-black to-transparent" />

        <div className="pointer-events-none absolute inset-0 cinematic-vignette" />

        <div className="pointer-events-none absolute inset-0">
          <span className="ember absolute bottom-16 left-[12%] h-1.5 w-1.5 rounded-full bg-orange-300/70 blur-[1px]" />
          <span className="ember absolute bottom-24 left-[28%] h-1 w-1 rounded-full bg-orange-200/60 blur-[1px] [animation-delay:1.5s]" />
          <span className="ember absolute bottom-20 left-[72%] h-1.5 w-1.5 rounded-full bg-orange-300/60 blur-[1px] [animation-delay:3s]" />
          <span className="ember absolute bottom-28 left-[84%] h-1 w-1 rounded-full bg-red-300/50 blur-[1px] [animation-delay:4.5s]" />
          <span className="ember absolute bottom-12 left-[48%] h-1.5 w-1.5 rounded-full bg-orange-200/70 blur-[1px] [animation-delay:2.2s]" />
        </div>

        <div className="relative z-10 max-w-6xl w-full py-20">
          <div className="text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-orange-300/20 bg-orange-300/10 px-4 py-2 text-sm text-orange-200 backdrop-blur-sm">
              <Sparkles size={16} />
              Adaptación · Supervivencia · Cooperación
            </div>

            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-orange-300 subtitle-breath">
              Hace 66 millones de años
            </p>

            <h1 className="font-title title-pulse text-6xl md:text-8xl tracking-wide text-white drop-shadow-2xl">
              RIFT:
              <span className="block text-orange-300">Ecos de la Vida</span>
            </h1>

            <p className="subtitle-breath mt-6 text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto">
              Una aventura interactiva a través de extinciones, adaptaciones y
              decisiones que cambiaron la historia de la vida.
            </p>

            <p className="subtitle-breath mt-5 text-slate-400 max-w-2xl mx-auto">
              Desde pequeños sobrevivientes hasta Homo sapiens, el camino revela
              una idea: adaptarse juntos fue nuestra mayor ventaja.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {screens.map((screen) => {
              const Icon = screen.icon;

              return (
                <Link
                  key={screen.title}
                  href={screen.href}
                  className={`group rounded-3xl border p-6 transition duration-300 backdrop-blur-sm ${
                    screen.featured
                      ? "border-orange-300/30 bg-orange-300/10 hover:bg-orange-300/15"
                      : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                  }`}
                >
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${screen.color} text-slate-950`}
                  >
                    <Icon size={28} />
                  </div>

                  <h2 className="text-xl font-bold">{screen.title}</h2>

                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {screen.description}
                  </p>

                  <p className="mt-6 text-sm text-orange-300 transition group-hover:translate-x-1">
                    Entrar →
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}