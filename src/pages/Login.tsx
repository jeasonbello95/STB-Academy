import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Mail, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
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
              Iniciar Sesión
            </h1>
            <p className="mt-2 text-sm text-ink-gray-400 text-center">
              Bienvenido de nuevo a STB Academy
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-ink-gray-300 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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

            {/* Remember + forgot */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-ink-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/20 bg-white/5 accent-neon-green"
                />
                Recordarme
              </label>
              <a href="#" className="text-neon-green hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando...' : 'Iniciar Sesión'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-ink-gray-500">o</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Register link */}
          <p className="text-center text-sm text-ink-gray-400">
            ¿No tienes una cuenta?{' '}
            <Link to="/registro" className="text-neon-green hover:underline font-medium">
              Regístrate gratis
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
