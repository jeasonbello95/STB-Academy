import { motion } from 'framer-motion';
import {
  Clock,
  BookOpen,
  Star,
  Layers,
  ArrowRight,
} from 'lucide-react';
import type { Course } from '@/data/content';
import { Button } from '@/components/ui/Button';

interface CourseCardProps {
  course: Course;
  index?: number;
  onOpenSyllabus?: (course: Course) => void;
}

export default function CourseCard({
  course,
  index = 0,
  onOpenSyllabus,
}: CourseCardProps) {
  const Icon = course.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
      className="group relative flex flex-col rounded-3xl border border-white/10 bg-deep-900/50 backdrop-blur-xl overflow-hidden hover:border-primary-500/50 hover:shadow-[0_10px_35px_rgba(84,180,53,0.18)] transition-all duration-500"
    >
      {/* Glow de esquina animado */}
      <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-primary-500/10 blur-3xl group-hover:bg-primary-500/20 transition-all duration-500 pointer-events-none" />

      {/* Cabecera / Portada con Imagen y Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-deep-950">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-950 via-deep-950/40 to-transparent" />

        {/* Tag superior izquierdo */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full border border-white/20 bg-deep-950/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-primary-400 animate-pulse" />
          <span>{course.tag}</span>
        </div>

        {/* Icono de Categoría superior derecho */}
        <div className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-deep-900/80 text-primary-400 backdrop-blur-md group-hover:scale-110 group-hover:border-primary-500/50 transition-all duration-300">
          <Icon className="h-4 w-4" />
        </div>

        {/* Metadatos flotantes sobre la imagen */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
          <span className="rounded-lg bg-deep-900/90 px-2.5 py-1 border border-white/10 font-medium">
            {course.category}
          </span>
          <div className="flex items-center gap-1 rounded-lg bg-deep-900/90 px-2.5 py-1 border border-white/10 font-semibold text-yellow-400">
            <Star className="h-3.5 w-3.5 fill-yellow-400" />
            <span>{course.rating ?? 4.9}</span>
          </div>
        </div>
      </div>

      {/* Cuerpo de la tarjeta */}
      <div className="flex flex-1 flex-col p-6">
        {/* Chips de duración, lecciones y nivel */}
        <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-ink-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-primary-400" />
            {course.duration}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
            {course.lessonsCount ?? 20} clases
          </span>
          <span>•</span>
          <span className="rounded-md bg-white/5 px-2 py-0.5 text-primary-300 font-medium border border-white/5">
            {course.level}
          </span>
        </div>

        {/* Título */}
        <h3 className="font-display text-lg font-bold text-white leading-snug group-hover:text-primary-300 transition-colors line-clamp-2 mb-2">
          {course.title}
        </h3>

        {/* Descripción */}
        <p className="text-xs sm:text-sm text-ink-gray-400 line-clamp-2 leading-relaxed flex-1 mb-4">
          {course.description}
        </p>

        {/* Habilidades clave / Tech tags estilo Platzi */}
        {course.skills && course.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {course.skills.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-ink-gray-300"
              >
                {skill}
              </span>
            ))}
            {course.skills.length > 3 && (
              <span className="rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[11px] text-ink-gray-400">
                +{course.skills.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Instructor */}
        {course.instructor && (
          <div className="flex items-center gap-2.5 pt-3 border-t border-white/[0.06] mb-4">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              className="h-7 w-7 rounded-full object-cover border border-primary-500/40"
            />
            <div className="text-xs truncate">
              <p className="font-medium text-white truncate">{course.instructor.name}</p>
              <p className="text-[11px] text-ink-gray-500 truncate">{course.instructor.role}</p>
            </div>
          </div>
        )}

        {/* Footer: Precio + Botones de Acción */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] mt-auto">
          <div>
            <span className="block text-[10px] uppercase font-semibold text-ink-gray-500">
              Inversión
            </span>
            <span className="font-display text-xl font-extrabold text-white">
              {course.price}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenSyllabus && (
              <button
                type="button"
                onClick={() => onOpenSyllabus(course)}
                className="flex items-center gap-1 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-white hover:border-primary-500/50 hover:bg-primary-500/10 hover:text-primary-300 transition-all"
              >
                <span>Temario</span>
                <Layers className="h-3.5 w-3.5" />
              </button>
            )}

            <Button
              to="/registro"
              size="sm"
              className="rounded-xl bg-primary-500 hover:bg-primary-400 text-black font-bold text-xs px-3.5 py-2 shadow-[0_0_12px_rgba(84,180,53,0.3)] group/btn"
            >
              <span>Entrar</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

