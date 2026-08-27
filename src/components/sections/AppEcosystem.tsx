import { motion } from 'framer-motion';
import { Smartphone, Apple, Download, Bell, Users, Zap } from 'lucide-react';

export default function AppEcosystem() {
  return (
    <section id="eventos" className="relative py-24 section-padding overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-neon-cyan/10 rounded-full blur-[100px]" />

      <div className="container-max relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-neon-cyan mb-3">
              App y Ecosistema
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Lleva la academia contigo.{' '}
              <span className="text-gradient-neon">
                Instala nuestra App Oficial.
              </span>
            </h2>
            <p className="mt-6 text-lg text-ink-gray-400 leading-relaxed">
              Accede a tus clases, recibe notificaciones de eventos en vivo y
              mantente conectado con la comunidad desde cualquier dispositivo.
            </p>

            {/* Feature pills */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { icon: Bell, label: 'Notificaciones en vivo' },
                { icon: Users, label: 'Comunidad activa' },
                { icon: Zap, label: 'Acceso instantáneo' },
              ].map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-ink-gray-200"
                >
                  <f.icon className="w-4 h-4 text-neon-green" />
                  {f.label}
                </div>
              ))}
            </div>

            {/* Download buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl glass glass-hover">
                <Apple className="w-6 h-6 text-white" />
                <div className="text-left">
                  <p className="text-[10px] text-ink-gray-400 leading-none">
                    Disponible en
                  </p>
                  <p className="text-sm font-semibold text-white leading-tight">
                    iOS PWA
                  </p>
                </div>
              </button>
              <button className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-xl glass glass-hover">
                <Download className="w-6 h-6 text-neon-green" />
                <div className="text-left">
                  <p className="text-[10px] text-ink-gray-400 leading-none">
                    Descargar para
                  </p>
                  <p className="text-sm font-semibold text-white leading-tight">
                    Android APK
                  </p>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Right — phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex items-center justify-center perspective-1000"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              {/* Phone frame */}
              <div className="relative w-[260px] h-[540px] rounded-[2.5rem] bg-ink-gray-900 border-[3px] border-white/10 shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-ink-gray-900 rounded-b-2xl z-20" />

                {/* Screen content */}
                <div className="h-full w-full bg-gradient-to-b from-ink-gray-950 to-ink-black p-5 pt-10 flex flex-col">
                  {/* App header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-neon-green/20 flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-neon-green" />
                      </div>
                      <span className="font-display font-bold text-sm">
                        STB Academy
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
                  </div>

                  {/* Greeting */}
                  <p className="text-xs text-ink-gray-500">Bienvenido de nuevo</p>
                  <p className="font-display text-lg font-bold mb-5">
                    Tu progreso
                  </p>

                  {/* Progress cards */}
                  <div className="space-y-3 flex-1">
                    {[
                      { name: 'Programación', progress: 75, color: 'bg-neon-green' },
                      { name: 'Robótica', progress: 45, color: 'bg-neon-cyan' },
                      { name: 'IA Básica', progress: 90, color: 'bg-neon-green-bright' },
                    ].map((item) => (
                      <div
                        key={item.name}
                        className="p-3 rounded-xl glass"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium">
                            {item.name}
                          </span>
                          <span className="text-xs text-ink-gray-400">
                            {item.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${item.progress}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full rounded-full ${item.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom nav */}
                  <div className="flex justify-around pt-4 border-t border-white/5">
                    {['M', 'C', 'P', 'A'].map((icon, i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                          i === 0
                            ? 'bg-neon-green/20 text-neon-green'
                            : 'text-ink-gray-500'
                        }`}
                      >
                        {icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Glow behind phone */}
              <div className="absolute inset-0 -z-10 bg-neon-green/20 blur-[80px] rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
