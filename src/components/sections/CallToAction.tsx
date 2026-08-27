import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';

export default function CallToAction() {
  return (
    <section className="relative py-24 section-padding overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-ink-gray-950 to-neon-cyan/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neon-green/10 blur-[150px] rounded-full" />

      <div className="container-max relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative glass rounded-3xl overflow-hidden p-12 sm:p-16 lg:p-20 text-center"
        >
          {/* Animated border glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-neon-green/20 via-transparent to-neon-cyan/20 opacity-50" />

          <div className="relative">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-neon-green mb-4">
              Únete a la Revolución
            </span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight max-w-3xl mx-auto text-balance">
              STB Academy es más que cursos. Es el lugar donde nacen los{' '}
              <span className="text-gradient-neon">líderes tecnológicos</span>{' '}
              del mañana.
            </h2>

            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white font-semibold shadow-lg hover:shadow-[0_0_40px_rgba(225,48,108,0.4)] transition-all"
            >
              <Instagram className="w-5 h-5" />
              Síguenos en Instagram
              <ArrowUpRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
