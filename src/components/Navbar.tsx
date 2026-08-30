import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn } from 'lucide-react';
import { navLinks } from '@/data/content';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { RouterLink } from '@/components/RouterLink';
import { BrandLogo } from '@/components/BrandLogo';

export default function Navbar() {
  const scrolled = useScrollPosition(20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-deep-950/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.35)]'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Línea inferior con gradiente verde/azul */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <nav className="container-max section-padding flex items-center justify-between">
        {/* Logo */}
        <RouterLink to="/" className="flex items-center gap-2 group">
          <BrandLogo variant="white" size="sm" />
        </RouterLink>

        {/* Center nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isHighlighted = link.href === '/stblock';
            const isActive = currentPath === link.href;
            return (
              <li key={link.href}>
                <RouterLink
                  to={link.href}
                  className={
                    isHighlighted
                      ? 'rounded-full border border-primary-500/50 bg-primary-500/10 px-5 py-2 text-sm font-semibold text-primary-300 hover:bg-primary-500/20 hover:border-primary-400 hover:shadow-[0_0_15px_rgba(84,180,53,0.3)] transition-all'
                      : `font-display text-[0.9rem] font-medium tracking-wide transition-colors relative group ${
                          isActive ? 'text-white' : 'text-ink-gray-300 hover:text-white'
                        }`
                  }
                >
                  {link.label}
                  {!isHighlighted && (
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-primary-400 to-cyan-400 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  )}
                </RouterLink>
              </li>
            );
          })}
        </ul>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <RouterLink
            to="/login"
            className="group inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-2.5 text-sm font-bold tracking-wide text-black hover:bg-primary-400 hover:shadow-[0_0_20px_rgba(84,180,53,0.4)] transition-all"
          >
            <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            Acceder
          </RouterLink>
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
            className="md:hidden overflow-hidden bg-deep-950/95 backdrop-blur-xl border-t border-white/10"
          >
            <ul className="section-padding py-4 space-y-3">
              {navLinks.map((link) => {
                const isHighlighted = link.href === '/stblock';
                const isActive = currentPath === link.href;
                return (
                  <li key={link.href}>
                    <RouterLink
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={
                        isHighlighted
                          ? 'block text-center rounded-xl border border-primary-500/40 bg-primary-500/10 px-4 py-2.5 text-base font-semibold text-primary-300 hover:bg-primary-500/20 transition-all'
                          : `block text-base font-medium transition-colors py-2 ${
                              isActive
                                ? 'text-primary-400 font-semibold'
                                : 'text-ink-gray-300 hover:text-primary-400'
                            }`
                      }
                    >
                      {link.label}
                    </RouterLink>
                  </li>
                );
              })}
              <li className="pt-2">
                <RouterLink
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 text-center text-sm font-bold text-black bg-primary-500 px-4 py-3 rounded-xl hover:bg-primary-400 transition-all"
                >
                  <LogIn className="h-4 w-4" />
                  Acceder
                </RouterLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
