import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { EventCard } from '@/components/ui/EventCard';
import { EventDetailModal } from '@/components/EventDetailModal';
import { Mascot } from '@/components/Mascot';
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

const weekdayShort = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

const pad = (n: number) => n.toString().padStart(2, '0');

export function EventsPage() {
  const [events, setEvents] = useState<CourseEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState(() => new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CourseEvent | null>(null);
  const [modalTab, setModalTab] = useState<'details' | 'register'>('details');

  const handleSelectEvent = (event: CourseEvent, tab: 'details' | 'register' = 'details') => {
    setSelectedEvent(event);
    setModalTab(tab);
  };

  useEffect(() => {
    fetchEvents().then((data) => {
      setEvents(data);
      if (data.length > 0) {
        const sorted = [...data].sort((a, b) =>
          a.date.localeCompare(b.date)
        );
        setView(new Date(`${sorted[0].date}T00:00:00`));
      }
      setLoading(false);
    });
  }, []);

  // Eventos agrupados por "YYYY-MM"
  const byMonth = useMemo(() => {
    const map: Record<string, CourseEvent[]> = {};
    events.forEach((ev) => {
      const key = ev.date.slice(0, 7);
      if (!map[key]) map[key] = [];
      map[key].push(ev);
    });
    Object.values(map).forEach((list) =>
      list.sort((a, b) => a.date.localeCompare(b.date))
    );
    return map;
  }, [events]);

  const year = view.getFullYear();
  const month = view.getMonth();
  const monthKey = `${year}-${pad(month + 1)}`;
  const monthEvents = useMemo(
    () => byMonth[monthKey] || [],
    [byMonth, monthKey]
  );

  // Días del mes que tienen eventos
  const daysWithEvents = useMemo(() => {
    const map: Record<number, CourseEvent[]> = {};
    monthEvents.forEach((ev) => {
      const day = parseInt(ev.date.slice(8, 10), 10);
      if (!map[day]) map[day] = [];
      map[day].push(ev);
    });
    return map;
  }, [monthEvents]);

  // Eventos filtrados para la vista (por día seleccionado o todo el mes)
  const displayedEvents = useMemo(() => {
    if (selectedDay !== null) {
      return daysWithEvents[selectedDay] || [];
    }
    return monthEvents;
  }, [selectedDay, daysWithEvents, monthEvents]);

  const firstDayOffset = (new Date(year, month, 1).getDay() + 6) % 7; // lunes = 0
  const totalDays = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(
    today.getDate()
  )}`;

  const cells: (number | null)[] = [
    ...Array.from({ length: firstDayOffset }, () => null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];

  const goPrev = () => {
    setView(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };
  const goNext = () => {
    setView(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  return (
    <div className="min-h-screen pt-32">
      {/* ================= HEADER ================= */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="section-padding relative z-10 flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-16">
          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl text-center lg:text-left"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300">
              <CalendarDays className="h-4 w-4" />
              Eventos Presenciales
            </div>
            <h1 className="font-display text-4xl font-extrabold text-white md:text-5xl lg:text-6xl">
              Próximos{' '}
              <span className="text-gradient">cursos presenciales</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-400 lg:mx-0">
              Únete a nuestros talleres y bootcamps presenciales. Cupos
              limitados.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-deep-900/70 px-5 py-3 text-sm text-ink-300 backdrop-blur">
              <MapPin className="h-4 w-4 text-primary-500" />
              CC La Redoma de los Robles, Local 50 — Porlamar, Nueva Esparta
            </div>
          </motion.div>

          {/* Imagen al lado del texto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
            className="flex-shrink-0"
          >
            <Mascot
              src="/imagenes/proximo-evento.png"
              alt=""
              float
              floatDuration={6}
              glow
              className="h-64 w-auto object-contain sm:h-80 md:h-96 lg:h-[420px]"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= CALENDARIO + EVENTOS ================= */}
      <section className="relative py-12">
        <div className="section-padding">
          {loading ? (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[minmax(0,400px)_1fr]">
              <div className="h-80 animate-pulse rounded-3xl border border-white/5 bg-deep-900/50" />
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div
                    key={i}
                    className="h-40 animate-pulse rounded-2xl border border-white/5 bg-deep-900/50"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-12">
              {/* Calendario */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-fit rounded-3xl border border-white/10 bg-deep-900/50 p-6 shadow-2xl backdrop-blur-xl"
              >
                {/* Navegación del mes */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={goPrev}
                    aria-label="Mes anterior"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-ink-300 transition-all hover:border-primary-500/40 hover:text-primary-300"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={monthKey}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="font-display text-lg font-bold text-white"
                    >
                      {monthNames[month]} {year}
                    </motion.h3>
                  </AnimatePresence>
                  <button
                    onClick={goNext}
                    aria-label="Mes siguiente"
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-ink-300 transition-all hover:border-primary-500/40 hover:text-primary-300"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Días de la semana */}
                <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-ink-500">
                  {weekdayShort.map((d) => (
                    <span key={d} className="py-1">
                      {d}
                    </span>
                  ))}
                </div>

                {/* Días */}
                <motion.div
                  key={monthKey}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="mt-2 grid grid-cols-7 gap-1"
                >
                  {cells.map((day, i) => {
                    if (day === null) {
                      return <span key={`b-${i}`} />;
                    }
                    const dayKey = `${monthKey}-${pad(day)}`;
                    const hasEvents = !!daysWithEvents[day];
                    const isToday = dayKey === todayKey;
                    const isSelected = selectedDay === day;

                    return (
                      <motion.button
                        key={dayKey}
                        type="button"
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDay((prev) => (prev === day ? null : day))}
                        aria-label={`Día ${day}${hasEvents ? ' con cursos presenciales' : ''}`}
                        className={`relative flex h-9 cursor-pointer items-center justify-center rounded-xl text-sm transition-all select-none ${
                          isSelected
                            ? 'bg-primary-500 text-black font-extrabold shadow-[0_0_15px_rgba(84,180,53,0.5)] ring-2 ring-primary-300'
                            : hasEvents
                            ? 'bg-primary-500/20 font-semibold text-primary-300 hover:bg-primary-500/30'
                            : 'text-ink-300 hover:bg-white/5'
                        } ${isToday && !isSelected ? 'ring-2 ring-primary-400' : ''}`}
                      >
                        {day}
                        {hasEvents && !isSelected && (
                          <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-primary-400 shadow-[0_0_6px_rgba(84,180,53,0.9)]" />
                        )}
                        {hasEvents && isSelected && (
                          <span className="absolute bottom-1.5 h-1 w-1 rounded-full bg-black shadow-sm" />
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>

                {/* Leyenda */}
                <div className="mt-5 flex items-center gap-5 text-xs text-ink-500">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-primary-400" />
                    Con eventos
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full border-2 border-primary-400" />
                    Hoy
                  </span>
                </div>
              </motion.div>

              {/* Eventos del mes o día seleccionado */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary-500/20 bg-primary-500/10">
                      <CalendarDays className="h-6 w-6 text-primary-400" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-white">
                        {selectedDay !== null
                          ? `${selectedDay} de ${monthNames[month]} ${year}`
                          : `${monthNames[month]} ${year}`}
                      </h2>
                      <p className="text-sm text-ink-500">
                        {displayedEvents.length} curso{displayedEvents.length !== 1 ? 's' : ''} presencial{displayedEvents.length !== 1 ? 'es' : ''}
                        {selectedDay !== null ? ' programado para este día' : ''}
                      </p>
                    </div>
                  </div>

                  {selectedDay !== null && (
                    <button
                      onClick={() => setSelectedDay(null)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-primary-500/30 bg-primary-500/10 px-3.5 py-2 text-xs font-semibold text-primary-300 hover:bg-primary-500/20 hover:border-primary-400 transition-all shadow-sm"
                    >
                      <span>Ver todo el mes ({monthEvents.length})</span>
                    </button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {displayedEvents.length > 0 ? (
                    <motion.div
                      key={selectedDay !== null ? `${monthKey}-${selectedDay}` : monthKey}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {displayedEvents.map((ev, index) => (
                        <EventCard
                          key={ev.id || index}
                          event={ev}
                          index={index}
                          onSelect={(event, tab) => handleSelectEvent(event, tab)}
                        />
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`empty-${monthKey}-${selectedDay}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-deep-900/40 p-10 text-center"
                    >
                      <CalendarDays className="h-10 w-10 text-ink-600" />
                      <p className="mt-3 font-display text-lg font-semibold text-white">
                        {selectedDay !== null
                          ? `Sin cursos presenciales el ${selectedDay} de ${monthNames[month]}`
                          : 'Sin cursos presenciales este mes'}
                      </p>
                      <p className="mt-1 text-sm text-ink-500 max-w-sm">
                        {selectedDay !== null
                          ? 'Selecciona otro día marcado en el calendario o mira todos los cursos del mes.'
                          : 'Explora otros meses en el calendario o descubre todos los programas de STB Academy.'}
                      </p>
                      {selectedDay !== null ? (
                        <button
                          onClick={() => setSelectedDay(null)}
                          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2 text-xs font-bold text-black hover:bg-primary-400 transition-all"
                        >
                          Ver todos los cursos del mes
                        </button>
                      ) : (
                        <a
                          href="/cursos"
                          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2 text-xs font-bold text-black hover:bg-primary-400 transition-all"
                        >
                          Explorar catálogo de cursos
                        </a>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Modal React de Información Detallada del Curso Presencial */}
      <EventDetailModal
        event={selectedEvent}
        initialTab={modalTab}
        onClose={() => setSelectedEvent(null)}
      />
    </div>
  );
}
