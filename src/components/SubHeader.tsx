import { motion } from 'framer-motion';
import { pillars } from '@/data/content';
import { useScrollPosition } from '@/hooks/useScrollPosition';

export default function SubHeader() {
  const scrolled = useScrollPosition(100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`sticky top-[64px] z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-ink-gray-950/90 backdrop-blur-xl border-b border-white/10'
          : 'bg-ink-gray-900/50 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="container-max section-padding">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-3 group cursor-default"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-neon-green blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
                <pillar.icon className="relative w-6 h-6 text-neon-green group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <p className="font-display font-semibold text-sm text-white">
                  {pillar.label}
                </p>
                <p className="text-xs text-ink-gray-400 hidden sm:block">
                  {pillar.description}
                </p>
              </div>
              {i < pillars.length - 1 && (
                <div className="hidden sm:block w-px h-8 bg-white/10 ml-4" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
