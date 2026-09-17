import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
  GraduationCap,
  User,
  Mail,
  Phone,
  ShieldCheck,
  CreditCard,
  Laptop,
  ArrowLeft,
  Copy,
  Printer,
  MessageCircle,
  AlertCircle,
  Zap,
  Users,
  ShoppingCart,
  UserCheck,
  Key,
} from 'lucide-react';
import type { CourseEvent } from '@/types';
import { useIsAdmin } from '@/hooks/useIsAdmin';

interface EventDetailModalProps {
  event: CourseEvent | null;
  initialTab?: 'details' | 'register';
  onClose: () => void;
}

export function EventDetailModal({
  event,
  initialTab = 'details',
  onClose,
}: EventDetailModalProps) {
  const isAdmin = useIsAdmin();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'register' | 'success'>(initialTab);
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPayment, setCopiedPayment] = useState(false);
  const [copiedCreds, setCopiedCreds] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [registrationCode, setRegistrationCode] = useState('');
  const [wcOrderId, setWcOrderId] = useState<number | null>(null);
  const [checkoutPaymentUrl, setCheckoutPaymentUrl] = useState<string>('');
  const [userCreated, setUserCreated] = useState<boolean>(false);
  const [createdUsername, setCreatedUsername] = useState<string>('');
  const [createdPassword, setCreatedPassword] = useState<string>('');
  const [isEnrolledTutor, setIsEnrolledTutor] = useState<boolean>(false);

  // Campos del formulario de inscripción inmediata
  const [studentName, setStudentName] = useState('');
  const [studentDni, setStudentDni] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [isMinor, setIsMinor] = useState(false);
  const [repName, setRepName] = useState('');
  const [repDni, setRepDni] = useState('');
  const [repPhone, setRepPhone] = useState('');
  const [repRelation, setRepRelation] = useState('Padre/Madre');
  const [paymentMethod, setPaymentMethod] = useState(event?.has_subscription ? 'suscripcion' : 'cashea');
  const [paymentRef, setPaymentRef] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Principiante (Desde cero)');
  const [hasLaptop, setHasLaptop] = useState('si');
  const [notes, setNotes] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(true);

  // Asegurar montaje en cliente para createPortal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Inicializar o resetear cuando cambia el evento o la pestaña inicial
  useEffect(() => {
    if (event) {
      if (initialTab === 'register' && !isAdmin) {
        setActiveTab('details');
      } else {
        setActiveTab(initialTab);
      }
      setErrorMsg('');
      setPaymentMethod(event.has_subscription ? 'suscripcion' : 'cashea');
      setWcOrderId(null);
      setCheckoutPaymentUrl('');
      setUserCreated(false);
      setCreatedUsername('');
      setCreatedPassword('');
      setIsEnrolledTutor(false);
      setCopiedCreds(false);
    }
  }, [event, initialTab, isAdmin]);

  // Cerrar con tecla Escape y bloquear scroll del body
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

  if (!event || !mounted) return null;

  const dateObj = new Date(`${event.date}T00:00:00`);
  const formattedDate = isNaN(dateObj.getTime())
    ? event.date
    : dateObj.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

  const isFree =
    event.is_free ||
    event.price === 'Gratis' ||
    !event.price ||
    event.price === '$0,00' ||
    event.price === '$0';

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    event.location
  )}`;

  // Métodos de pago disponibles (con soporte para suscripciones y cuotas)
  const paymentMethods = [
    ...(event.has_subscription && event.subscription_details
      ? [
          {
            id: 'suscripcion',
            title: 'Suscripción / Cuotas Recurrentes',
            subtitle: event.subscription_details.cuotas_text || event.subscription_details.summary,
            icon: '🔄',
            isSubscription: true,
            details: `Plan de suscripción oficial de este curso: ${
              event.subscription_details.cuotas_text || event.subscription_details.summary
            }${
              event.subscription_details.sign_up_fee
                ? ` con matrícula inicial de ${event.subscription_details.sign_up_fee}`
                : ''
            }. Cada cuota se cancela al inicio de cada ${event.subscription_details.interval}.`,
          },
        ]
      : [
          {
            id: 'suscripcion',
            title: 'Suscripción / Cuotas',
            subtitle: 'Cuotas periódicas programadas',
            icon: '🔄',
            isSubscription: true,
            details:
              'Plan de pago fraccionado en cuotas periódicas acordadas directamente con la coordinación de STB Academy.',
          },
        ]),
    {
      id: 'cashea',
      title: 'Cashea',
      subtitle: 'Paga en cuotas sin interés',
      icon: '🟡',
      details: 'Paga una inicial en sede o escaneando nuestro código QR oficial de Cashea y divide el resto en 3 cuotas cada 14 días sin interés. También puedes solicitar tu enlace de pago directo por WhatsApp.',
    },
    {
      id: 'pago_movil',
      title: 'Pago Móvil',
      subtitle: 'Bolívares (Tasa oficial BCV)',
      icon: '📱',
      details: 'Banco Banesco (0134) | Teléfono: 0412-1421335 | RIF: J-504285123',
    },
    {
      id: 'zelle',
      title: 'Zelle',
      subtitle: 'Dólares USD sin comisiones',
      icon: '💵',
      details: 'Correo Zelle: pagos@stbacademy.net | Titular: STB Academy C.A.',
    },
    {
      id: 'efectivo',
      title: 'Efectivo en Sede',
      subtitle: 'USD o Bolívares en recepción',
      icon: '🏢',
      details: 'Cancela directamente en taquilla el primer día en CC La Redoma de los Robles, Local 50.',
    },
    {
      id: 'transferencia',
      title: 'Transferencia Bancaria',
      subtitle: 'Banesco Banco Universal',
      icon: '🏦',
      details: 'Cta Corriente Banesco: 0134-0348-12-3481056789 | Titular: STB Academy C.A. | RIF: J-504285123',
    },
    {
      id: 'usdt',
      title: 'Binance Pay / USDT',
      subtitle: 'Criptomonedas (BEP20 / TRC20)',
      icon: '🪙',
      details: 'Binance Pay ID: 71298412 | Usuario: STB_Academy_Oficial',
    },
  ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Curso Presencial STB Academy: ${event.title}\nSede: ${event.location}\nDías: ${
          event.days || 'A convenir'
        }\nHorario: ${event.schedule || 'A convenir'}\nInversión: ${event.price || 'Gratis'}`
      );
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleCopyCode = () => {
    if (navigator.clipboard && registrationCode) {
      navigator.clipboard.writeText(registrationCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyPaymentInfo = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedPayment(true);
      setTimeout(() => setCopiedPayment(false), 2000);
    }
  };

  const handleCopyCredentials = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedCreds(true);
      setTimeout(() => setCopiedCreds(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Enlace oficial de WhatsApp con mensaje completo y pre-redactado
  const getWhatsAppConfirmUrl = () => {
    const selectedMethod = paymentMethods.find((m) => m.id === paymentMethod);
    const methodTitle = selectedMethod ? selectedMethod.title : paymentMethod;
    const refLine = paymentRef ? `\n• *Referencia:* ${paymentRef}` : '';
    const subLine =
      paymentMethod === 'suscripcion' && event.has_subscription && event.subscription_details
        ? `\n• *Plan de Cuotas:* ${event.subscription_details.cuotas_text || event.subscription_details.summary}${
            event.subscription_details.total_subscription_price
              ? ` (Total: ${event.subscription_details.total_subscription_price})`
              : ''
          }`
        : '';
    const minorLine = isMinor
      ? `\n• *Representante:* ${repName} (${repRelation}) - Tel: ${repPhone}`
      : '';
    const laptopLine =
      hasLaptop === 'si' ? 'Llevaré mi laptop propia' : 'Requiero equipo de la academia';
    const userLine = userCreated
      ? `\n• *Cuenta de Plataforma:* Usuario creado (${createdUsername || studentEmail}) y enrolado en Tutor LMS.`
      : `\n• *Cuenta de Plataforma:* Usuario existente vinculado y enrolado en Tutor LMS.`;

    const text = `¡Hola STB Academy! 🚀 Acabo de registrar mi *Inscripción Inmediata* para el curso presencial:
• *Curso:* ${event.title}
• *Código de Registro:* ${registrationCode}
• *Cursante:* ${studentName} (C.I: ${studentDni})
• *Teléfono:* ${studentPhone}
• *Correo:* ${studentEmail}${minorLine}
• *Sede:* ${event.location}
• *Días y Horario:* ${event.days || formattedDate} | ${event.schedule || 'En aula'}
• *Método de Pago:* ${methodTitle}${subLine}${refLine}
• *Equipamiento:* ${laptopLine}${userLine}

Por favor confirmen mi cupo. ¡Nos vemos en clase!`;

    return `https://wa.me/584121421335?text=${encodeURIComponent(text)}`;
  };

  // Envío del formulario de inscripción inmediata
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!studentName.trim() || !studentDni.trim() || !studentEmail.trim() || !studentPhone.trim()) {
      setErrorMsg('Por favor completa todos los datos obligatorios del cursante (Nombre, Cédula, Correo y Teléfono).');
      return;
    }

    if (isMinor && (!repName.trim() || !repPhone.trim())) {
      setErrorMsg('Para estudiantes menores de edad es obligatorio ingresar el Nombre y Teléfono del representante legal.');
      return;
    }

    if (!acceptTerms) {
      setErrorMsg('Debes aceptar las normas y condiciones de asistencia a la sede presencial.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      course_id: event.course_id || event.id,
      course_title: event.title,
      student_name: studentName.trim(),
      student_dni: studentDni.trim(),
      student_email: studentEmail.trim(),
      student_phone: studentPhone.trim(),
      is_minor: isMinor,
      representative_name: isMinor ? repName.trim() : '',
      representative_dni: isMinor ? repDni.trim() : '',
      representative_phone: isMinor ? repPhone.trim() : '',
      representative_relation: isMinor ? repRelation : '',
      payment_method: paymentMethod,
      payment_reference: paymentRef.trim(),
      experience_level: experienceLevel,
      has_laptop: hasLaptop,
      notes: notes.trim(),
    };

    if (!isAdmin) {
      setErrorMsg(
        'Acceso denegado: El procedimiento de inscripción inmediata a eventos presenciales está reservado exclusivamente para administradores.'
      );
      setIsSubmitting(false);
      return;
    }

    const apiUrl =
      (typeof window !== 'undefined' && window.STB_APP_CONFIG?.stbApiUrl) || '/wp-json/stb/v1/';
    const nonce = (typeof window !== 'undefined' && (window as any).STB_APP_CONFIG?.nonce) || '';

    try {
      const res = await fetch(`${apiUrl}events/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-WP-Nonce': nonce,
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setRegistrationCode(
          data.registration_code || `STB-PRES-${Math.floor(100000 + Math.random() * 900000)}`
        );
        if (data.wc_order_id) setWcOrderId(data.wc_order_id);
        if (data.checkout_payment_url) setCheckoutPaymentUrl(data.checkout_payment_url);
        if (data.user_created) setUserCreated(true);
        if (data.username) setCreatedUsername(data.username);
        if (data.temp_password) setCreatedPassword(data.temp_password);
        if (data.is_enrolled_tutor) setIsEnrolledTutor(true);
        setActiveTab('success');
      } else if (res.status === 403 || data?.code === 'rest_forbidden') {
        setErrorMsg(
          data?.message ||
            'Acceso denegado: El procedimiento de inscripción inmediata está reservado exclusivamente para administradores.'
        );
      } else if (data && data.message) {
        setErrorMsg(data.message);
      } else {
        setErrorMsg('Ocurrió un error al procesar la inscripción. Por favor inténtalo de nuevo.');
      }
    } catch (err) {
      console.error('Error durante la inscripción del evento:', err);
      setErrorMsg('No se pudo conectar con el servidor para registrar la inscripción.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Renderizar usando createPortal directamente en document.body para evitar que el Header o wpadminbar lo tapen
  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-5 pt-20 sm:pt-16 pb-8 overflow-y-auto print:p-0 print:overflow-visible">
        {/* Backdrop con desenfoque superpuesto al 100% sobre toda la página */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity print:hidden"
        />

        {/* Ventana Modal React */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }}
          className="relative w-full max-w-2xl rounded-3xl border border-white/15 bg-[#070c14] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(84,180,53,0.2)] overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[88vh] z-10 my-auto print:max-h-none print:border-none print:shadow-none print:bg-white print:text-black"
        >
          {/* Barra superior de acento degradado */}
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 via-[#54B435] to-cyan-400 shrink-0 print:hidden" />

          {/* Botón flotante de cierre */}
          <button
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="absolute top-4 right-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 border border-white/20 text-slate-300 hover:text-white hover:bg-black hover:border-white/40 transition-all backdrop-blur-sm print:hidden cursor-pointer shadow-lg"
          >
            <X className="h-4 w-4" />
          </button>

          {/* ========================================================================= */}
          {/* PESTAÑA 1: DETALLES DEL CURSO PRESENCIAL                                   */}
          {/* ========================================================================= */}
          {activeTab === 'details' && (
            <>
              {/* Contenido scrolleable */}
              <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
                {/* Cabecera / Portada */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-deep-950 aspect-[16/8] sm:aspect-[21/9]">
                  <img
                    src={
                      event.image ||
                      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80'
                    }
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
                          {event.location ||
                            'CC La Redoma de los Robles, Local 50 — Porlamar, Isla de Margarita'}
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
                        <span>
                          Fecha programada:{' '}
                          <strong className="text-slate-200 capitalize">{formattedDate}</strong>
                        </span>
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
                      {copiedShare ? (
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

                {/* Cuotas de Suscripción (Si está configurada para el curso) */}
                {event.has_subscription && event.subscription_details && (
                  <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 via-[#0a121e] to-cyan-950/30 p-4 sm:p-5 relative overflow-hidden shadow-[0_0_30px_rgba(84,180,53,0.15)]">
                    <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-white/10">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-[#54B435] border border-emerald-500/30">
                          <CreditCard className="h-4 w-4 text-[#54B435]" />
                        </div>
                        <div>
                          <h4 className="font-display text-sm sm:text-base font-bold text-white leading-tight">
                            Plan de Suscripción en Cuotas
                          </h4>
                          <span className="text-[11px] text-emerald-400 font-mono">
                            {event.subscription_details.plan_name || 'Modalidad de pago fraccionado oficial'}
                          </span>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                        {event.subscription_details.installments > 0
                          ? `${event.subscription_details.installments} Cuotas`
                          : 'Suscripción Continua'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                      <div className="rounded-xl bg-black/40 border border-white/10 p-3">
                        <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                          Monto por Cuota
                        </span>
                        <span className="font-display text-lg sm:text-xl font-extrabold text-white">
                          {event.subscription_details.price}
                        </span>
                        <span className="text-[11px] text-slate-400 block font-mono">
                          cada {event.subscription_details.interval}
                        </span>
                      </div>

                      <div className="rounded-xl bg-black/40 border border-white/10 p-3">
                        <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                          Cuotas Programadas
                        </span>
                        <span className="font-display text-lg sm:text-xl font-extrabold text-emerald-400">
                          {event.subscription_details.installments > 0
                            ? `${event.subscription_details.installments} cuotas`
                            : 'Recurrente'}
                        </span>
                        <span className="text-[11px] text-slate-400 block">
                          {event.subscription_details.cuotas_text}
                        </span>
                      </div>

                      {event.subscription_details.sign_up_fee && (
                        <div className="rounded-xl bg-black/40 border border-white/10 p-3">
                          <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                            Matrícula Inicial
                          </span>
                          <span className="font-display text-lg sm:text-xl font-extrabold text-cyan-300">
                            {event.subscription_details.sign_up_fee}
                          </span>
                          <span className="text-[11px] text-slate-400 block">
                            Única vez al registrar
                          </span>
                        </div>
                      )}

                      {event.subscription_details.total_subscription_price && (
                        <div className="rounded-xl bg-black/40 border border-white/10 p-3">
                          <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                            Inversión Total
                          </span>
                          <span className="font-display text-lg sm:text-xl font-extrabold text-white">
                            {event.subscription_details.total_subscription_price}
                          </span>
                          <span className="text-[11px] text-slate-400 block">
                            Total en cuotas
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="mt-3 text-xs text-slate-300 leading-relaxed bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
                      💡 <strong>¿Cómo funciona?</strong> Pagas tu primera cuota ({event.subscription_details.price}{event.subscription_details.sign_up_fee ? ` + matrícula de ${event.subscription_details.sign_up_fee}` : ''}) para reservar tu cupo, y el resto se cancela periódicamente cada {event.subscription_details.interval}.
                    </p>
                  </div>
                )}

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

              {/* Footer con las acciones del evento */}
              <div className="p-4 sm:p-5 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <span className="text-xs text-slate-400 text-center sm:text-left">
                  ⚡ Cupos reducidos por aforo en sede física.
                </span>

                <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
                  >
                    Cerrar
                  </button>

                  {!isFree && (
                    <a
                      href={event.checkout_url || `/checkout/?stb_buy_course=${event.course_id || event.id}`}
                      className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isAdmin
                          ? 'border border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-900/50 hover:border-cyan-400 text-cyan-200'
                          : 'bg-[#54B435] hover:bg-[#46992c] text-black font-extrabold shadow-[0_0_20px_rgba(84,180,53,0.45)] hover:shadow-[0_0_28px_rgba(84,180,53,0.65)] transform hover:-translate-y-0.5'
                      }`}
                    >
                      <ShoppingCart className={`h-3.5 w-3.5 ${isAdmin ? 'text-cyan-400' : 'text-black'}`} />
                      <span>{isAdmin ? 'Checkout en Línea' : 'Inscribirme en Línea'}</span>
                    </a>
                  )}

                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#54B435] hover:bg-[#46992c] text-black font-extrabold text-xs shadow-[0_0_20px_rgba(84,180,53,0.45)] hover:shadow-[0_0_28px_rgba(84,180,53,0.65)] transition-all cursor-pointer transform hover:-translate-y-0.5"
                      title="Procedimiento administrativo: Registrar estudiante presencial inmediatamente"
                    >
                      <Zap className="h-4 w-4 fill-black" />
                      <span>Inscripción Inmediata (Admin)</span>
                    </button>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ========================================================================= */}
          {/* PESTAÑA 2: FORMULARIO DE INSCRIPCIÓN INMEDIATA (EXCLUSIVO ADMINISTRADORES) */}
          {/* ========================================================================= */}
          {activeTab === 'register' && (
            isAdmin ? (
              <form onSubmit={handleSubmit} className="flex flex-col h-full overflow-hidden">
                {/* Encabezado del Formulario (con pr-16 para garantizar espacio libre para el botón X) */}
                <div className="p-4 sm:p-5 pr-16 border-b border-white/10 bg-[#070c14] flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-md">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab('details')}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      title="Volver a los detalles del curso"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-xs font-mono mb-0.5">
                        <span className="inline-flex items-center gap-1 text-[#54B435] font-semibold">
                          <Zap className="h-3 w-3 fill-[#54B435] shrink-0" />
                          <span>Inscripción Inmediata (Admin)</span>
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="text-emerald-400 font-bold">
                          {isFree ? 'Acceso Libre' : event.price}
                        </span>
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-extrabold text-white leading-tight truncate" title={event.title}>
                        {event.title}
                      </h3>
                    </div>
                  </div>
                </div>

              {/* Cuerpo del Formulario */}
              <div className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1">
                {errorMsg && (
                  <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-3.5 flex items-start gap-2.5 text-xs text-red-300 animate-shake">
                    <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* 1. DATOS DEL CURSANTE */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    <User className="h-3.5 w-3.5" />
                    <span>1. Datos del Cursante</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Nombre y Apellido */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Nombre y Apellido <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Ej: Carlos Mendoza"
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#54B435] focus:ring-1 focus:ring-[#54B435] outline-none transition-all"
                      />
                    </div>

                    {/* Cédula / DNI / Pasaporte */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Cédula de Identidad / DNI <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={studentDni}
                        onChange={(e) => setStudentDni(e.target.value)}
                        placeholder="Ej: V-26.123.456 o Pasaporte"
                        className="w-full rounded-xl border border-white/15 bg-black/40 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#54B435] focus:ring-1 focus:ring-[#54B435] outline-none transition-all font-mono"
                      />
                    </div>

                    {/* Correo Electrónico */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Correo Electrónico <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="h-3.5 w-3.5 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          required
                          value={studentEmail}
                          onChange={(e) => setStudentEmail(e.target.value)}
                          placeholder="carlos@correo.com"
                          className="w-full rounded-xl border border-white/15 bg-black/40 pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#54B435] focus:ring-1 focus:ring-[#54B435] outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Teléfono / WhatsApp */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Teléfono / WhatsApp <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="h-3.5 w-3.5 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          required
                          value={studentPhone}
                          onChange={(e) => setStudentPhone(e.target.value)}
                          placeholder="0412-1234567"
                          className="w-full rounded-xl border border-white/15 bg-black/40 pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#54B435] focus:ring-1 focus:ring-[#54B435] outline-none transition-all font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. CONDICIÓN DE EDAD Y REPRESENTANTE */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#54B435]" />
                      <span className="text-xs font-bold text-white">
                        ¿El cursante es menor de 18 años?
                      </span>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isMinor}
                        onChange={(e) => setIsMinor(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#54B435]"></div>
                      <span className="ml-2 text-xs font-medium text-slate-300">
                        {isMinor ? 'Sí, es menor' : 'No, mayor de edad'}
                      </span>
                    </label>
                  </div>

                  {/* Campos de Representante (Requeridos si es menor) */}
                  {isMinor ? (
                    <div className="pt-3 border-t border-white/10 space-y-3 animate-fadeIn">
                      <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-2.5 text-[11px] text-amber-300 flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 shrink-0 text-amber-400" />
                        <span>
                          Para alumnos menores de edad, requerimos los datos de su representante o
                          tutor legal para la autorización de asistencia.
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Nombre del Representante <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            required={isMinor}
                            value={repName}
                            onChange={(e) => setRepName(e.target.value)}
                            placeholder="Ej: María Rodríguez"
                            className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#54B435] outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Teléfono del Representante <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="tel"
                            required={isMinor}
                            value={repPhone}
                            onChange={(e) => setRepPhone(e.target.value)}
                            placeholder="0414-9876543"
                            className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#54B435] outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Cédula del Representante
                          </label>
                          <input
                            type="text"
                            value={repDni}
                            onChange={(e) => setRepDni(e.target.value)}
                            placeholder="Ej: V-15.432.100"
                            className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-[#54B435] outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Parentesco
                          </label>
                          <select
                            value={repRelation}
                            onChange={(e) => setRepRelation(e.target.value)}
                            className="w-full rounded-xl border border-white/15 bg-[#0b101b] px-3 py-2 text-xs text-white focus:border-[#54B435] outline-none"
                          >
                            <option value="Madre">Madre</option>
                            <option value="Padre">Padre</option>
                            <option value="Tutor Legal">Tutor Legal</option>
                            <option value="Familiar">Familiar / Hermano(a)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 text-[11px] text-slate-400">
                      <span>
                        💡 Al ser mayor de edad, el cursante firma su propia constancia de ingreso.
                      </span>
                    </div>
                  )}
                </div>

                {/* 3. LOGÍSTICA Y EQUIPAMIENTO */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    <Laptop className="h-3.5 w-3.5" />
                    <span>2. Modalidad y Equipamiento en Sede</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Nivel de experiencia */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Nivel de Conocimiento Previo
                      </label>
                      <select
                        value={experienceLevel}
                        onChange={(e) => setExperienceLevel(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-[#0b101b] px-3.5 py-2.5 text-xs text-white focus:border-[#54B435] outline-none"
                      >
                        <option value="Principiante (Desde cero)">Principiante (Desde cero)</option>
                        <option value="Intermedio (Nociones básicas)">
                          Intermedio (Nociones básicas)
                        </option>
                        <option value="Avanzado (Operativa activa)">
                          Avanzado (Operativa activa)
                        </option>
                      </select>
                    </div>

                    {/* Disposición de laptop */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        ¿Llevarás tu Laptop personal?
                      </label>
                      <select
                        value={hasLaptop}
                        onChange={(e) => setHasLaptop(e.target.value)}
                        className="w-full rounded-xl border border-white/15 bg-[#0b101b] px-3.5 py-2.5 text-xs text-white focus:border-[#54B435] outline-none"
                      >
                        <option value="si">Sí, llevaré mi laptop personal</option>
                        <option value="no">No, requiero estación de trabajo STB</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. MÉTODO DE PAGO */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#54B435] uppercase tracking-wider">
                      <CreditCard className="h-3.5 w-3.5" />
                      <span>3. Método de Pago</span>
                    </div>
                    <span className="text-xs font-extrabold text-white">
                      Monto a Cancelar:{' '}
                      <span className="text-[#54B435]">
                        {paymentMethod === 'suscripcion' && event.has_subscription && event.subscription_details
                          ? `${event.subscription_details.price} (1ra Cuota)`
                          : event.price || 'Gratis'}
                      </span>
                    </span>
                  </div>

                  {!isFree && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-xl border border-cyan-500/25 bg-gradient-to-r from-cyan-950/40 via-black to-slate-950/40 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-cyan-400 shrink-0" />
                        <span className="text-[11px] sm:text-xs">
                          ¿Prefieres pagar con tarjeta internacional o pasarela electrónica?
                        </span>
                      </div>
                      <a
                        href={event.checkout_url || `/checkout/?stb_buy_course=${event.course_id || event.id}`}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors whitespace-nowrap ml-6 sm:ml-0"
                      >
                        <span>Ir al Checkout de WooCommerce ↗</span>
                      </a>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {paymentMethods.map((pm) => {
                      const isSelected = paymentMethod === pm.id;
                      return (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => setPaymentMethod(pm.id)}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#54B435] bg-[#54B435]/10 shadow-[0_0_15px_rgba(84,180,53,0.2)]'
                              : 'border-white/10 bg-black/30 hover:border-white/25 hover:bg-white/[0.04]'
                          }`}
                        >
                          {pm.id === 'cashea' ? (
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#FFE600] text-black font-black text-xs shrink-0 shadow-[0_0_12px_rgba(255,230,0,0.4)]">
                              c.
                            </div>
                          ) : pm.id === 'suscripcion' ? (
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-[#54B435] font-black text-xs shrink-0 border border-emerald-500/40">
                              🔄
                            </div>
                          ) : (
                            <span className="text-xl shrink-0">{pm.icon}</span>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-white truncate">
                                {pm.title}
                              </span>
                              {isSelected && (
                                <Check className="h-3.5 w-3.5 text-[#54B435] shrink-0" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                              {pm.subtitle}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Datos específicos del método seleccionado */}
                  {paymentMethod && (
                    <div className="rounded-xl border border-white/10 bg-black/50 p-3.5 space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-300">
                        <span className="font-mono text-[11px] text-[#54B435]">
                          {paymentMethod === 'suscripcion'
                            ? 'Detalles del plan de suscripción en cuotas:'
                            : 'Datos para realizar el pago:'}
                        </span>
                        {paymentMethod !== 'efectivo' && paymentMethod !== 'gratis' && paymentMethod !== 'suscripcion' && (
                          <button
                            type="button"
                            onClick={() => {
                              const activeM = paymentMethods.find((m) => m.id === paymentMethod);
                              if (activeM) handleCopyPaymentInfo(activeM.details);
                            }}
                            className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <Copy className="h-3 w-3" />
                            <span>{copiedPayment ? 'Copiado' : 'Copiar datos'}</span>
                          </button>
                        )}
                      </div>
                      <p className="text-xs font-mono text-slate-200 break-words leading-relaxed">
                        {paymentMethods.find((m) => m.id === paymentMethod)?.details}
                      </p>

                      {paymentMethod === 'suscripcion' && event.has_subscription && event.subscription_details && (
                        <div className="grid grid-cols-2 gap-2 text-[11px] bg-white/[0.04] p-2.5 rounded-lg border border-white/5 font-mono mt-2">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Esquema acordado:</span>
                            <strong className="text-white">{event.subscription_details.cuotas_text}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Cuota 1 a abonar hoy:</span>
                            <strong className="text-[#54B435]">{event.subscription_details.price}</strong>
                          </div>
                        </div>
                      )}

                      {paymentMethod !== 'efectivo' && paymentMethod !== 'gratis' && (
                        <div className="pt-2 border-t border-white/5">
                          <label className="block text-[11px] text-slate-400 mb-1">
                            {paymentMethod === 'cashea'
                              ? 'Teléfono registrado en Cashea o Número de Operación (Opcional)'
                              : paymentMethod === 'suscripcion'
                              ? 'Referencia o comprobante del primer pago / matrícula (Opcional si cancelarás en sede)'
                              : 'Número de Referencia o Comprobante (Opcional si vas a cancelar en breve)'}
                          </label>
                          <input
                            type="text"
                            value={paymentRef}
                            onChange={(e) => setPaymentRef(e.target.value)}
                            placeholder={
                              paymentMethod === 'cashea'
                                ? 'Ej: 0412-1234567 o Código Cashea'
                                : paymentMethod === 'suscripcion'
                                ? 'Ej: 9482019 o Transferencia / Pago Móvil cuota 1'
                                : 'Ej: 84920194 o últimos 4 dígitos'
                            }
                            className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-[#54B435] outline-none font-mono"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 5. OBSERVACIONES Y TÉRMINOS */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Observaciones o Requerimientos Especiales (Opcional)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Dudas, restricciones o necesidades para el aula..."
                      className="w-full rounded-xl border border-white/15 bg-black/40 p-3 text-xs text-white placeholder-slate-500 focus:border-[#54B435] outline-none resize-none"
                    />
                  </div>

                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-white/20 bg-black/40 text-[#54B435] focus:ring-[#54B435]"
                    />
                    <span className="text-[11px] text-slate-400 leading-snug">
                      Acepto las normas de asistencia presencial en STB Academy y me comprometo a
                      cumplir el horario establecido para la acreditación oficial.
                    </span>
                  </label>
                </div>
              </div>

              {/* Footer de Envío */}
              <div className="p-4 sm:p-5 border-t border-white/10 bg-black/40 flex items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                >
                  ← Volver
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#54B435] hover:bg-[#46992c] disabled:opacity-50 text-black font-extrabold text-xs shadow-[0_0_20px_rgba(84,180,53,0.45)] transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                      <span>Registrando inscripción...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-3.5 w-3.5 fill-black" />
                      <span>Confirmar Inscripción Inmediata</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center space-y-4 my-auto flex-1">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">Acceso Administrativo Requerido</h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
                El procedimiento de inscripción inmediata en sede física está reservado exclusivamente para el personal administrativo de STB Academy. Para inscribirte en este curso presencial, por favor utiliza la opción de inscripción en línea.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('details')}
                  className="px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-all cursor-pointer"
                >
                  Ver Detalles
                </button>
                {!isFree && (
                  <a
                    href={event.checkout_url || `/checkout/?stb_buy_course=${event.course_id || event.id}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#54B435] hover:bg-[#46992c] text-black font-extrabold text-xs shadow-[0_0_20px_rgba(84,180,53,0.45)] transition-all cursor-pointer"
                  >
                    <ShoppingCart className="h-4 w-4 text-black" />
                    <span>Inscribirme en Línea</span>
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* ========================================================================= */}
          {/* PESTAÑA 3: CONFIRMACIÓN EXITOSA CON DETALLES Y WHATSAPP                   */}
          {/* ========================================================================= */}
          {activeTab === 'success' && (
            <div className="overflow-y-auto p-5 sm:p-7 space-y-6 text-center">
              {/* Icono de Éxito */}
              <div className="flex flex-col items-center justify-center pt-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40 shadow-[0_0_30px_rgba(84,180,53,0.4)] text-[#54B435] mb-3">
                  <CheckCircle2 className="h-9 w-9 text-[#54B435]" />
                </div>
                <h3 className="font-display text-2xl font-extrabold text-white">
                  ¡Inscripción Presencial Registrada!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
                  Tu cupo para el curso presencial ha sido pre-reservado en el sistema oficial de STB
                  Academy.
                </p>
              </div>

              {/* Código Único de Registro y Badges de Integración */}
              <div className="space-y-2">
                <div className="rounded-2xl border border-[#54B435]/40 bg-gradient-to-r from-emerald-950/40 via-black to-cyan-950/40 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-left">
                    <span className="text-[11px] font-mono text-emerald-400 block uppercase tracking-wider">
                      Código de Registro Oficial:
                    </span>
                    <span className="font-mono text-xl sm:text-2xl font-black text-white tracking-widest">
                      {registrationCode}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#54B435]" />
                        <span className="text-[#54B435]">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copiar Código</span>
                      </>
                    )}
                  </button>
                </div>

                {(wcOrderId || userCreated || isEnrolledTutor) && (
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    {wcOrderId && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Orden WooCommerce #{wcOrderId}</span>
                      </div>
                    )}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#54B435]" />
                      <span>Inscrito en Tutor LMS ✓</span>
                    </div>
                    {userCreated ? (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-blue-300">
                        <UserCheck className="h-3.5 w-3.5 text-blue-400" />
                        <span>Usuario WordPress Creado</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-500/10 border border-slate-500/30 text-xs font-mono text-slate-300">
                        <UserCheck className="h-3.5 w-3.5 text-slate-400" />
                        <span>Usuario WordPress Vinculado</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Cuadro de Credenciales de Acceso para el Estudiante (si fue creado) */}
                {userCreated && createdPassword && (
                  <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-4 text-left space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                        <Key className="h-4 w-4 text-[#54B435]" />
                        <span>Credenciales de Acceso a la Plataforma Online</span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCredentials(
                            `¡Hola ${studentName}! Tus datos de acceso a STB Academy:\nUsuario: ${createdUsername || studentEmail}\nContraseña: ${createdPassword}\nCurso: ${event.title}\nAcceso: ${window.location.origin}/iniciar-sesion`
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/15 bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-200 transition-colors cursor-pointer shrink-0"
                      >
                        {copiedCreds ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-[#54B435]" />
                            <span className="text-[#54B435]">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" />
                            <span>Copiar Credenciales</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Se ha creado la cuenta de estudiante y se ha enviado un correo con las credenciales y el acceso directo al curso.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                      <div className="bg-black/50 border border-white/10 rounded-xl p-2.5">
                        <span className="text-slate-500 block text-[10px]">Usuario / Login:</span>
                        <span className="text-white font-bold">{createdUsername || studentEmail}</span>
                      </div>
                      <div className="bg-black/50 border border-white/10 rounded-xl p-2.5">
                        <span className="text-slate-500 block text-[10px]">Contraseña Temporal:</span>
                        <span className="text-emerald-400 font-bold">{createdPassword}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Ficha Resumen de la Inscripción */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left space-y-3 text-xs">
                <h4 className="font-bold text-white border-b border-white/10 pb-2">
                  Resumen de la Solicitud:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Cursante:</span>
                    <strong className="text-white">{studentName}</strong> ({studentDni})
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Contacto:</span>
                    <span className="font-mono">{studentPhone}</span> — {studentEmail}
                  </div>
                  {isMinor && (
                    <div className="sm:col-span-2">
                      <span className="text-amber-400 font-semibold block text-[11px]">
                        Representante Legal:
                      </span>
                      <span>
                        {repName} ({repRelation}) — Tel: {repPhone} {repDni && `(C.I: ${repDni})`}
                      </span>
                    </div>
                  )}
                  <div>
                    <span className="text-slate-500 block text-[11px]">Curso Presencial:</span>
                    <strong className="text-white">{event.title}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Días y Horario:</span>
                    <span>{event.days || formattedDate} | {event.schedule || 'En aula'}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block text-[11px]">Sede Física:</span>
                    <span>{event.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Método de Pago:</span>
                    <strong className="text-emerald-400 capitalize">
                      {paymentMethods.find((m) => m.id === paymentMethod)?.title || paymentMethod}
                    </strong>
                    {paymentMethod === 'suscripcion' && event.has_subscription && event.subscription_details && (
                      <span className="block text-[11px] text-slate-300 font-mono mt-0.5">
                        {event.subscription_details.cuotas_text || event.subscription_details.summary}
                      </span>
                    )}
                    {paymentRef && <span className="font-mono ml-2 text-slate-400">(Ref: {paymentRef})</span>}
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Estación de Trabajo:</span>
                    <span>{hasLaptop === 'si' ? 'Llevará Laptop propia' : 'Requiere PC de STB'}</span>
                  </div>
                </div>
              </div>

              {/* Botones de Acción: WhatsApp + Pagar en Línea WooCommerce + Imprimir */}
              <div className="space-y-3 pt-2">
                {checkoutPaymentUrl && (
                  <a
                    href={checkoutPaymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-2xl border border-cyan-500/50 bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-200 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.25)] transition-all cursor-pointer"
                  >
                    <CreditCard className="h-4 w-4 text-cyan-400" />
                    <span>Pagar Pedido #{wcOrderId || ''} en Línea (WooCommerce) ↗</span>
                  </a>
                )}

                <a
                  href={getWhatsAppConfirmUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-sm shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="h-5 w-5 fill-black" />
                  <span>Confirmar y Enviar Comprobante por WhatsApp</span>
                </a>

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Imprimir Resumen</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors cursor-pointer"
                  >
                    <span>Cerrar</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
