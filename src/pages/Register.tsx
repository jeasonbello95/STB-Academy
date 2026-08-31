import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowLeft, Eye, EyeOff, Phone, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AmbientBackground } from '@/components/AmbientBackground';
import { BrandLogo } from '@/components/BrandLogo';
import { Mascot } from '@/components/Mascot';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [accepted, setAccepted] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }

    if (!accepted) {
      setError('Debes aceptar los Términos y Condiciones para continuar.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/cursos');
      }, 700);
    }, 900);
  };

  return (
    <div className="relative min-h-screen text-white flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Fondo global idéntico con orbes verde/azul, cuadrícula técnica y scanline */}
      <AmbientBackground />

      {/* Botón Volver al inicio */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-xs sm:text-sm font-medium text-ink-gray-400 hover:text-white transition-colors z-20 rounded-full border border-white/10 bg-deep-900/60 px-4 py-2 backdrop-blur-md"
      >
        <ArrowLeft className="w-4 h-4 text-primary-400" />
        <span>Volver al inicio</span>
      </Link>

      {/* Contenedor central */}
      <div className="relative z-10 w-full max-w-lg my-12 pt-6">
        
        {/* Halo de luz tras la tarjeta */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 via-cyan-500/10 to-transparent rounded-3xl blur-2xl transform scale-95 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative rounded-3xl border border-white/15 bg-deep-900/80 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* Línea superior con gradiente de neón */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

          {/* Logo y Encabezado */}
          <div className="flex flex-col items-center text-center mb-7">
            <Link to="/" className="group mb-5">
              <BrandLogo variant="green" size="md" />
            </Link>

            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Crea tu Cuenta Gratis
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-ink-gray-400">
              Únete a la comunidad líder en robótica y tecnología
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-medium"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-300 font-semibold flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>¡Cuenta creada con éxito! Redirigiendo...</span>
              </motion.div>
            )}

            {/* Nombre Completo */}
            <div>
              <label className="block text-xs font-semibold text-ink-gray-300 mb-1.5">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-gray-500" />
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tu nombre y apellido"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-deep-950/80 border border-white/10 text-white placeholder:text-ink-gray-500 text-sm focus:outline-none focus:border-primary-500/70 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>
            </div>

            {/* Correo Electrónico */}
            <div>
              <label className="block text-xs font-semibold text-ink-gray-300 mb-1.5">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-gray-500" />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ejemplo@stbacademy.net"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-deep-950/80 border border-white/10 text-white placeholder:text-ink-gray-500 text-sm focus:outline-none focus:border-primary-500/70 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>
            </div>

            {/* Teléfono WhatsApp */}
            <div>
              <label className="block text-xs font-semibold text-ink-gray-300 mb-1.5">
                Teléfono / WhatsApp <span className="text-ink-gray-500 font-normal">(opcional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-gray-500" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+58 412 000 0000"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-deep-950/80 border border-white/10 text-white placeholder:text-ink-gray-500 text-sm focus:outline-none focus:border-primary-500/70 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label className="block text-xs font-semibold text-ink-gray-300 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-deep-950/80 border border-white/10 text-white placeholder:text-ink-gray-500 text-sm focus:outline-none focus:border-primary-500/70 focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
                <button
                  type="button"
                  aria-label="Mostrar contraseña"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Términos y Condiciones */}
            <label className="flex items-start gap-2.5 text-xs text-ink-gray-400 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-white/20 bg-deep-950 accent-primary-500 cursor-pointer"
              />
              <span className="leading-tight">
                Acepto los{' '}
                <a href="#" className="text-primary-400 hover:underline">Términos del Servicio</a>
                {' '}y la{' '}
                <a href="#" className="text-primary-400 hover:underline">Política de Privacidad</a>
              </span>
            </label>

            {/* Botón de Enviar */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full rounded-xl bg-primary-500 hover:bg-primary-400 text-black font-bold py-3.5 text-sm shadow-[0_0_20px_rgba(84,180,53,0.4)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98] mt-2"
            >
              {loading ? 'Creando cuenta...' : success ? '¡Listo!' : 'Crear mi cuenta gratis'}
            </button>
          </form>

          {/* Separador */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-ink-gray-500">¿Ya estás registrado?</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Enlace a Login */}
          <div className="text-center">
            <Link
              to="/login"
              className="inline-flex items-center justify-center w-full rounded-xl border border-white/15 bg-white/[0.03] py-3 text-xs font-bold text-white hover:border-primary-500/40 hover:bg-primary-500/10 hover:text-primary-300 transition-all duration-300"
            >
              Iniciar sesión
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Mascota flotante de fondo */}
      <Mascot
        src="/imagenes/saludando-mascota.png"
        alt="Mascota STB"
        float
        floatDuration={6}
        glow
        className="hidden lg:block absolute bottom-10 right-14 h-72 w-auto object-contain pointer-events-none drop-shadow-[0_0_30px_rgba(84,180,53,0.3)]"
      />
    </div>
  );
}

