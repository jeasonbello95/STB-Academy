import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, BookOpen } from 'lucide-react';
import { CourseCard } from '@/components/ui/CourseCard';
import { fetchCourses } from '@/data/courses';
import type { Course, CourseCategory } from '@/types';

const categories: (CourseCategory | 'Todos')[] = [
  'Todos',
  'Programación',
  'Robótica',
  'IA',
  'Diseño',
  'Electrónica',
];

const levels = ['Todos', 'Principiante', 'Intermedio', 'Avanzado'];

export function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CourseCategory | 'Todos'>('Todos');
  const [activeLevel, setActiveLevel] = useState<string>('Todos');

  useEffect(() => {
    fetchCourses().then((data) => {
      setCourses(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.tag.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === 'Todos' || course.category === activeCategory;
      const matchesLevel =
        activeLevel === 'Todos' || course.level === activeLevel;
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [courses, search, activeCategory, activeLevel]);

  return (
    <div className="min-h-screen pt-32">
      {/* Header */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
        <div className="absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="section-padding relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300">
              <BookOpen className="h-4 w-4" />
              Catálogo de Cursos
            </div>
            <h1 className="font-display text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              Explora nuestros{' '}
              <span className="text-gradient">cursos</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-400">
              Aprende a tu ritmo con proyectos reales y certificación oficial.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-30 border-y border-white/5 bg-ink-950/80 backdrop-blur-xl">
        <div className="section-padding py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative flex-1 lg:max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar cursos..."
                className="w-full rounded-xl border border-white/10 bg-ink-900 py-3 pl-12 pr-4 text-sm text-white placeholder-ink-500 focus:border-primary-500/50 focus:outline-none focus:ring-1 focus:ring-primary-500/30"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                      : 'bg-ink-900 text-ink-400 hover:bg-ink-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Level filters */}
          <div className="mt-3 flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-ink-500" />
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setActiveLevel(level)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                  activeLevel === level
                    ? 'bg-primary-500/20 text-primary-300'
                    : 'text-ink-500 hover:text-ink-300'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="section-padding">
          {loading ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-96 animate-pulse rounded-2xl border border-white/5 bg-ink-900/50"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-ink-400">
                No se encontraron cursos con esos criterios.
              </p>
            </div>
          ) : (
            <>
              <p className="mb-8 text-sm text-ink-500">
                {filtered.length} curso{filtered.length !== 1 && 's'} encontrado
                {filtered.length !== 1 && 's'}
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((course, i) => (
                  <CourseCard key={course.id} course={course} index={i} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
