import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Wrench,
  GraduationCap,
  Award,
  Apple,
  Smartphone,
  Download,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CourseCard } from '@/components/ui/CourseCard';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { fetchTopCourses } from '@/data/courses';
import type { Course } from '@/types';

const heroSlides = [
  {
    image:
      'https://images.pexels.com/photos/4709290/pexels-photo-4709290.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    alt: 'Estudiante programando',
  },
  {
    image:
      'https://images.pexels.com/photos/7869084/pexels-photo-7869084.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    alt: 'Robótica educativa',
  },
  {
    image:
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    alt: 'Inteligencia artificial',
  },
  {
    image:
      'https://images.pexels.com/photos/5530437/pexels-photo-5530437.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    alt: 'Estudiantes en clase',
  },
];

const subHeaderItems = [
  { icon: Wrench, label: 'Práctica' },
  { icon: GraduationCap, label: 'Desarrollo' },
  { icon: Award, label: 'Certificación' },
];

const stats = [
  { target: 1, suffix: 'k+', label: 'Estudiantes' },
  { target: 50, suffix: '+', label: 'Cursos Activos' },
  { target: 98, suffix: '%', label: 'Tasa de Éxito' },
  { target: 24, suffix: '/7', label: 'Comunidad' },
];

export function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [topCourses, setTopCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetchTopCourses().then(setTopCourses);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div>
      {/* Hero Carousel */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <img
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].alt}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Hero content */}
        <div className="relative z-10 flex h-full flex-col justify-center section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300">
              <Sparkles className="h-4 w-4" />
              La academia del futuro
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Transforma tu{' '}
              <span className="text-gradient">potencial técnico</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-300 md:text-xl">
              Aprende programación, robótica e inteligencia artificial con
              proyectos reales. Únete a la comunidad de creadores tecnológicos
              más innovadora.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button to="/cursos" size="lg" variant="primary">
                Explorar Cursos
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button to="/registro" size="lg" variant="outline">
                Registrarme Gratis
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? 'w-8 bg-primary-400'
                  : 'w-2 bg-ink-600 hover:bg-ink-500'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Sub-header */}
      <section className="border-b border-white/5 bg-ink-900/50 py-8">
        <div className="section-padding">
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
            {subHeaderItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary-500/20 bg-primary-500/10">
                  <item.icon className="h-6 w-6 text-primary-400" />
                </div>
                <span className="font-display text-lg font-bold text-white">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Academia */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
        <div className="section-padding relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16 text-center"
          >
            <h2 className="mx-auto max-w-4xl font-display text-3xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">
              Aprende haciendo. Descubre nuestros cursos más{' '}
              <span className="text-gradient">populares</span> y empieza a
              construir tu futuro en tecnología hoy mismo.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topCourses.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button to="/cursos" size="lg" variant="secondary">
              Ver catálogo completo
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* App Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-500/10 blur-3xl" />
        <div className="section-padding relative">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-primary-500/20 bg-primary-500/10"
            >
              <Smartphone className="h-10 w-10 text-primary-400" />
            </motion.div>
            <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
              Lleva la academia{' '}
              <span className="text-gradient">contigo</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-400">
              Instala nuestra App Oficial. Aprende desde cualquier lugar, en
              cualquier momento.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-900/80 px-8 py-4 transition-all duration-300 hover:border-primary-500/30 hover:bg-ink-800"
              >
                <Apple className="h-8 w-8 text-white" />
                <div className="text-left">
                  <p className="text-xs text-ink-500">Descargar en</p>
                  <p className="text-lg font-bold text-white">iOS PWA</p>
                </div>
              </a>
              <a
                href="#"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-900/80 px-8 py-4 transition-all duration-300 hover:border-primary-500/30 hover:bg-ink-800"
              >
                <Download className="h-8 w-8 text-white" />
                <div className="text-left">
                  <p className="text-xs text-ink-500">Descargar para</p>
                  <p className="text-lg font-bold text-white">Android APK</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-950/10 to-transparent" />
        <div className="section-padding relative">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-5xl font-extrabold text-gradient md:text-6xl">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </div>
                <p className="mt-2 text-sm font-medium uppercase tracking-wider text-ink-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
