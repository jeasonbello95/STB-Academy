import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  GraduationCap,
  Search,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { fetchCourses, type DynamicCourse } from '@/data/courses';
import { Mascot } from '@/components/Mascot';
import { Button } from '@/components/ui/Button';

export function CoursesPage() {
  const [coursesList, setCoursesList] = useState<DynamicCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchCourses()
      .then((data) => {
        if (isMounted) {
          setCoursesList(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Error loading dynamic courses:', err);
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Extraer categorías dinámicamente según los cursos publicados en Tutor LMS
  const categories = useMemo(() => {
    const cats = new Set<string>();
    coursesList.forEach((c) => {
      if (c.category) cats.add(c.category);
      if (Array.isArray(c.categories)) {
        c.categories.forEach((cat) => cats.add(cat));
      }
    });
    return ['Todos', ...Array.from(cats)];
  }, [coursesList]);

  // Filtrar cursos según categoría activa y búsqueda
  const filteredCourses = useMemo(() => {
    return coursesList.filter((c) => {
      const matchesCategory =
        activeCategory === 'Todos' ||
        c.category === activeCategory ||
        (Array.isArray(c.categories) && c.categories.includes(activeCategory));

      const matchesSearch =
        !searchQuery.trim() ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [coursesList, activeCategory, searchQuery]);

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
              Cursos Tutor LMS en Vivo
            </div>
            <h1 className="font-display text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              Explora nuestros{' '}
              <span className="text-gradient">cursos</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-gray-400 lg:mx-0">
              Aprende trading cuantitativo, robótica, programación y tecnología con proyectos y metodologías de alta precisión.
            </p>

            {/* Buscador y Filtros dinámicos */}
            <div className="mt-8 space-y-4">
              <div className="relative max-w-md mx-auto lg:mx-0">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por título o tema..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-deep-900/80 pl-10 pr-4 py-2.5 text-sm text-white placeholder-ink-gray-400 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-400 transition-all"
                />
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
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
            <p className="text-xs uppercase tracking-wider text-ink-gray-400 font-semibold">
              {loading
                ? 'Cargando cursos desde Tutor LMS...'
                : `${filteredCourses.length} curso${filteredCourses.length !== 1 ? 's' : ''} disponible${filteredCourses.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          {loading ? (
            /* Skeleton Loading */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="animate-pulse flex flex-col sm:flex-row rounded-2xl border border-white/10 bg-deep-900/40 p-5 gap-5"
                >
                  <div className="h-44 sm:h-auto sm:w-44 shrink-0 rounded-xl bg-white/5" />
                  <div className="flex-1 space-y-3 py-2">
                    <div className="h-4 bg-white/10 rounded w-1/3" />
                    <div className="h-6 bg-white/10 rounded w-3/4" />
                    <div className="h-12 bg-white/5 rounded w-full" />
                    <div className="h-8 bg-white/10 rounded w-1/2 mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-deep-900/40 p-12 text-center max-w-xl mx-auto backdrop-blur-xl"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-400 mb-4 border border-primary-500/20">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                No se encontraron cursos
              </h3>
              <p className="mt-2 text-sm text-ink-gray-400">
                {searchQuery || activeCategory !== 'Todos'
                  ? 'No hay cursos que coincidan con los filtros seleccionados. Intenta otra categoría o término de búsqueda.'
                  : 'Aún no hay cursos publicados en la plataforma. ¡Pronto estarán disponibles nuevos programas!'}
              </p>
              {(searchQuery || activeCategory !== 'Todos') && (
                <button
                  onClick={() => {
                    setActiveCategory('Todos');
                    setSearchQuery('');
                  }}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-2.5 text-xs font-bold text-black hover:bg-primary-400 transition-all"
                >
                  Restablecer filtros
                </button>
              )}
            </motion.div>
          ) : (
            /* Lista de Cursos Reales de Tutor LMS */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredCourses.map((course, index) => {
                  const courseUrl = course.permalink || `/courses/${course.slug || course.id}`;

                  return (
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
                          loading="lazy"
                        />
                        <span className="absolute top-2 left-2 rounded-md bg-deep-950/85 px-2.5 py-0.5 text-[11px] font-semibold text-primary-300 border border-white/10 backdrop-blur-sm">
                          {course.category}
                        </span>
                      </div>

                      {/* Contenido */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-gray-400 mb-2">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-primary-400" />
                              {course.duration}
                            </span>
                            <span>•</span>
                            <span className="rounded bg-white/5 px-2 py-0.5 text-primary-300 font-medium">
                              {course.level}
                            </span>
                            {course.lesson_count ? (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1 text-ink-gray-400">
                                  <Layers className="h-3 w-3 text-primary-400" />
                                  {course.lesson_count} lecciones
                                </span>
                              </>
                            ) : null}
                          </div>

                          <h3 className="font-display text-lg font-bold text-white group-hover:text-primary-300 transition-colors leading-snug">
                            <a href={courseUrl} className="hover:underline">
                              {course.title}
                            </a>
                          </h3>

                          <p className="mt-2 text-xs text-ink-gray-400 leading-relaxed line-clamp-2">
                            {course.description}
                          </p>
                        </div>

                        {/* Footer de la tarjeta */}
                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase text-ink-gray-500 block font-semibold">
                              Precio
                            </span>
                            <span className="font-display text-lg font-extrabold text-white">
                              {course.price}
                            </span>
                          </div>

                          <a
                            href={courseUrl}
                            className="inline-flex items-center gap-2 rounded-xl bg-primary-500 hover:bg-primary-400 text-black font-bold text-xs px-4 py-2.5 shadow-[0_0_12px_rgba(84,180,53,0.3)] transition-all group/btn"
                          >
                            <span>Ver Curso</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
                          </a>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
