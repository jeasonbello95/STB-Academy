import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Cpu } from 'lucide-react';
import { navLinks } from '@/data/content';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { RouterLink } from '@/components/RouterLink';

export default function Navbar() {
  const scrolled = useScrollPosition(20);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-ink-black/80 backdrop-blur-xl border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container-max section-padding flex items-center justify-between">
        {/* Logo */}
        <RouterLink to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-neon-green blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
            <Cpu className="relative w-8 h-8 text-neon-green" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            STB <span className="text-neon-green">Academy</span>
          </span>
        </RouterLink>

        {/* Center nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <RouterLink
                to={link.href}
                className="text-sm font-medium text-ink-gray-300 hover:text-white transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-green group-hover:w-full transition-all duration-300" />
              </RouterLink>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            aria-label="Buscar"
            className="p-2 text-ink-gray-300 hover:text-neon-green transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <a
            href="/login"
            className="text-sm font-medium text-white px-4 py-2 rounded-lg border border-white/10 hover:border-white/30 transition-all"
          >
            Iniciar Sesión
          </a>
          <a
            href="/registro"
            className="text-sm font-semibold text-black bg-neon-green px-4 py-2 rounded-lg hover:bg-neon-green-bright hover:shadow-[0_0_20px_rgba(84,180,53,0.4)] transition-all"
          >
            Registrarme
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-white"
          aria-label="Menú"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-ink-black/95 backdrop-blur-xl border-t border-white/10"
          >
            <ul className="section-padding py-4 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <RouterLink
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-base font-medium text-ink-gray-300 hover:text-neon-green transition-colors py-2"
                  >
                    {link.label}
                  </RouterLink>
                </li>
              ))}
              <li className="pt-2 flex flex-col gap-2">
                <a
                  href="/login"
                  className="text-center text-sm font-medium text-white px-4 py-2.5 rounded-lg border border-white/10"
                >
                  Iniciar Sesión
                </a>
                <a
                  href="/registro"
                  className="text-center text-sm font-semibold text-black bg-neon-green px-4 py-2.5 rounded-lg"
                >
                  Registrarme
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
