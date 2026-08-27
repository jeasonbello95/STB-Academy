import { motion } from 'framer-motion';
import {
  Cpu,
  Play,
  Download,
  Code2,
  CircuitBoard,
  Box,
  Zap,
  Layers,
  Monitor,
  Smartphone,
  Globe,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const features = [
  {
    icon: Code2,
    title: 'Programación por Bloques',
    desc: 'Crea programas arrastrando y soltando bloques visuales. Ideal para aprender lógica de programación.',
  },
  {
    icon: CircuitBoard,
    title: 'Electrónica Virtual',
    desc: 'Simula circuitos con Arduino, sensores y componentes electrónicos en tiempo real.',
  },
  {
    icon: Box,
    title: 'Diseño 3D',
    desc: 'Modela piezas 3D y visualiza tus proyectos desde cualquier ángulo directamente en el navegador.',
  },
];

const techBadges = [
  { icon: Globe, label: '100% Web' },
  { icon: Monitor, label: 'Multiplataforma' },
  { icon: Smartphone, label: 'Mobile Ready' },
  { icon: Zap, label: 'Tiempo Real' },
];

// Mock block interface elements
const blockPalette = [
  { color: 'bg-yellow-500', label: 'cuando iniciar' },
  { color: 'bg-blue-500', label: 'repetir 10 veces' },
  { color: 'bg-green-500', label: 'mover adelante' },
  { color: 'bg-purple-500', label: 'girar derecha' },
  { color: 'bg-orange-500', label: 'encender LED' },
  { color: 'bg-pink-500', label: 'esperar 1s' },
];

const blockStack = [
  { color: 'bg-yellow-500', label: 'cuando iniciar', indent: 0 },
  { color: 'bg-blue-500', label: 'repetir 10 veces', indent: 1 },
  { color: 'bg-green-500', label: 'mover adelante 100px', indent: 2 },
  { color: 'bg-purple-500', label: 'girar derecha 90°', indent: 2 },
  { color: 'bg-orange-500', label: 'encender LED', indent: 2 },
  { color: 'bg-pink-500', label: 'esperar 1 segundo', indent: 2 },
];

export function STBlockPage() {
  return (
    <div className="min-h-screen pt-32">
      {/* Hero */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-primary-500/15 blur-3xl" />
        <div className="section-padding relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-primary-500/20 bg-gradient-to-br from-primary-500/20 to-primary-700/10 shadow-lg shadow-primary-500/20">
              <Cpu className="h-12 w-12 text-primary-400" />
            </div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300">
              <Layers className="h-4 w-4" />
              Software Estrella
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              El entorno todo en uno para{' '}
              <span className="text-gradient">crear sin límites</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-300">
              STBlock es tu plataforma integral de programación, electrónica y
              diseño 3D. Construye, simula y comparte tus proyectos tecnológicos
              desde un solo lugar.
            </p>

            {/* Giant CTAs */}
            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <Button to="/stblock/run" size="xl" variant="glow">
                <Play className="h-6 w-6" />
                Iniciar STBlock en el navegador
              </Button>
              <Button href="#" size="xl" variant="secondary">
                <Download className="h-6 w-6" />
                Descargar STBlock
              </Button>
            </div>

            {/* Tech badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {techBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-900/80 px-4 py-2 text-sm text-ink-300"
                >
                  <badge.icon className="h-4 w-4 text-primary-500" />
                  {badge.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mockup Interface */}
      <section className="relative py-16">
        <div className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-2xl shadow-primary-500/10"
          >
            {/* Window bar */}
            <div className="flex items-center gap-2 border-b border-white/5 bg-ink-800/80 px-4 py-3">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-error/80" />
                <div className="h-3 w-3 rounded-full bg-warning/80" />
                <div className="h-3 w-3 rounded-full bg-success/80" />
              </div>
              <div className="ml-4 flex items-center gap-2 text-xs text-ink-500">
                <Globe className="h-3.5 w-3.5" />
                stblock.stbacademy.net/editor
              </div>
            </div>

            {/* Interface body */}
            <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_220px] lg:grid-cols-[240px_1fr_280px]">
              {/* Block palette */}
              <div className="border-r border-white/5 bg-ink-900/50 p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-500">
                  Bloques
                </p>
                <div className="space-y-2">
                  {blockPalette.map((block, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center gap-2"
                    >
                      <div
                        className={`h-8 cursor-grab rounded-md ${block.color} px-3 py-1.5 text-xs font-semibold text-white shadow-md transition-transform hover:scale-105 active:cursor-grabbing`}
                      >
                        {block.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Canvas / code stack */}
              <div className="relative min-h-[400px] bg-ink-950 p-6">
                <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
                <div className="relative space-y-1">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-500">
                    Área de trabajo
                  </p>
                  {blockStack.map((block, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      style={{ marginLeft: `${block.indent * 24}px` }}
                      className={`inline-block rounded-md ${block.color} px-4 py-2 text-sm font-semibold text-white shadow-md`}
                    >
                      {block.label}
                    </motion.div>
                  ))}
                </div>

                {/* Floating action button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-6 right-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 shadow-lg shadow-primary-500/40">
                    <Play className="h-5 w-5 fill-white text-white" />
                  </div>
                </motion.div>
              </div>

              {/* Preview panel */}
              <div className="border-l border-white/5 bg-ink-900/50 p-4">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-500">
                  Vista previa
                </p>
                <div className="relative h-48 overflow-hidden rounded-xl border border-white/10 bg-ink-950">
                  <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
                  <motion.div
                    animate={{
                      x: [0, 80, 80, 0, 0],
                      y: [0, 0, 80, 80, 0],
                      rotate: [0, 0, 90, 90, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute left-8 top-8 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-500 text-white"
                  >
                    <Cpu className="h-6 w-6" />
                  </motion.div>
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-primary-500/20 px-3 py-1 text-xs font-semibold text-primary-300">
                    <div className="h-2 w-2 rounded-full bg-primary-400 animate-pulse" />
                    LED ON
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-ink-500">Ciclos</span>
                    <span className="font-mono text-primary-400">10</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-ink-500">Estado</span>
                    <span className="font-mono text-success">Ejecutando</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-ink-500">Pin LED</span>
                    <span className="font-mono text-primary-400">13</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-24">
        <div className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
              Tres herramientas en{' '}
              <span className="text-gradient">una plataforma</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-400">
              Todo lo que necesitas para crear proyectos tecnológicos
              integrados.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-ink-900/80 p-8 transition-all duration-500 hover:border-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/10"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary-500/5 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary-500/20 bg-primary-500/10 transition-transform duration-500 group-hover:scale-110">
                    <feature.icon className="h-8 w-8 text-primary-400" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-400">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-24">
        <div className="section-padding">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-primary-500/20 bg-gradient-to-br from-primary-900/20 via-ink-900 to-ink-900 p-12 text-center md:p-20"
          >
            <div className="absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl" />
            <div className="relative">
              <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
                ¿Listo para{' '}
                <span className="text-gradient">construir</span>?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-ink-400">
                Empieza ahora mismo, sin instalaciones. Abre STBlock en tu
                navegador y comienza a crear.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button to="/stblock/run" size="lg" variant="glow">
                  <Play className="h-5 w-5" />
                  Ejecutar web
                </Button>
                <Button href="#" size="lg" variant="outline">
                  <Download className="h-5 w-5" />
                  Descargar instalador
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
