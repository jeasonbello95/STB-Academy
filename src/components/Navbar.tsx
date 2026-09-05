import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Menu, X, LogIn, User, LogOut, LayoutDashboard } from 'lucide-react';
import { navLinks as defaultNavLinks } from '@/data/content';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { RouterLink } from '@/components/RouterLink';
import { BrandLogo } from '@/components/BrandLogo';

interface NavItem {
  id?: string;
  label: string;
  href: string;
  target?: string;
}

interface AuthData {
  isLoggedIn: boolean;
  userId?: number | null;
  userName?: string | null;
  userEmail?: string | null;
  userAvatar?: string | null;
  dashboardUrl?: string;
  loginUrl?: string;
  logoutUrl?: string;
  registerUrl?: string;
}

interface HeaderData {
  menu: NavItem[];
  auth: AuthData;
  site: {
    name: string;
    description: string;
    url: string;
  };
}

export default function Navbar() {
  const scrolled = useScrollPosition(20);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [hasAdminBar, setHasAdminBar] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  // Inicializar con datos inyectados por WordPress (si existen) o con valores por defecto
  const [headerData, setHeaderData] = useState<HeaderData>(() => {
    const wpHeader = (window as any)?.STB_APP_CONFIG?.headerData;
    if (wpHeader && Array.isArray(wpHeader.menu)) {
      return wpHeader;
    }
    return {
      menu: defaultNavLinks,
      auth: {
        isLoggedIn: false,
        loginUrl: '/login',
        dashboardUrl: '/dashboard',
        logoutUrl: '#',
      },
      site: {
        name: 'STB Academy',
        description: 'Academia de Robótica y Tecnología',
        url: '/',
      },
    };
  });

  useEffect(() => {
    // Detectar si la barra de administración de WordPress (wpadminbar) está presente
    const checkAdminBar = () => {
      if (typeof document !== 'undefined') {
        const adminBar = document.getElementById('wpadminbar');
        const hasBar = Boolean(adminBar) || document.body.classList.contains('admin-bar');
        setHasAdminBar(hasBar);
      }
    };
    checkAdminBar();
    const timer = setTimeout(checkAdminBar, 200);

    // Si corre en WordPress pero headerData no vino en window, intentar cargar por REST
    const stbApiUrl = (window as any)?.STB_APP_CONFIG?.stbApiUrl;
    if (stbApiUrl && !(window as any)?.STB_APP_CONFIG?.headerData) {
      fetch(`${stbApiUrl}header`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.menu) {
            setHeaderData(data);
          }
        })
        .catch((err) => console.warn('Could not fetch WordPress header data:', err));
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleLogout = async (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setUserDropdownOpen(false);
    setMobileOpen(false);

    try {
      const restUrl = (window as any).STB_APP_CONFIG?.stbApiUrl || '/wp-json/stb/v1/';
      await fetch(`${restUrl}auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': (window as any).STB_APP_CONFIG?.nonce || '',
        },
        credentials: 'include',
      });
    } catch (err) {
      console.warn('Error al cerrar sesión:', err);
    } finally {
      // Redirigir siempre a la portada sin pasar por wp-login.php
      window.location.href = '/';
    }
  };

  const links = headerData.menu && headerData.menu.length > 0 ? headerData.menu : defaultNavLinks;
  const { auth } = headerData;

  const getInternalPath = (href: string) => {
    if (!href) return '/';
    if (href.startsWith('http://') || href.startsWith('https://')) {
      try {
        const parsed = new URL(href);
        const host = parsed.hostname.toLowerCase();
        if (
          (typeof window !== 'undefined' && parsed.origin === window.location.origin) ||
          host.includes('stbacademy') ||
          host.includes('stb.local') ||
          host.includes('localhost') ||
          host.includes('127.0.0.1')
        ) {
          return parsed.pathname || '/';
        }
      } catch {
        return href;
      }
    }
    return href;
  };

  const isCurrentActive = (href: string) => {
    if (!href) return false;
    const path = getInternalPath(href);
    const cleanHref = path.replace(/\/+$/, '') || '/';
    const cleanCurrent = currentPath.replace(/\/+$/, '') || '/';

    if (cleanHref === '/') {
      return cleanCurrent === '/';
    }
    return cleanCurrent === cleanHref || cleanCurrent.startsWith(cleanHref + '/');
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`stb-navbar fixed left-0 right-0 z-50 transition-all duration-500 ${
        hasAdminBar ? 'top-[32px] max-md:top-[46px]' : 'top-0'
      } ${
        scrolled
          ? 'bg-deep-950/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.4)]'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container-max section-padding flex items-center justify-between">
        {/* Logo oficial con animación */}
        <RouterLink to="/" className="flex items-center gap-2 group">
          <BrandLogo variant="white" size="sm" />
        </RouterLink>

        {/* Enlaces de navegación principales */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const targetPath = getInternalPath(link.href);
            const isExternal = targetPath.startsWith('http://') || targetPath.startsWith('https://');
            const isHighlighted = targetPath.includes('/stblock') || link.label.toLowerCase().includes('stblock') || link.label.toLowerCase().includes('stb block');
            const isActive = isCurrentActive(link.href);

            return (
              <li key={link.href + link.label} className="relative">
                {isExternal ? (
                  <a
                    href={targetPath}
                    target={link.target || '_self'}
                    rel="noopener noreferrer"
                    className="font-display text-[0.95rem] font-medium tracking-wide text-ink-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ) : isHighlighted ? (
                  <RouterLink
                    to={targetPath}
                    className={`relative overflow-hidden rounded-full px-5 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group ${
                      isActive
                        ? 'border-2 border-primary-400 bg-gradient-to-r from-primary-500/35 via-emerald-500/25 to-primary-500/35 text-white shadow-[0_0_25px_rgba(84,180,53,0.85),inset_0_0_12px_rgba(84,180,53,0.35)] ring-2 ring-primary-400/60 scale-105'
                        : 'border border-primary-500/50 bg-primary-500/10 text-primary-300 hover:bg-primary-500/25 hover:border-primary-400 hover:text-white hover:shadow-[0_0_20px_rgba(84,180,53,0.6)] hover:scale-105 active:scale-95 active:shadow-[0_0_30px_rgba(84,180,53,0.9)]'
                    }`}
                  >
                    <span className="absolute inset-0 -z-10 bg-gradient-to-r from-primary-500/20 via-cyan-400/20 to-primary-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse"></span>
                    <span>{link.label}</span>
                  </RouterLink>
                ) : (
                  <RouterLink
                    to={targetPath}
                    className={`font-display text-[0.95rem] tracking-wide transition-colors relative py-1.5 px-1 block group ${
                      isActive ? 'text-white font-bold' : 'text-ink-gray-300 hover:text-white font-medium'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive ? (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-[2.5px] rounded-full bg-gradient-to-r from-primary-400 via-emerald-400 to-cyan-400 shadow-[0_0_12px_rgba(84,180,53,0.85)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    ) : (
                      <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary-400/50 transition-all duration-300 group-hover:w-full rounded-full shadow-[0_0_8px_rgba(84,180,53,0.6)]" />
                    )}
                  </RouterLink>
                )}
              </li>
            );
          })}
        </ul>

        {/* Acciones de usuario y autenticación */}
        <div className="hidden md:flex items-center gap-3">
          {auth.isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2.5 rounded-full border border-primary-500/40 bg-deep-900/90 py-1.5 pl-2 pr-4 text-sm font-medium text-white hover:border-primary-400 hover:bg-primary-500/10 transition-all"
              >
                {auth.userAvatar ? (
                  <img
                    src={auth.userAvatar}
                    alt={auth.userName || 'Usuario'}
                    className="h-7 w-7 rounded-full object-cover border border-primary-400/50"
                  />
                ) : (
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-500/20 text-primary-400">
                    <User className="h-4 w-4" />
                  </div>
                )}
                <span className="max-w-[120px] truncate">{auth.userName || 'Mi Cuenta'}</span>
              </button>

              {/* Menú desplegable interactivo del estudiante */}
              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-white/15 bg-deep-950/95 p-2 shadow-2xl backdrop-blur-xl"
                  >
                    <a
                      href={auth.dashboardUrl || '/dashboard'}
                      className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-primary-500/15 hover:text-primary-300 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 text-primary-400" />
                      Panel del Estudiante
                    </a>
                    <div className="my-1 h-px bg-white/10" />
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Cerrar Sesión
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <RouterLink
              to="/login"
              className="group inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-2.5 text-sm font-bold tracking-wide text-black hover:bg-primary-400 hover:shadow-[0_0_20px_rgba(84,180,53,0.4)] transition-all"
            >
              <LogIn className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              Acceder
            </RouterLink>
          )}
        </div>

        {/* Toggle para versión móvil */}
        <button
          className="md:hidden p-2 text-white"
          aria-label="Menú"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Menú móvil desplegable animado */}
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
              {links.map((link) => {
                const isHighlighted = link.href.includes('/stblock') || link.label.toLowerCase().includes('stblock') || link.label.toLowerCase().includes('stb block');
                const isActive = isCurrentActive(link.href);
                const isExternal = link.href.startsWith('http://') || link.href.startsWith('https://');

                return (
                  <li key={link.href + link.label}>
                    {isExternal ? (
                      <a
                        href={link.href}
                        target={link.target || '_self'}
                        rel="noopener noreferrer"
                        onClick={() => setMobileOpen(false)}
                        className="block text-base font-medium text-ink-gray-300 py-2 hover:text-primary-400"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <RouterLink
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={
                          isHighlighted
                            ? `block text-center rounded-xl px-4 py-2.5 text-base font-bold transition-all ${
                                isActive
                                  ? 'border-2 border-primary-400 bg-primary-500/30 text-white shadow-[0_0_20px_rgba(84,180,53,0.85)]'
                                  : 'border border-primary-500/40 bg-primary-500/10 text-primary-300 hover:bg-primary-500/20'
                              }`
                            : `block text-base font-medium transition-colors py-2 flex items-center justify-between ${
                                isActive
                                  ? 'text-white font-semibold border-l-2 border-primary-400 pl-3 bg-primary-500/10 rounded-r-lg'
                                  : 'text-ink-gray-300 hover:text-primary-400'
                              }`
                        }
                      >
                        <span>{link.label}</span>
                        {isActive && !isHighlighted && (
                          <span className="h-2 w-2 rounded-full bg-primary-400 shadow-[0_0_8px_#54b435]" />
                        )}
                      </RouterLink>
                    )}
                  </li>
                );
              })}

              <li className="pt-2">
                {auth.isLoggedIn ? (
                  <div className="space-y-2">
                    <a
                      href={auth.dashboardUrl || '/dashboard'}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 text-center text-sm font-bold text-black bg-primary-500 px-4 py-3 rounded-xl hover:bg-primary-400 transition-all"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Panel de Estudiante ({auth.userName})
                    </a>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 text-center text-sm font-semibold text-red-400 border border-red-500/30 bg-red-500/10 px-4 py-2.5 rounded-xl hover:bg-red-500/20 transition-all"
                    >
                      <LogOut className="h-4 w-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                ) : (
                  <RouterLink
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 text-center text-sm font-bold text-black bg-primary-500 px-4 py-3 rounded-xl hover:bg-primary-400 transition-all"
                  >
                    <LogIn className="h-4 w-4" />
                    Acceder
                  </RouterLink>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
