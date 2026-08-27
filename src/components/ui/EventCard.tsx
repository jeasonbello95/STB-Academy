import { CalendarDays, MapPin } from 'lucide-react';
import type { CourseEvent } from '@/types';

interface EventCardProps {
  event: CourseEvent;
  index: number;
}

export function EventCard({ event }: EventCardProps) {
  const date = new Date(`${event.date}T00:00:00`);

  return (
    <article className="rounded-2xl border border-white/10 bg-ink-900/80 p-6 transition-colors hover:border-primary-500/40">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-display text-xl font-bold text-white">{event.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-400">{event.description}</p>
        </div>
        <time dateTime={event.date} className="shrink-0 text-sm font-semibold text-primary-300">
          <CalendarDays className="mr-1 inline h-4 w-4" />
          {date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
        </time>
      </div>
      <p className="mt-4 text-sm text-ink-500">
        <MapPin className="mr-1 inline h-4 w-4 text-primary-500" />
        {event.location}
      </p>
    </article>
  );
}
