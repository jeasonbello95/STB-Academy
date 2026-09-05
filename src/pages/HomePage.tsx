import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { BrandLogo } from '@/components/BrandLogo';
import { Mascot } from '@/components/Mascot';
import { PublishedCoursesSummary } from '@/components/sections/PublishedCoursesSummary';
import {
  Code2,
  Cpu,
  Box,
  TerminalSquare,
  MonitorPlay,
  MapPin,
  Smartphone,
  Apple,
  Play,
} from 'lucide-react';

const features = [
  {
    title: 'Programación por Bloques',
    description:
      'Aprende la lógica de la programación de manera visual e intuitiva. Ideal para dar los primeros pasos en el desarrollo de algoritmos y control de robots.',
    icon: Code2,
    visual: 'blocks' as const,
    align: 'left' as const,
  },
  {
    title: 'Diseño 3D',
    description:
      'Transforma tus ideas en modelos tangibles. Domina herramientas de modelado CAD para crear chasis de robots, carcasas personalizadas y piezas mecánicas listas para imprimir.',
    icon: Box,
    visual: 'cube' as const,
    align: 'right' as const,
  },
  {
    title: 'Electrónica Virtual',
    description:
      'Simula circuitos, microcontroladores y sensores en tiempo real. Diseña y prueba arquitecturas de hardware antes de llevarlas al banco de trabajo.',
    icon: Cpu,
    visual: 'circuit' as const,
    align: 'left' as const,
  },
  {
    title: 'Programación Avanzada',
    description:
      'Escribe código puro para sistemas embebidos e inteligencia artificial. Lleva tus proyectos al siguiente nivel con lenguajes profesionales.',
    icon: TerminalSquare,
    visual: 'code' as const,
    align: 'right' as const,
  },
];

const heroContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
};

/* ===== Visuales animados para la sección de características ===== */

/** Diseño 3D: cubo alámbrico con planos girando en direcciones opuestas. */
function CubeVisual() {
  return (
    <div className="relative flex h-44 w-44 items-center justify-center md:h-52 md:w-52">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-2xl border-2 border-cyan-400/40 shadow-[0_0_30px_rgba(34,211,238,0.12)]"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-4 rounded-2xl border-2 border-primary-400/40"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-8 rounded-2xl border border-white/25"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-12 rounded-xl border border-cyan-300/30"
      />
      <Box className="h-8 w-8 text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]" />
    </div>
  );
}

/** Electrónica Virtual: circuitos con anillos y puntos de corriente orbitando. */
function CircuitVisual() {
  return (
    <div className="relative flex h-44 w-44 items-center justify-center md:h-52 md:w-52">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-6 rounded-full border border-emerald-400/30"
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 rounded-full border border-dashed border-emerald-400/40"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-4 rounded-full border border-cyan-400/25"
      />
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 9 + i * 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
        >
          <div className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-400 shadow-[0_0_12px_rgba(84,180,53,0.95)]" />
        </motion.div>
      ))}
      <Cpu className="h-12 w-12 text-primary-400 drop-shadow-[0_0_15px_rgba(84,180,53,0.55)]" />
    </div>
  );
}

/** Programación Avanzada: terminal con líneas de código que se revelan. */
function CodeVisual() {
  const lines = [
    { text: 'const robot = new Robot();', cls: 'text-slate-300' },
    { text: 'robot.sensor("IR");', cls: 'text-slate-300' },
    { text: 'while (obstacle) {', cls: 'text-primary-400' },
    { text: '  robot.turn("left");', cls: 'text-slate-300' },
    { text: '}', cls: 'text-primary-400' },
    { text: 'await robot.run();', cls: 'text-cyan-300' },
  ];
  return (
    <div className="w-64 overflow-hidden rounded-xl border border-white/10 bg-deep-950/80 text-left font-mono text-xs shadow-2xl md:w-72 md:text-sm">
      <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        <span className="ml-2 text-[10px] text-ink-gray-500">robot.py</span>
      </div>
      <div className="space-y-1.5 px-3 py-3">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.4 }}
            className={`${line.cls} leading-relaxed`}
          >
            <span className="mr-1.5 select-none text-primary-500/60">&gt;</span>
            {line.text}
          </motion.p>
        ))}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
          className="inline-block h-3.5 w-[7px] translate-y-0.5 bg-primary-400"
        />
      </div>
    </div>
  );
}

