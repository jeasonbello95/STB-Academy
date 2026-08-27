import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { courses } from '@/data/content';
import CourseCard from '@/components/CourseCard';

export default function TopAcademia() {
  return (
    <section id="cursos" className="relative py-24 section-padding">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />

      <div className="container-max relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-neon-green mb-3">
              Top Academia
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
              Aprende haciendo.
            </h2>
            <p className="mt-4 text-lg text-ink-gray-400 max-w-2xl">
              Descubre nuestros cursos más populares y empieza a construir tu
              futuro en tecnología hoy mismo.
            </p>
          </motion.div>

          <motion.a
            href="#catalogo"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group inline-flex items-center gap-2 text-sm font-medium text-white px-5 py-3 rounded-lg glass glass-hover whitespace-nowrap self-start lg:self-auto"
          >
            Ver catálogo completo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        {/* Course grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
