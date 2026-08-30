import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Cpu,
  Code2,
  CircuitBoard,
  Box,
  Zap,
  Monitor,
  Smartphone,
  Globe,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Paleta de bloques de programación
const blockPalette = [
  { color: 'bg-yellow-500', label: 'cuando iniciar' },
  { color: 'bg-blue-500', label: 'repetir 10 veces' },
  { color: 'bg-green-500', label: 'mover adelante' },
  { color: 'bg-purple-500', label: 'girar derecha' },
  { color: 'bg-orange-500', label: 'encender LED' },
];

const blockStack = [
  { color: 'bg-yellow-500', label: 'cuando iniciar', indent: 0 },
  { color: 'bg-blue-500', label: 'repetir 10 veces', indent: 1 },
  { color: 'bg-green-500', label: 'mover adelante 100px', indent: 2 },
  { color: 'bg-purple-500', label: 'girar derecha 90°', indent: 2 },
  { color: 'bg-orange-500', label: 'encender LED', indent: 2 },
];

export function STBlockPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ['0%', '20%']);

  return (
    <div ref={containerRef} className="stblock-page relative min-h-screen selection:bg-primary-500/30">
      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center pt-40">
        <motion.div
          style={{ y: heroY }}
          className="section-padding flex w-full max-w-6xl flex-col items-center text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl animate-gradient-shift"
          >
            El entorno todo en uno <br className="hidden md:block" />
            para <span className="text-gradient drop-shadow-[0_0_15px_rgba(84,180,53,0.5)]">crear sin límites</span>
          </motion.h1>

          {/* Gráfico Holográfico Central + Mascota */}
          <div className="hero-hologram relative mt-20 flex h-80 w-full max-w-2xl items-center justify-center">
            {/* Anillos concéntricos */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute h-64 w-64 rounded-full border border-primary-500/30 shadow-[0_0_50px_rgba(84,180,53,0.1)]"
            />
            <motion.div 
              animate={{ rotate: -360 }} 
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="absolute h-80 w-80 rounded-full border-2 border-dashed border-primary-500/20" 
            />
            
            {/* Icono Central */}
            <div className="absolute flex h-24 w-24 items-center justify-center rounded-full bg-deep-900/80 border border-primary-500/50 shadow-[0_0_30px_rgba(84,180,53,0.4)] backdrop-blur-md">
              <Monitor className="h-10 w-10 text-primary-400" />
            </div>

            {/* Iconos Orbitando */}
            <div className="absolute top-10 left-20 flex h-14 w-14 items-center justify-center rounded-full border border-primary-500/40 bg-deep-900/60 backdrop-blur-sm">
              <Globe className="h-6 w-6 text-cyan-400" />
            </div>
            <div className="absolute bottom-10 left-32 flex h-12 w-12 items-center justify-center rounded-full border border-primary-500/40 bg-deep-900/60 backdrop-blur-sm">
              <Smartphone className="h-5 w-5 text-primary-400" />
            </div>
            <div className="absolute top-20 right-32 flex h-12 w-12 items-center justify-center rounded-full border border-yellow-500/40 bg-deep-900/60 backdrop-blur-sm">
              <Zap className="h-5 w-5 text-yellow-400" />
            </div>

            {/* Mascota Volando (Hero) */}
            <motion.img
              animate={{ y: [-15, 15, -15] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              src="/imagenes/saludando-mascota.png"
              alt="STB Mascot"
              className="absolute -right-10 top-0 h-72 w-auto object-contain drop-shadow-[0_0_20px_rgba(84,180,53,0.2)] md:-right-20 lg:-right-32 lg:h-96"
            />
          </div>

          {/* CTA principal */}
          <div className="cta-row mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Button
              to="/stblock/run"
              size="xl"
              variant="glow"
              className="min-w-[240px] shadow-[0_0_30px_rgba(84,180,53,0.35)]"
            >
              <Zap className="h-5 w-5" />
              Iniciar STBlock
            </Button>
            <Button
              href="#"
              size="xl"
              variant="outline"
              className="min-w-[240px] border-white/20 bg-white/5 backdrop-blur-md"
            >
              <Download className="h-5 w-5" />
              Descargar versión escritorio
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ================= PROGRAMACIÓN POR BLOQUES ================= */}
      <section className="relative z-10 py-24 overflow-hidden">
        <div className="section-padding relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500/10 border border-primary-500/30">
                <Code2 className="h-8 w-8 text-primary-400" />
              </div>
              <h2 className="font-display text-4xl font-extrabold text-white md:text-5xl">
                Programación <br/> por <span className="text-gradient">Bloques</span>
              </h2>
              <p className="mt-6 text-lg text-ink-300">
                Usa una interfaz visualmente atractiva para aprender. 
                Arrastra y conecta bloques lógicos como un rompecabezas para dar vida a tus proyectos.
              </p>
            </motion.div>

            {/* Visual de Bloques Flotantes */}
            <div className="relative h-[380px] w-full flex items-center justify-center">
              <div className="relative h-full w-full max-w-md">
                {blockPalette.map((block, i) => {
                  if (i === 0) return null;
                  return (
                    <motion.div
                      key={i}
                      animate={{ y: [-6, 6, -6], x: [-3, 3, -3] }}
                      transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                      className={`absolute rounded-2xl ${block.color} px-6 py-4 font-bold text-white shadow-2xl border border-white/20 backdrop-blur-md`}
                      style={{
                        top: `${i * 65 + 10}px`,
                        left: `${(i % 3) * 35 + 20}px`,
                        zIndex: 10 - i,
                        transform: `perspective(1000px) rotateY(-12deg) rotateX(8deg)`
                      }}
                    >
                      {block.label}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= IDE CENTRAL MOCKUP ================= */}
      <section className="relative z-10 py-32">
        <div className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-5xl"
          >
            {/* Mascota asomándose por arriba */}
            <motion.img
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              src="/imagenes/muñeco.png"
              alt="Mascota asomándose"
              className="absolute -top-32 left-1/2 h-48 -translate-x-1/2 object-contain z-0 drop-shadow-2xl md:h-64 md:-top-44"
            />

            {/* Ventana de la App (Glassmorphism) */}
            <div className="relative z-10 overflow-hidden rounded-[2rem] border border-primary-500/30 bg-deep-900/60 shadow-[0_0_80px_rgba(84,180,53,0.15)] backdrop-blur-xl">

              {/* Barra superior estilo MacOS/Browser */}
              <div className="flex items-center gap-2 border-b border-white/10 bg-deep-950/80 px-6 py-4">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto flex h-8 w-1/2 items-center justify-center rounded-md bg-deep-900 border border-white/5 text-xs text-ink-500">
                  <Globe className="mr-2 h-3.5 w-3.5" /> stblock.academy.net/editor
                </div>
                <Button size="sm" variant="primary" className="h-8 py-0 text-xs">Guardar</Button>
              </div>

              {/* Cuerpo del IDE */}
              <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_300px]">
                {/* Sidebar Izquierda */}
                <div className="border-r border-white/5 bg-deep-950/40 p-4">
                  <p className="mb-4 text-xs font-bold text-ink-400">HERRAMIENTAS</p>
                  <div className="space-y-3">
                    {blockPalette.map((b, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg border border-white/5 bg-deep-900/50 p-2">
                         <div className={`h-4 w-4 rounded-full ${b.color}`} />
                         <span className="text-xs text-white">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Área de Código */}
                <div className="relative min-h-[400px] p-8">
                  <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
                  <div className="relative space-y-2">
                    {blockStack.map((block, i) => (
                       <motion.div
                         key={i}
                         initial={{ opacity: 0, x: -20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         transition={{ delay: i * 0.1 }}
                         style={{ marginLeft: `${block.indent * 24}px` }}
                         className={`inline-block rounded-md border border-white/10 ${block.color} px-4 py-2 text-sm font-semibold text-white shadow-lg`}
                       >
                         {block.label}
                       </motion.div>
                    ))}
                  </div>
                </div>

                {/* Panel de Vista Previa (Simulador Holográfico) */}
                <div className="border-l border-white/5 bg-gradient-to-b from-deep-950/80 to-deep-800/20 p-6 flex flex-col items-center justify-center">
                  <div className="relative h-48 w-full rounded-xl border border-primary-500/30 bg-deep-950 shadow-[inset_0_0_30px_rgba(84,180,53,0.2)]">
                     {/* Elemento simulado (CPU flotando) */}
                     <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-primary-400/50 bg-deep-800/80 shadow-[0_0_20px_rgba(84,180,53,0.4)] backdrop-blur-sm"
                     >
                        <Cpu className="h-10 w-10 text-cyan-400" />
                     </motion.div>

                     {/* Base del holograma */}
                     <div className="absolute bottom-4 left-1/2 h-4 w-32 -translate-x-1/2 rounded-[100%] bg-primary-500/30 blur-md" />
                  </div>
                  <div className="mt-6 w-full rounded-lg bg-deep-900 p-4 border border-white/5">
                     <p className="text-xs text-ink-400 mb-2">ESTADO DEL SIMULADOR</p>
                     <div className="flex justify-between text-sm">
                        <span className="text-white">Conexión</span>
                        <span className="text-primary-400 font-mono">Activa</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= ELECTRÓNICA Y 3D (Z-Pattern) ================= */}
      <section className="relative z-10 py-24 overflow-hidden">
        <div className="section-padding relative max-w-6xl mx-auto space-y-40">
          
          {/* Electrónica Virtual (Texto Derecha, Visual Izquierda) */}
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual Protoboard Simulada */}
            <div className="relative h-[350px] w-full rounded-3xl border border-white/10 bg-deep-900/40 p-8 backdrop-blur-xl">
               <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
               <motion.div 
                 className="relative h-full w-full rounded-xl border-2 border-ink-800 bg-white/5 shadow-inner backdrop-blur-md grid grid-cols-6 grid-rows-12 gap-1 p-4"
               >
                 {/* Puntos de la protoboard generados estáticamente para efecto visual */}
                 {Array.from({length: 72}).map((_, i) => (
                    <div key={i} className="h-2 w-2 rounded-full bg-ink-800/50 shadow-inner" />
                 ))}
                 
                 {/* Componentes superpuestos */}
                 <div className="absolute top-10 left-10 h-16 w-8 bg-ink-950 border border-ink-700 rounded-sm" />
                 <div className="absolute bottom-10 right-20 h-12 w-12 bg-red-500/20 rounded-full border border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]" />
                 
                 {/* Cables simulados con SVG */}
                 <svg className="absolute inset-0 h-full w-full pointer-events-none">
                    <path d="M 60,60 Q 100,120 180,100" fill="none" stroke="#22c55e" strokeWidth="3" />
                    <path d="M 80,180 Q 150,200 220,160" fill="none" stroke="#ef4444" strokeWidth="3" />
                 </svg>
               </motion.div>
               {/* Mascota */}
               <motion.img
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  src="/imagenes/soldando-mascota.png"
                  alt="Mascota electrónica"
                  className="absolute -right-10 -bottom-10 h-64 w-auto object-contain drop-shadow-2xl"
               />
            </div>
            
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500/10 border border-primary-500/30">
                <CircuitBoard className="h-8 w-8 text-cyan-400" />
              </div>
              <h2 className="font-display text-4xl font-extrabold text-white md:text-5xl">
                Electrónica <span className="text-primary-400 drop-shadow-[0_0_15px_rgba(84,180,53,0.5)]">Virtual</span>
              </h2>
              <p className="mt-6 text-lg text-ink-300">
                Siempre ten tus herramientas a la mano. Simula circuitos, programa microcontroladores y visualiza el flujo de energía en una protoboard virtual interactiva.
              </p>
            </motion.div>
          </div>

          {/* Diseño 3D (Texto Izquierda, Visual Derecha) */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/30">
                <Box className="h-8 w-8 text-purple-400" />
              </div>
              <h2 className="font-display text-4xl font-extrabold text-white md:text-5xl">
                Diseño <span className="text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">3D</span>
              </h2>
              <p className="mt-6 text-lg text-ink-300">
                Da forma a tus ideas. Modela piezas en tres dimensiones, ensambla partes de robótica y prepara tus diseños directamente para la impresión 3D desde el navegador.
              </p>
            </motion.div>

            {/* Visual Cubos 3D */}
            <div className="relative h-[350px] w-full flex items-center justify-center">
               <motion.div 
                 animate={{ rotateY: 360, rotateX: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="relative h-40 w-40"
                 style={{ transformStyle: 'preserve-3d' }}
               >
                  {/* Cubo simple en CSS (Frente, Atrás, Lados simulados con opacidad) */}
                  <div className="absolute inset-0 border-2 border-purple-500/50 bg-purple-500/10 backdrop-blur-sm" style={{ transform: 'translateZ(80px)' }} />
                  <div className="absolute inset-0 border-2 border-primary-500/50 bg-primary-500/10 backdrop-blur-sm" style={{ transform: 'translateZ(-80px)' }} />
                  <div className="absolute inset-0 border-2 border-primary-500/50 bg-primary-500/10 backdrop-blur-sm" style={{ transform: 'rotateY(90deg) translateZ(80px)' }} />
                  <div className="absolute inset-0 border-2 border-blue-500/50 bg-blue-500/10 backdrop-blur-sm" style={{ transform: 'rotateY(90deg) translateZ(-80px)' }} />
               </motion.div>
               
               {/* Mascota sentada / posando */}
               <motion.img
                  animate={{ y: [-15, 15, -15] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  src="/imagenes/innovacion-mascota.png"
                  alt="Mascota 3D"
                  className="absolute bottom-0 h-72 w-auto object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]"
               />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}