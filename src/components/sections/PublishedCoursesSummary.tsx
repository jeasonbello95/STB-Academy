import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  ArrowRight,
  Sparkles,
  GraduationCap,
  ArrowUpRight,
} from 'lucide-react';
import { fetchCourses, type DynamicCourse } from '@/data/courses';
import { Link } from 'react-router-dom';

function decodeHtml(str?: string) {
  if (!str) return '';
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

export function PublishedCoursesSummary() {
  const [courses, setCourses] = useState<DynamicCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchCourses()
      .then((data) => {
        if (isMounted) {
          setCourses(data.slice(0, 3));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Error loading published courses summary:', err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!loading && courses.length === 0) {
    return null;
  }

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Luces ambientales neón de fondo */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-primary-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabecera de la sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-3.5 py-1.5 text-xs font-semibold text-primary-300 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-primary-400 animate-pulse" />
              <span>Cursos Destacados Tutor LMS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Aprende con nuestros{' '}
              <span className="text-gradient drop-shadow-[0_0_15px_rgba(84,180,53,0.35)]">
                cursos publicados
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
              Programas profesionales con estrategias probadas, análisis institucional y mentoría para acelerar tus resultados.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/cursos"
              className="inline-flex items-center gap-2 rounded-full border border-primary-500/40 bg-primary-500/10 px-6 py-3 text-sm font-bold text-primary-300 hover:bg-primary-500/20 hover:border-primary-400 hover:text-white transition-all shadow-[0_0_15px_rgba(84,180,53,0.15)] group"
            >
              <span>Ver todos los cursos</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Grid de Cursos */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 rounded-3xl border border-white/10 bg-deep-900/40 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const courseUrl = course.permalink || `/courses/${course.slug || course.id}`;

              return (
                <motion.article
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative flex flex-col rounded-3xl border border-white/10 bg-deep-900/60 backdrop-blur-xl overflow-hidden hover:border-primary-500/50 hover:shadow-[0_12px_40px_rgba(84,180,53,0.2)] transition-all duration-500"
                >
                  {/* Portada */}
                  <div className="relative h-52 w-full overflow-hidden bg-deep-950">
                    <img
                      src={course.image}
                      alt={decodeHtml(course.title)}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-950 via-deep-950/30 to-transparent" />

                    {/* Categoría Badge */}
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-[#54B435]/30 bg-deep-950/80 px-3 py-1 text-xs font-semibold text-primary-300 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                      <span>{decodeHtml(course.category)}</span>
                    </div>

                    {/* Precio Badge */}
                    <div className="absolute bottom-3 right-3 rounded-full bg-primary-500 px-3.5 py-1 text-xs font-black text-black shadow-[0_0_15px_rgba(84,180,53,0.5)]">
                      {course.price || 'Gratis'}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-1 flex-col p-6">
                    {/* Metadatos (Duración, Nivel) */}
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-primary-400" />
                        {course.duration}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-3.5 w-3.5 text-cyan-400" />
                        {course.level}
                      </span>
                    </div>

                    {/* Título */}
                    <h3 className="font-display text-xl font-bold text-white leading-snug group-hover:text-primary-300 transition-colors line-clamp-2 mb-3">
                      <a href={courseUrl}>{decodeHtml(course.title)}</a>
                    </h3>

                    {/* Descripción */}
                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed flex-1 mb-6">
                      {decodeHtml(course.description)}
                    </p>

                    {/* CTA Button */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">
                        Acceso de por vida
                      </span>

                      <a
                        href={courseUrl}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-400 hover:text-white transition-colors group/link"
                      >
                        <span>Ver curso</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
