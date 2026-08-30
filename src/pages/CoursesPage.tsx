import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { courses, type Course } from '@/data/content';
import { Mascot } from '@/components/Mascot';
import { Button } from '@/components/ui/Button';

const categories = ['Todos', 'Robótica', 'IA', 'Electrónica', 'Programación', 'Diseño'];

export function CoursesPage() {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (c) => activeCategory === 'Todos' || c.category === activeCategory
    );
  }, [activeCategory]);

  return (
    <div className="min-h-screen pt-32 pb-24 text-white">
      {/* ================= HEADER ================= */}
      <section className="relative overflow-hidden py-12 md:py-20">
        {/* Patrón de cuadrícula y luces ambientales verde/azul */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 pointer-events-none" />
        <div className="absolute left-1/4 top-0 h-80 w-96 rounded-full bg-primary-500/10 blur-[130px] pointer-events-none" />
        <div className="absolute right-1/4 bottom-0 h-80 w-96 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />
        <div className="section-padding container-max relative z-10 flex flex-col items-center justify-between gap-10 lg:flex-row lg:gap-16">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl text-center lg:text-left"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300">
              <BookOpen className="h-4 w-4" />
              Cursos Online
            </div>
            <h1 className="font-display text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              Explora nuestros{' '}
              <span className="text-gradient">cursos</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-gray-400 lg:mx-0">
              Aprende robótica, programación y tecnología con proyectos reales a tu propio ritmo.
            </p>

            {/* Filtros simples */}
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-xl px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-primary-500 text-black shadow-[0_0_15px_rgba(84,180,53,0.3)]'
                        : 'bg-white/5 border border-white/10 text-ink-gray-300 hover:border-primary-500/40 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Mascota al lado del texto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="flex-shrink-0"
          >
            <Mascot
              src="/imagenes/explora-cursos.png"
              alt="Mascota Explora Cursos"
              float
              floatDuration={6}
              glow
              className="h-64 w-auto object-contain sm:h-80 md:h-96 lg:h-[380px]"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= LISTADO DE CURSOS ================= */}
      <section className="relative py-6">
        <div className="section-padding container-max">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs uppercase tracking-wider text-ink-gray-500 font-semibold">
              {filteredCourses.length} curso{filteredCourses.length !== 1 ? 's' : ''} disponible{filteredCourses.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course, index) => (
                <motion.article
                  key={course.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative flex flex-col sm:flex-row items-stretch rounded-2xl border border-white/10 bg-deep-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:border-primary-500/50 hover:shadow-[0_8px_30px_rgba(84,180,53,0.15)] gap-5 overflow-hidden"
                >
                  {/* Portada */}
                  <div className="relative h-44 sm:h-auto sm:w-44 shrink-0 rounded-xl overflow-hidden bg-deep-950 border border-white/10">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 left-2 rounded-md bg-deep-950/80 px-2 py-0.5 text-[11px] font-semibold text-primary-300 border border-white/10 backdrop-blur-sm">
                      {course.category}
                    </span>
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-ink-gray-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-primary-400" />
                          {course.duration}
                        </span>
                        <span>•</span>
                        <span className="rounded bg-white/5 px-2 py-0.5 text-primary-300 font-medium">
                          {course.level}
                        </span>
                      </div>

                      <h3 className="font-display text-lg font-bold text-white group-hover:text-primary-300 transition-colors leading-snug">
                        {course.title}
                      </h3>

                      <p className="mt-2 text-xs text-ink-gray-400 leading-relaxed line-clamp-2">
                        {course.description}
                      </p>
                    </div>

                    {/* Footer de la tarjeta */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase text-ink-gray-500 block">Precio</span>
                        <span className="font-display text-lg font-extrabold text-white">
                          {course.price}
                        </span>
                      </div>

                      <Button
                        to="/registro"
                        size="sm"
                        className="rounded-xl bg-primary-500 hover:bg-primary-400 text-black font-bold text-xs px-4 py-2 shadow-[0_0_12px_rgba(84,180,53,0.3)] group/btn"
                      >
                        <span>Inscribirme</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                      </Button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
