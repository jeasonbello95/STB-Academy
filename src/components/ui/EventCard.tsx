import { CalendarDays, MapPin, ArrowRight, Sparkles, Clock, Zap } from 'lucide-react';
import type { CourseEvent } from '@/types';

interface EventCardProps {
  event: CourseEvent;
  index: number;
  onSelect?: (event: CourseEvent, tab?: 'details' | 'register') => void;
}

export function EventCard({ event, onSelect }: EventCardProps) {
  const dateObj = new Date(`${event.date}T00:00:00`);
  const formattedDate = isNaN(dateObj.getTime())
    ? event.date
    : dateObj.toLocaleDateString('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSelect) {
      onSelect(event, 'details');
    }
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onSelect) {
      onSelect(event, 'register');
    }
  };

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onSelect) {
      onSelect(event, 'details');
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className="group relative flex flex-col sm:flex-row items-stretch rounded-2xl border border-white/10 bg-deep-900/70 p-5 backdrop-blur-xl transition-all duration-300 hover:border-primary-500/50 hover:shadow-[0_8px_30px_rgba(84,180,53,0.15)] gap-5 overflow-hidden cursor-pointer"
    >
      {/* Imagen del curso presencial */}
      {event.image && (
        <div className="relative h-44 sm:h-auto sm:w-44 shrink-0 rounded-xl overflow-hidden bg-deep-950 border border-white/10">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <span className="absolute top-2 left-2 rounded-md bg-deep-950/85 px-2.5 py-0.5 text-[11px] font-semibold text-primary-300 border border-white/10 backdrop-blur-sm flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-primary-400" />
            Presencial
          </span>
        </div>
      )}

      {/* Información del evento */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          {/* Header con Fecha, Días y Horario */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <div className="flex flex-wrap items-center gap-2">
              <time
                dateTime={event.date}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-300 capitalize"
              >
                <CalendarDays className="h-3.5 w-3.5 text-primary-400" />
                {formattedDate}
              </time>
              {event.days && (
                <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-medium text-ink-300 border border-white/5">
                  {event.days}
                </span>
              )}
            </div>
            {(event.schedule || (event.duration && event.duration !== 'Presencial')) && (
              <span className="inline-flex items-center gap-1 text-[11px] text-ink-300 bg-white/5 px-2 py-0.5 rounded-md border border-white/5 font-mono">
                <Clock className="h-3 w-3 text-primary-400" />
                {event.schedule || event.duration}
              </span>
            )}
          </div>

          {/* Título */}
          <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-primary-300 transition-colors leading-snug">
            <span>{event.title}</span>
          </h3>

          {/* Descripción */}
          {event.description && (
            <p className="mt-2 text-xs sm:text-sm text-ink-400 leading-relaxed line-clamp-2">
              {event.description}
            </p>
          )}

          {/* Ubicación */}
          <p className="mt-3 flex items-center gap-1.5 text-xs text-ink-500">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary-500" />
            <span className="truncate">{event.location}</span>
          </p>
        </div>

        {/* Footer con precio y botones de acción */}
        <div className="mt-4 pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] uppercase text-ink-500 block font-semibold">
              Inversión Presencial
            </span>
            <span className="font-display text-base sm:text-lg font-extrabold text-white">
              {event.price || 'Gratis'}
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={handleDetailsClick}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs px-3 py-2 transition-all"
            >
              <span>Detalles</span>
            </button>

            <button
              type="button"
              onClick={handleRegisterClick}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#54B435] hover:bg-[#46992c] text-black font-extrabold text-xs px-4 py-2 shadow-[0_0_15px_rgba(84,180,53,0.35)] transition-all group/btn"
            >
              <Zap className="h-3.5 w-3.5 fill-black" />
              <span>Inscripción Inmediata</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
