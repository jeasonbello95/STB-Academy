import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MapPin,
  CalendarDays,
  Clock,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Share2,
  Check,
  Building2,
  DollarSign,
  GraduationCap
} from 'lucide-react';
import type { CourseEvent } from '@/types';

interface EventDetailModalProps {
  event: CourseEvent | null;
  onClose: () => void;
}

export function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [reserved, setReserved] = useState(false);

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (event) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [event, onClose]);

  if (!event) return null;

  const dateObj = new Date(`${event.date}T00:00:00`);
  const formattedDate = isNaN(dateObj.getTime())
    ? event.date
    : dateObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

  const isFree = event.is_free || event.price === 'Gratis' || !event.price || event.price === '$0,00' || event.price === '$0';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
    `¡Hola STB Academy! Deseo solicitar información y reservar mi cupo para el curso presencial: "${event.title}" programado para el día ${formattedDate} en la sede ${event.location}.`
  )}`;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Curso Presencial STB Academy: ${event.title}\nSede: ${event.location}\nDías: ${event.days || 'A convenir'}\nHorario: ${event.schedule || 'A convenir'}\nInversión: ${event.price || 'Gratis'}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReserve = () => {
    setReserved(true);
    // Abrir WhatsApp en nueva pestaña para reservar
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop con desenfoque */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        />

        {/* Ventana Modal React */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }}
          className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-[#070c14] shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(84,180,53,0.18)] overflow-hidden flex flex-col max-h-[92vh] z-10"
        >
          {/* Barra superior de acento degradado */}
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-[#54B435] to-cyan-400 shrink-0" />

          {/* Botón flotante de cierre */}
          <button
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 border border-white/20 text-slate-300 hover:text-white hover:bg-black/80 hover:border-white/40 transition-all backdrop-blur-sm"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Contenido scrolleable */}
          <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
            
            {/* Cabecera / Portada */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-deep-950 aspect-[16/8] sm:aspect-[21/9]">
              <img
                src={event.image || 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80'}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070c14] via-[#070c14]/40 to-transparent" />
              
              {/* Badges superiores */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-950/80 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Modalidad Presencial
                </span>
                {event.category && (
                  <span className="rounded-full border border-white/15 bg-black/70 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-md">
                    {event.category}
                  </span>
                )}
              </div>

              {/* Inversión flotante en la portada */}
              <div className="absolute bottom-3 right-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-display font-extrabold text-sm backdrop-blur-md border shadow-lg ${
                    isFree
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-primary-500/20 text-primary-300 border-primary-500/40'
                  }`}
                >
                  <DollarSign className="h-4 w-4 shrink-0" />
                  <span>{isFree ? 'Acceso Libre / Gratuito' : `Inversión: ${event.price}`}</span>
                </span>
              </div>
            </div>

            {/* Título y subtítulo */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#54B435] uppercase tracking-wider mb-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Convocatoria Presencial Oficial</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {event.title}
              </h2>
              {event.description && (
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {event.description}
                </p>
              )}
            </div>

            {/* Tarjeta de Información Presencial (Ubicación, Días, Horario) */}
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900/60 to-cyan-950/20 p-4 sm:p-5 relative overflow-hidden shadow-inner">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                <Building2 className="h-5 w-5 text-emerald-400" />
                <h3 className="font-display text-base sm:text-lg font-bold text-white">
                  Coordenadas y Horario de la Clase
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                
                {/* 1. Ubicación / Sede */}
                <div className="rounded-xl p-3.5 bg-black/40 border border-white/10 flex flex-col justify-between sm:col-span-2">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 mb-1">
                      <MapPin className="h-4 w-4 shrink-0 text-emerald-400" />
                      <span>¿Dónde se realizará el curso? (Sede Física)</span>
                    </div>
                    <p className="text-sm font-semibold text-white leading-snug">
                      {event.location || 'CC La Redoma de los Robles, Local 50 — Porlamar, Isla de Margarita'}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Instalaciones STB Academy</span>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                      <span>Abrir en Google Maps</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* 2. Días y Fecha */}
                <div className="rounded-xl p-3.5 bg-black/40 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 mb-1">
                      <CalendarDays className="h-4 w-4 shrink-0 text-cyan-400" />
                      <span>Días en los que se hará</span>
                    </div>
                    <p className="text-sm font-semibold text-white leading-snug">
                      {event.days || 'Jornadas intensivas presenciales'}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[11px] font-mono text-slate-400">
                    <span>Fecha programada: <strong className="text-slate-200 capitalize">{formattedDate}</strong></span>
                  </div>
                </div>

                {/* 3. Horario Específico */}
                <div className="rounded-xl p-3.5 bg-black/40 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#54B435] mb-1">
                      <Clock className="h-4 w-4 shrink-0 text-[#54B435]" />
                      <span>Horario Específico</span>
                    </div>
                    <p className="text-sm font-bold text-white font-mono leading-snug">
                      {event.schedule || '08:30 AM – 12:30 PM'}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-white/5 text-[11px] font-mono text-[#54B435]">
                    <span>Modalidad 100% en vivo en aula</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Inversión / Costo Detallado */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Inversión del Curso Presencial
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-extrabold text-white">
                    {event.price || 'Gratis'}
                  </span>
                  {isFree ? (
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Beca para la comunidad
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      Pago único presencial
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  {isFree
                    ? 'Entrada libre para miembros de STB Academy con previa reserva de cupo.'
                    : 'Incluye estación de trabajo, material didáctico físico y certificación oficial.'}
                </p>
              </div>

              <div className="flex items-center gap-2 self-stretch sm:self-auto">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#54B435]" />
                      <span className="text-[#54B435]">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3.5 w-3.5" />
                      <span>Compartir</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Qué incluye la experiencia en sede */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5 space-y-3">
              <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[#54B435]" />
                <span>Beneficios y Servicios Incluidos en Sede</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#54B435] shrink-0 mt-0.5" />
                  <span>Instructor certificado presencial en tiempo real.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#54B435] shrink-0 mt-0.5" />
                  <span>Estación de análisis y prácticas guiadas en directo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#54B435] shrink-0 mt-0.5" />
                  <span>Certificado oficial de aprobación STB Academy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#54B435] shrink-0 mt-0.5" />
                  <span>Networking y resolución de dudas cara a cara.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Footer de la ventana Modal con acciones */}
          <div className="p-4 sm:p-5 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <span className="text-xs text-slate-400 text-center sm:text-left">
              ⚡ Cupos reducidos por aforo en sede presencial.
            </span>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-all"
              >
                Cerrar
              </button>

              <button
                type="button"
                onClick={handleReserve}
                className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-400 text-black font-extrabold text-xs shadow-[0_0_15px_rgba(84,180,53,0.35)] transition-all cursor-pointer"
              >
                <span>{reserved ? '✓ Cupo Solicitado' : 'Reservar Asistencia'}</span>
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
