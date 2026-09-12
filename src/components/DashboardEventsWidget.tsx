import { useState, useEffect } from 'react';
import { CalendarDays, Sparkles, ArrowRight, RefreshCw, GraduationCap } from 'lucide-react';
import { EventCard } from '@/components/ui/EventCard';
import { EventDetailModal } from '@/components/EventDetailModal';
import { fetchEvents } from '@/data/events';
import type { CourseEvent } from '@/types';

export function DashboardEventsWidget() {
  const [events, setEvents] = useState<CourseEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<CourseEvent | null>(null);
  const [modalTab, setModalTab] = useState<'details' | 'register'>('details');
  const [filter, setFilter] = useState<'all' | 'subs' | 'free'>('all');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (err) {
      console.warn('Error fetching events in dashboard widget:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectEvent = (event: CourseEvent, tab: 'details' | 'register' = 'details') => {
    setSelectedEvent(event);
    setModalTab(tab);
  };

  const filteredEvents = events.filter((ev) => {
    if (filter === 'subs') return ev.has_subscription;
    if (filter === 'free') return ev.is_free;
    return true;
  });

  return (
    <section className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#0d1424]/90 via-[#070b14]/95 to-black/90 p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden font-sans text-white my-6">
      {/* Luz ambiental de fondo */}
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#54B435]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Header del Widget */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#54B435]/15 border border-[#54B435]/30 px-3 py-0.5 text-xs font-bold text-[#54B435] font-mono">
              <Sparkles className="h-3.5 w-3.5 text-[#54B435]" />
              Convocatorias Presenciales
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-mono">
              • STB Academy en Vivo
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <CalendarDays className="h-6 w-6 text-[#54B435]" />
            <span>Próximos Talleres y Cursos en Sede</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Asegura tu cupo presencial en nuestra sede física (Porlamar). Puedes reservar con modalidades de cuotas, Cashea o pago directo.
          </p>
        </div>

        {/* Acciones y Enlace a Eventos */}
        <div className="flex items-center gap-3 self-start md:self-center">
          <button
            type="button"
            onClick={loadData}
            title="Recargar eventos"
            className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-[#54B435]' : ''}`} />
          </button>
          <a
            href="/eventos"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-[#54B435] text-xs font-bold text-white transition-all group cursor-pointer"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#54B435] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Barra de Filtros Rápidos */}
      <div className="relative z-10 flex items-center gap-2 pt-4 pb-4 overflow-x-auto">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-white/15 text-white border border-white/20 shadow-sm'
              : 'text-slate-400 hover:text-white bg-transparent'
          }`}
        >
          Todos ({events.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('subs')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            filter === 'subs'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-emerald-300 bg-transparent'
          }`}
        >
          <span>Con Plan de Cuotas</span>
          {events.filter((e) => e.has_subscription).length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-[10px]">
              {events.filter((e) => e.has_subscription).length}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setFilter('free')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            filter === 'free'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-cyan-300 bg-transparent'
          }`}
        >
          Becas / Gratuitos
        </button>
      </div>

      {/* Contenido / Listado de Tarjetas */}
      <div className="relative z-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-64 rounded-2xl border border-white/10 bg-white/5 animate-pulse"
              />
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-black/40 p-8 text-center my-2">
            <GraduationCap className="h-10 w-10 text-slate-500 mx-auto mb-2 opacity-60" />
            <h4 className="text-white font-bold text-base">No hay talleres disponibles en esta categoría</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              Próximamente publicaremos nuevas fechas presenciales para este período.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
            {filteredEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                index={index}
                onSelect={handleSelectEvent}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal Interactivo de Detalle e Inscripción Inmediata */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          initialTab={modalTab}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
}
