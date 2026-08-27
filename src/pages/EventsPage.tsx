import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin } from 'lucide-react';
import { EventCard } from '@/components/ui/EventCard';
import { fetchEvents } from '@/data/events';
import type { CourseEvent } from '@/types';

const monthNames = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export function EventsPage() {
  const [events, setEvents] = useState<CourseEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  // Group by month
  const grouped = events.reduce<Record<string, CourseEvent[]>>((acc, ev) => {
    const d = new Date(ev.date + 'T00:00:00');
    const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(ev);
    return acc;
  }, {});

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
              <CalendarDays className="h-4 w-4" />
              Eventos Presenciales
            </div>
            <h1 className="font-display text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              Próximos{' '}
              <span className="text-gradient">eventos</span> en Nueva Esparta
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-400">
              Únete a nuestros talleres y bootcamps presenciales. Cupos limitados.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-ink-900/80 px-5 py-3 text-sm text-ink-300">
              <MapPin className="h-4 w-4 text-primary-500" />
              CC La Redoma de los Robles, Local 50 — Porlamar, Nueva Esparta
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="relative py-12">
        <div className="section-padding">
          {loading ? (
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-40 animate-pulse rounded-2xl border border-white/5 bg-ink-900/50"
                />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-4xl">
              {Object.entries(grouped).map(([month, monthEvents], mi) => (
                <div key={month} className="mb-12">
                  {/* Month header */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="mb-6 flex items-center gap-4"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary-500/20 bg-primary-500/10">
                      <CalendarDays className="h-7 w-7 text-primary-400" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-white">
                        {month}
                      </h2>
                      <p className="text-sm text-ink-500">
                        {monthEvents.length} evento
                        {monthEvents.length !== 1 && 's'}
                      </p>
                    </div>
                    <div className="ml-2 h-px flex-1 bg-gradient-to-r from-primary-500/30 to-transparent" />
                  </motion.div>

                  {/* Events */}
                  <div className="space-y-6 pl-4 md:pl-18">
                    {/* Vertical line */}
                    <div className="absolute left-8 top-0 h-full w-px bg-gradient-to-b from-primary-500/30 via-primary-500/10 to-transparent md:left-24" />
                    {monthEvents.map((event, i) => (
                      <div key={event.id} className="relative">
                        {/* Dot */}
                        <div className="absolute -left-[26px] top-8 h-3 w-3 rounded-full border-2 border-primary-500 bg-ink-950 md:-left-[42px]">
                          <div className="absolute inset-0 rounded-full bg-primary-500/50 blur-sm" />
                        </div>
                        <EventCard event={event} index={mi * 10 + i} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
