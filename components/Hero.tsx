export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-black" />

      <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-orange-400/20 blur-3xl" />
      <div className="absolute top-40 left-20 w-32 h-32 rounded-full bg-red-500/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-emerald-950 to-transparent" />

      <div className="relative z-10 max-w-5xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-orange-300">
          Hace 66 millones de años
        </p>

        <h1 className="text-5xl md:text-7xl font-black tracking-tight">
          Sobrevive:
          <span className="block text-orange-300">Evolución</span>
        </h1>

        <p className="mt-6 text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto">
          Una experiencia interactiva sobre la vida después de la extinción de
          los dinosaurios.
        </p>

        <p className="mt-8 text-slate-400 max-w-2xl mx-auto">
          Primero emociona. Después invita a jugar. Finalmente convierte la
          experiencia en aprendizaje dentro del aula.
        </p>
      </div>
    </section>
  );
}