import { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowLeft, Mail, RefreshCw, LogIn } from 'lucide-react';
import { AmbientBackground } from '@/components/AmbientBackground';
import { BrandLogo } from '@/components/BrandLogo';
import { Mascot } from '@/components/Mascot';

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';
  const emailParam = searchParams.get('email') || '';

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('');
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No se encontró ningún token de verificación en el enlace.');
      return;
    }

    const verifyToken = async () => {
      try {
        const restUrl = (window as any).STB_APP_CONFIG?.stbApiUrl || '/wp-json/stb/v1/';
        const response = await fetch(`${restUrl}auth/verify?token=${encodeURIComponent(token)}&email=${encodeURIComponent(emailParam)}`, {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        if (response.ok && data.success) {
          setStatus('success');
          setMessage(data.message || '¡Tu cuenta ha sido verificada exitosamente!');
          setTimeout(() => {
            if (data.redirectUrl) {
              window.location.href = data.redirectUrl;
            } else {
              navigate('/cursos');
            }
          }, 2000);
        } else {
          setStatus('error');
          setMessage(data.message || 'El enlace de verificación no es válido o ha expirado.');
        }
      } catch (err) {
        console.error(err);
        setStatus('error');
        setMessage('Ocurrió un error al conectar con el servidor.');
      }
    };

    verifyToken();
  }, [token, emailParam, navigate]);

  const handleResend = async () => {
    if (!emailParam) {
      navigate('/login');
      return;
    }

    setResending(true);
    try {
      const restUrl = (window as any).STB_APP_CONFIG?.stbApiUrl || '/wp-json/stb/v1/';
      const response = await fetch(`${restUrl}auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': (window as any).STB_APP_CONFIG?.nonce || '',
        },
        body: JSON.stringify({ email: emailParam }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setResendSuccess(true);
      } else {
        alert(data.message || 'No se pudo reenviar el correo.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión al reenviar.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <AmbientBackground />

      {/* Botón Volver al inicio */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-xs sm:text-sm font-medium text-ink-gray-400 hover:text-white transition-colors z-20 rounded-full border border-white/10 bg-deep-900/60 px-4 py-2 backdrop-blur-md"
      >
        <ArrowLeft className="w-4 h-4 text-primary-400" />
        <span>Volver al inicio</span>
      </Link>

      <div className="relative z-10 w-full max-w-md my-8">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 via-cyan-500/10 to-transparent rounded-3xl blur-2xl transform scale-95 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative rounded-3xl border border-white/15 bg-deep-900/80 p-8 sm:p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-center overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

          <div className="flex flex-col items-center mb-6">
            <Link to="/" className="group mb-5">
              <BrandLogo variant="green" size="md" />
            </Link>
          </div>

          {status === 'verifying' && (
            <div className="space-y-4 py-6">
              <div className="flex justify-center">
                <RefreshCw className="h-12 w-12 text-primary-400 animate-spin" />
              </div>
              <h2 className="text-xl font-bold font-display text-white">Verificando tu cuenta...</h2>
              <p className="text-xs text-ink-gray-400">Por favor espera un momento mientras activamos tu acceso a STB Academy.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-emerald-500/20 p-3 border border-emerald-500/40">
                  <CheckCircle2 className="h-12 w-12 text-emerald-400" />
                </div>
              </div>
              <h2 className="text-2xl font-bold font-display text-white">¡Cuenta Verificada!</h2>
              <p className="text-sm text-ink-gray-300">{message}</p>
              <p className="text-xs text-primary-400 font-semibold animate-pulse">Redirigiendo a tu panel de estudiante...</p>
              <div className="pt-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center w-full rounded-xl bg-primary-500 py-3 text-sm font-bold text-black hover:bg-primary-400 transition-all"
                >
                  Ir a mi Panel
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-red-500/20 p-3 border border-red-500/40">
                  <XCircle className="h-12 w-12 text-red-400" />
                </div>
              </div>
              <h2 className="text-xl font-bold font-display text-white">No se pudo verificar</h2>
              <p className="text-xs text-ink-gray-300">{message}</p>

              {resendSuccess ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300">
                  ¡Nuevo correo de verificación enviado! Revisa tu bandeja de entrada o spam.
                </div>
              ) : emailParam ? (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-primary-500/40 bg-primary-500/10 py-3 text-xs font-bold text-primary-300 hover:bg-primary-500/20 transition-all"
                >
                  <Mail className="w-4 h-4" />
                  {resending ? 'Reenviando...' : 'Reenviar correo de verificación'}
                </button>
              ) : null}

              <div className="pt-2">
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-white/10 hover:bg-white/15 py-3 text-xs font-semibold text-white transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  Volver al inicio de sesión
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>

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

export default VerifyEmailPage;
