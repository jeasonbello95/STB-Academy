import { motion } from 'framer-motion';
import { Clock, BarChart3, ArrowRight } from 'lucide-react';
import type { Course } from '@/data/content';

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  const Icon = course.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative glass glass-hover rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-gray-900 via-ink-gray-900/40 to-transparent" />
        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold text-black bg-neon-green rounded-full">
          {course.tag}
        </span>
        <div className="absolute top-3 right-3 w-10 h-10 rounded-full glass flex items-center justify-center">
          <Icon className="w-5 h-5 text-neon-green" />
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium text-ink-gray-400 px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
            {course.category}
          </span>
          <span className="text-xs text-ink-gray-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.duration}
          </span>
          <span className="text-xs text-ink-gray-400 flex items-center gap-1">
            <BarChart3 className="w-3 h-3" />
            {course.level}
          </span>
        </div>

        <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-neon-green transition-colors">
          {course.title}
        </h3>

        <p className="text-sm text-ink-gray-400 leading-relaxed flex-1">
          {course.description}
        </p>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5">
          <div>
            <span className="text-xs text-ink-gray-500">Precio</span>
            <p className="font-display text-2xl font-bold text-gradient-neon">
              {course.price}
            </p>
          </div>
          <button className="flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-neon-green/40 hover:bg-neon-green/10 transition-all group/btn">
            Ver curso
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
