import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);

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
    const handleRouteChange = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handleRouteChange);

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
      window.removeEventListener('popstate', handleRouteChange);
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

  const isCurrentActive = (href: string) => {
    if (href === '/' && (currentPath === '/' || currentPath === '')) return true;
    if (href !== '/' && currentPath.startsWith(href)) return true;
    return false;
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
      {/* Línea inferior de acento con gradiente verde */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <nav className="container-max section-padding flex items-center justify-between">
        {/* Logo oficial con animación */}
        <RouterLink to="/" className="flex items-center gap-2 group">
          <BrandLogo variant="white" size="sm" />
        </RouterLink>

        {/* Enlaces de navegación principales */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => {
            const isHighlighted = link.href.includes('/stblock');
            const isActive = isCurrentActive(link.href);
            const isExternal = link.href.startsWith('http://') || link.href.startsWith('https://');

            return (
              <li key={link.href + link.label}>
                {isExternal ? (
                  <a
                    href={link.href}
                    target={link.target || '_self'}
                    rel="noopener noreferrer"
                    className="font-display text-[0.9rem] font-medium tracking-wide text-ink-gray-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ) : (
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
                const isHighlighted = link.href.includes('/stblock');
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
