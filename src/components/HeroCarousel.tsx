import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, UserPlus } from 'lucide-react';
import { slides } from '@/data/content';

const AUTOPLAY_MS = 6000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const SlideIcon = slides[current].icon;

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + slides.length) % slides.length);
    },
    [],
  );

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  useEffect(() => {
    const timer = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [go]);

  return (
    <section
      id="inicio"
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-ink-black"
    >
      {/* Slides */}
      <AnimatePresence custom={direction} mode="sync">
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src={slides[current].image}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-black via-ink-black/80 to-ink-black/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-ink-black/50" />
          </div>

          {/* Content */}
          <div className="relative h-full container-max section-padding flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass">
                <SlideIcon className="w-4 h-4 text-neon-green" />
                <span className="text-xs font-medium tracking-wide text-ink-gray-200">
                  STB ACADEMY · {String(current + 1).padStart(2, '0')} /{' '}
                  {String(slides.length).padStart(2, '0')}
                </span>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] tracking-tight text-balance"
              >
                {slides[current].title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="mt-4 text-xl sm:text-2xl font-medium text-gradient-neon"
              >
                {slides[current].subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55 }}
                className="mt-6 text-base sm:text-lg text-ink-gray-300 leading-relaxed max-w-xl"
              >
                {slides[current].description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-10 flex flex-col sm:flex-row gap-4"
              >
                <a href="#cursos" className="btn-primary group">
                  Explorar Cursos
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#registro" className="btn-outline group">
                  <UserPlus className="w-5 h-5" />
                  Registrarme Gratis
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls — arrows */}
      <div className="absolute bottom-8 right-4 sm:right-8 z-20 flex items-center gap-3">
        <button
          aria-label="Anterior"
          onClick={() => go(-1)}
          className="p-3 rounded-full glass glass-hover"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          aria-label="Siguiente"
          onClick={() => go(1)}
          className="p-3 rounded-full glass glass-hover"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Controls — dots */}
      <div className="absolute bottom-8 left-4 sm:left-8 z-20 flex items-center gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            aria-label={`Ir a slide ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current
                ? 'w-12 bg-neon-green'
                : 'w-6 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