/** Programación por Bloques: bloques que encajan entre sí con un snap animado. */
function BlocksVisual() {
  const blocks = [
    { label: 'al iniciar', dot: 'bg-primary-400', border: 'border-primary-400/50', text: 'text-primary-300' },
    { label: 'repetir 4 veces', dot: 'bg-cyan-400', border: 'border-cyan-400/50', text: 'text-cyan-300' },
    { label: 'mover 10 pasos', dot: 'bg-amber-400', border: 'border-amber-400/50', text: 'text-amber-300' },
    { label: 'girar 15 grados', dot: 'bg-pink-400', border: 'border-pink-400/50', text: 'text-pink-300' },
  ];
  return (
    <div className="flex flex-col items-center gap-2.5">
      {blocks.map((b, i) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, y: -22, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            delay: i * 0.18,
            duration: 0.45,
            ease: 'backOut',
            repeat: Infinity,
            repeatDelay: 3.6,
          }}
          className={`flex items-center gap-2.5 rounded-xl border-2 bg-deep-900/80 px-4 py-2 font-mono text-xs font-bold shadow-[0_0_14px_rgba(84,180,53,0.08)] ${b.border} ${b.text}`}
        >
          <span className={`h-2 w-2 rounded-full ${b.dot}`} />
          {b.label}
        </motion.div>
      ))}
    </div>
  );
}

