import { GraduationCap, Play, Presentation } from "lucide-react";

const modes = [
  {
    title: "Modo charla",
    description:
      "Una experiencia visual para presentar en pantalla grande, tomar decisiones con el público y generar impacto emocional.",
    icon: Presentation,
    color: "bg-orange-400",
    href: "/charla",
  },
  {
    title: "Modo juego",
    description:
      "Una aventura interactiva donde el usuario toma decisiones para sobrevivir a un mundo transformado.",
    icon: Play,
    color: "bg-emerald-400",
    href: "/juego",
  },
  {
    title: "Modo aula",
    description:
      "Actividades, preguntas y recursos para que la docente trabaje evolución, evidencia, adaptación y selección natural.",
    icon: GraduationCap,
    color: "bg-sky-300",
    href: "/aula",
  },
];

export default function ModeCards() {
  return (
    <section className="relative px-6 py-24 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-orange-300 uppercase tracking-[0.3em] text-sm">
            Tres formas de vivir la experiencia
          </p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black">
            Charlar, jugar y aprender
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {modes.map((mode) => {
            const Icon = mode.icon;

            return (
              <a
                key={mode.title}
                href={mode.href}
                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.08] transition"
              >
                <div
                  className={`mb-6 w-14 h-14 rounded-2xl ${mode.color} text-slate-950 flex items-center justify-center`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="text-2xl font-bold">{mode.title}</h3>

                <p className="mt-4 text-slate-400 leading-relaxed">
                  {mode.description}
                </p>

                <p className="mt-6 text-sm text-orange-300 group-hover:translate-x-1 transition">
                  Entrar →
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}