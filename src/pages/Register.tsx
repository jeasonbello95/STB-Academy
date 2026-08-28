import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Mail, Lock, User, ArrowLeft, Eye, EyeOff, Phone } from 'lucide-react';

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
  const [accepted, setAccepted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!accepted) {
      setError('Debes aceptar los Términos y Condiciones para continuar.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-ink-black flex items-center justify-center section-padding relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-neon-cyan/10 rounded-full blur-[100px]" />
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />

      {/* Back link */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-sm text-ink-gray-400 hover:text-white transition-colors z-10"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver al inicio
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        <div className="glass rounded-2xl p-8 sm:p-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <Link to="/" className="flex items-center gap-2 group mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-neon-green blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                <Cpu className="relative w-10 h-10 text-neon-green" strokeWidth={2.5} />
              </div>
            </Link>
            <h1 className="font-display text-2xl font-bold tracking-tight">
              Registrarme Gratis
            </h1>
            <p className="mt-2 text-sm text-ink-gray-400 text-center">
              Únete a la comunidad de creadores tecnológicos
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-ink-gray-300 mb-2">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-gray-500" />
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-ink-gray-500 focus:outline-none focus:border-neon-green/50 focus:bg-white/[0.07] transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-ink-gray-300 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-gray-500" />
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-ink-gray-500 focus:outline-none focus:border-neon-green/50 focus:bg-white/[0.07] transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-medium text-ink-gray-300 mb-2">
                Teléfono <span className="text-ink-gray-500">(opcional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-gray-500" />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+58 412-0000000"
                  className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-ink-gray-500 focus:outline-none focus:border-neon-green/50 focus:bg-white/[0.07] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-ink-gray-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full pl-11 pr-11 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-ink-gray-500 focus:outline-none focus:border-neon-green/50 focus:bg-white/[0.07] transition-all"
                />
                <button
                  type="button"
                  aria-label="Mostrar contraseña"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 text-xs text-ink-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-white/20 bg-white/5 accent-neon-green"
              />
              <span>
                Acepto los{' '}
                <a href="#" className="text-neon-green hover:underline">Términos y Condiciones</a>
                {' '}y la{' '}
                <a href="#" className="text-neon-green hover:underline">Política de Seguridad</a>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Creando cuenta...' : 'Crear Cuenta Gratis'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-ink-gray-500">o</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Login link */}
          <p className="text-center text-sm text-ink-gray-400">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-neon-green hover:underline font-medium">
              Inicia sesión
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