export function HomePage() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* ================= HERO SECTION ================= */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20 text-center">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto max-w-4xl"
        >


          {/* Mascota arriba, montándose sobre el texto (detrás, a opacidad normal) */}
          <motion.div variants={heroItem} className="relative z-0 flex justify-center">
            <Mascot
              src="/imagenes/muneco-posando.png"
              alt=""
              float
              floatDuration={6}
              glow
              className="-mb-8 h-40 w-auto md:-mb-12 md:h-52 lg:h-60 drop-shadow-[0_0_35px_rgba(84,180,53,0.45)]"
            />
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="relative z-10 font-display text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl"
          >
            Creando tu futuro,
            <br />
            <span className="text-gradient drop-shadow-[0_0_10px_rgba(84,180,53,0.35)]">
              una clase a la vez
            </span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Aprende robótica, programación y electrónica con proyectos reales.
            Inscríbete en nuestros cursos y empieza a construir tu futuro hoy
            mismo.
          </motion.p>

          <motion.div
            variants={heroItem}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              to="/cursos"
              size="xl"
              variant="glow"
              className="text-black font-bold shadow-[0_0_30px_rgba(84,180,53,0.35)] rounded-full px-8"
            >
              <MonitorPlay className="h-5 w-5" />
              Cursos Online
            </Button>
            <Button
              to="/eventos"
              size="xl"
              variant="outline"
              className="border-slate-700 hover:border-primary-500/50 hover:bg-slate-800/50 rounded-full px-8 transition-all"
            >
              <MapPin className="h-5 w-5" />
              Cursos Presenciales
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= RESUMEN DE CURSOS PUBLICADOS ================= */}
      <PublishedCoursesSummary />

      {/* ================= APP DOWNLOAD SECTION ================= */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Blobs decorativos */}
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-[6%] h-80 w-80 rounded-full bg-navy-800/50 blur-[120px]"
        />
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-[4%] h-72 w-72 rounded-full bg-primary-500/10 blur-[110px]"
        />

        <div className="relative max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-deep-900/40 backdrop-blur-xl shadow-2xl"
          >
            {/* Línea superior de glow */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/60 to-cyan-400/50" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-8 sm:p-12 md:p-16">
              {/* Texto + descargas */}
              <div className="text-center md:text-left">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300"
                >
                  <Smartphone className="h-4 w-4" />
                  Nuestra App
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="mt-5 font-display text-3xl md:text-5xl font-extrabold text-white leading-tight"
                >
                  Aprende a programar,{' '}
                  <span className="text-gradient">donde estés</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="mt-5 text-slate-400 text-base md:text-lg leading-relaxed"
                >
                  Descarga la app de STB Academy y lleva tus clases de
                  robótica, programación y electrónica a tu bolsillo.
                  Disponible para Android y iOS.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
                >
                  <a
                    href="#"
                    className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-500/40 hover:bg-primary-500/10 hover:shadow-[0_0_20px_rgba(84,180,53,0.2)]"
                  >
                    <Apple className="h-6 w-6 text-white transition-transform duration-300 group-hover:scale-110" />
                    <span className="flex flex-col items-start leading-tight">
                      <span className="text-[10px] uppercase tracking-wider text-ink-gray-400">
                        Descargar en
                      </span>
                      <span className="text-sm font-bold text-white">
                        App Store
                      </span>
                    </span>
                  </a>
                  <a
                    href="#"
                    className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-500/40 hover:bg-primary-500/10 hover:shadow-[0_0_20px_rgba(84,180,53,0.2)]"
                  >
                    <Play className="h-5 w-5 fill-current text-primary-400 transition-transform duration-300 group-hover:scale-110" />
                    <span className="flex flex-col items-start leading-tight">
                      <span className="text-[10px] uppercase tracking-wider text-ink-gray-400">
                        Disponible en
                      </span>
                      <span className="text-sm font-bold text-white">
                        Google Play
                      </span>
                    </span>
                  </a>
                </motion.div>
              </div>

              {/* Visual: mockup de teléfono */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
                className="relative flex items-center justify-center"
              >
                <div className="relative">
                  {/* Glow detrás */}
                  <div className="absolute inset-0 mx-auto my-8 h-64 w-64 rounded-full bg-primary-500/15 blur-[90px]" />

                  <motion.div
                    animate={{ y: [-12, 12, -12] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative mx-auto w-[220px] md:w-[250px] overflow-hidden rounded-[2.4rem] border border-white/15 bg-deep-950 shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                  >
                    {/* Pantalla */}
                    <div className="relative flex h-[440px] md:h-[500px] flex-col gap-3 p-4 pt-12">
                      {/* Notch */}
                      <div className="absolute top-3 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full border border-white/10 bg-deep-900" />

                      {/* Header de la app */}
                      <div className="flex items-center justify-center">
                        <BrandLogo variant="green" size="sm" />
                      </div>

                      {/* Tarjeta de curso destacado */}
                      <div className="rounded-2xl border border-primary-500/30 bg-gradient-to-br from-primary-500/15 to-cyan-500/10 p-3">
                        <p className="text-[11px] font-semibold text-primary-300">
                          Curso destacado
                        </p>
                        <p className="mt-0.5 text-sm font-bold text-white">
                          Robótica desde cero
                        </p>
                        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-primary-500 px-3 py-1 text-[10px] font-bold text-black">
                          <MonitorPlay className="h-3 w-3" />
                          Empezar
                        </div>
                      </div>

                      {/* Módulos */}
                      <div className="space-y-2">
                        {['Programación', 'Electrónica', 'Diseño 3D'].map((m) => (
                          <div
                            key={m}
                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-2"
                          >
                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-500/15">
                              <MonitorPlay className="h-3.5 w-3.5 text-primary-400" />
                            </span>
                            <span className="text-xs font-medium text-slate-300">
                              {m}
                            </span>
                            <span className="ml-auto h-4 w-4 rounded-full border border-white/20" />
                          </div>
                        ))}
                      </div>

                      {/* Progreso */}
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="flex items-center justify-between">
                          <p className="text-[10px] text-ink-gray-400">
                            Nivel 4 · Robótica
                          </p>
                          <p className="text-[10px] font-bold text-primary-400">
                            80%
                          </p>
                        </div>
                        <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                          <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-primary-500 to-cyan-400" />
                        </div>
                      </div>

                      {/* Barra inferior */}
                      <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-3 text-center">
                        <p className="text-[10px] font-semibold text-primary-300">
                          STB Academy
                        </p>
                        <div className="mx-auto mt-2 h-1.5 w-14 rounded-full bg-white/15" />
                      </div>
                    </div>

                    {/* Brillo interior superior */}
                    <div className="pointer-events-none absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-primary-500/20 blur-[60px]" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= CONTINUOUS FEATURES SECTION ================= */}
      <section className="relative py-32 overflow-hidden">
        {/* Línea central brillante (simulando una pista de circuito) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary-500/50 to-transparent -translate-x-1/2" />

        <div className="max-w-6xl mx-auto px-6">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: feature.align === 'left' ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-32 ${
                feature.align === 'right' ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Nodo central en la línea */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary-500 shadow-[0_0_15px_rgba(84,180,53,0.8)] z-20" />

              {/* Contenido de Texto */}
              <div className="w-full md:w-1/2 text-left">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary-500/30 bg-primary-500/10 mb-6">
                  <feature.icon className="h-6 w-6 text-primary-400" />
                </div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Panel visual estilo Glassmorphism */}
              <div className="w-full md:w-1/2">
                <div className="relative aspect-video rounded-3xl border border-white/10 bg-deep-900/50 backdrop-blur-xl shadow-2xl overflow-hidden flex items-center justify-center p-8 group hover:border-primary-500/50 hover:shadow-[0_0_40px_rgba(84,180,53,0.2)] transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Visual animado según la característica */}
                  {feature.visual === 'cube' ? (
                    <CubeVisual />
                  ) : feature.visual === 'circuit' ? (
                    <CircuitVisual />
                  ) : feature.visual === 'blocks' ? (
                    <BlocksVisual />
                  ) : (
                    <CodeVisual />
                  )}

                  {/* Elementos UI simulados dentro de la tarjeta */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-slate-700" />
                    <div className="h-3 w-3 rounded-full bg-slate-700" />
                    <div className="h-3 w-3 rounded-full bg-slate-700" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= BOTTOM CTA ================= */}
      <section className="relative py-28 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto max-w-6xl rounded-[3rem] border border-primary-500/30 bg-deep-900/60 backdrop-blur-2xl p-8 sm:p-12 md:p-16 lg:p-20 overflow-hidden shadow-[0_0_50px_rgba(84,180,53,0.12)]"
        >
          {/* Brillo de fondo CTA */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl bg-primary-500/10 blur-[120px] pointer-events-none" />
          <div className="absolute top-0 right-0 h-full w-1/2 bg-cyan-500/5 blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 text-center lg:text-left">
            {/* Texto y Botones a la derecha en escritorio */}
            <div className="flex-1 max-w-2xl flex flex-col items-center lg:items-start lg:order-2">
              {/* Logo en el CTA */}
              <BrandLogo variant="green" size="md" className="mb-6" />

              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                ¿Listo para{' '}
                <span className="text-gradient drop-shadow-[0_0_15px_rgba(84,180,53,0.4)]">
                  construir?
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-primary-300 mb-8 max-w-lg">
                Empieza ahora mismo y transforma tus ideas en proyectos reales.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Button
                  to="/registro"
                  size="xl"
                  className="bg-primary-500 hover:bg-primary-400 text-black font-bold rounded-full px-8 shadow-[0_0_20px_rgba(84,180,53,0.4)] w-full sm:w-auto justify-center"
                >
                  Crear cuenta
                </Button>
                <Button
                  to="/cursos"
                  size="xl"
                  variant="outline"
                  className="border-slate-700 hover:border-white rounded-full px-8 text-white backdrop-blur-md w-full sm:w-auto justify-center"
                >
                  Ver temario completo
                </Button>
              </div>
            </div>

            {/* Mascota apuntando a la derecha al lado del texto (izquierda en escritorio) */}
            <div className="flex-shrink-0 flex items-center justify-center relative lg:order-1">
              <div className="absolute inset-0 bg-primary-500/10 rounded-full blur-2xl transform scale-75" />
              <Mascot
                src="/imagenes/apuntando-a-la-derecha.png"
                alt="Mascota STB apuntando"
                float
                floatDuration={5}
                glow
                className="relative h-64 sm:h-80 md:h-96 lg:h-[380px] w-auto object-contain drop-shadow-[0_0_30px_rgba(84,180,53,0.35)]"
              />
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
