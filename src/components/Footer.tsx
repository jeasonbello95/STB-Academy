import { motion } from 'framer-motion';
import {
  Mail,
  MapPin,
  Shield,
  FileText,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  ArrowUp,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { BrandLogo } from '@/components/BrandLogo';
import { RouterLink } from '@/components/RouterLink';

const socials = [
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://instagram.com/stb.ve',
    color: 'text-pink-400 bg-pink-500/10 border-pink-500/20 hover:border-pink-500/60 hover:bg-pink-500/25 hover:text-white hover:shadow-[0_0_20px_rgba(228,64,95,0.45)]',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://facebook.com/Stb.ve/',
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/20 hover:border-blue-500/60 hover:bg-blue-500/25 hover:text-white hover:shadow-[0_0_20px_rgba(24,119,242,0.45)]',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    href: 'https://wa.me/584121421335',
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/60 hover:bg-emerald-500/25 hover:text-white hover:shadow-[0_0_20px_rgba(37,211,102,0.45)]',
  },
  {
    icon: Youtube,
    label: 'YouTube',
    href: 'https://youtube.com/@STBAcademy_Ve',
    color: 'text-red-400 bg-red-500/10 border-red-500/20 hover:border-red-500/60 hover:bg-red-500/25 hover:text-white hover:shadow-[0_0_20px_rgba(255,0,0,0.45)]',
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-deep-950/95 text-ink-gray-300 border-t border-white/[0.08] backdrop-blur-md">
      {/* Línea superior con láser gradiente animado */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-primary-500 to-transparent shadow-[0_0_12px_rgba(84,180,53,0.8)]" />

      {/* Luces ambientales que respiran sutilmente */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-16 left-1/4 h-48 w-96 rounded-full bg-primary-500/10 blur-[90px]"
      />
      <motion.div
        aria-hidden
        animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="pointer-events-none absolute -bottom-16 right-1/4 h-48 w-80 rounded-full bg-cyan-500/10 blur-[90px]"
      />

      <div className="relative container-max section-padding py-8 md:py-10">
        {/* Fila principal compacta */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          
          {/* Bloque Izquierdo: Marca + Slogan destacado */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start max-w-md"
          >
            <div className="flex items-center gap-3">
              <RouterLink to="/" className="inline-flex items-center transition-transform hover:scale-105 duration-300">
                <BrandLogo variant="green" size="sm" />
              </RouterLink>

              {/* Status pill animada */}
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 px-2.5 py-0.5 text-[11px] font-medium text-primary-300">
                <Sparkles className="h-3 w-3 animate-pulse" />
                <span>Academia Tecnológica</span>
              </div>
            </div>

            {/* Slogan con tipografía moderna y efecto glow */}
            <p className="mt-3 text-sm md:text-base font-medium text-white/90 leading-snug">
              Creando tu futuro,{' '}
              <span className="text-gradient drop-shadow-[0_0_8px_rgba(84,180,53,0.4)] font-semibold">
                una clase a la vez.
              </span>
            </p>
            <p className="mt-1 text-xs text-ink-gray-400">
              Robótica, programación, electrónica e IA para todas las edades.
            </p>
          </motion.div>

          {/* Bloque Central: Chips de contacto interactivos */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-2.5 text-xs"
          >
            <a
              href="mailto:info@stbacademy.net"
              className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-ink-gray-300 hover:border-primary-500/40 hover:bg-primary-500/10 hover:text-white hover:shadow-[0_0_15px_rgba(84,180,53,0.2)] transition-all duration-300"
            >
              <Mail className="h-3.5 w-3.5 text-primary-400 group-hover:scale-110 transition-transform" />
              <span>info@stbacademy.net</span>
            </a>

            <a
              href="https://www.google.com/maps/search/?api=1&query=CC+La+Redoma+de+los+Robles+Porlamar+Nueva+Esparta+Venezuela"
              target="_blank"
              rel="noreferrer"
              title="Abrir en Google Maps"
              className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2 text-ink-gray-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-white hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300"
            >
              <MapPin className="h-3.5 w-3.5 text-cyan-400 group-hover:scale-110 shrink-0 transition-transform" />
              <span className="truncate max-w-[240px] sm:max-w-none">
                CC La Redoma de los Robles, Local 50, Piso 2 — Porlamar, VE
              </span>
            </a>
          </motion.div>

          {/* Bloque Derecho: Redes Sociales con mayor protagonismo */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            {socials.map(({ icon: Icon, label, href, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ y: -5, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl border backdrop-blur-md transition-all duration-300 ${color}`}
              >
                <Icon className="h-5 w-5 transition-transform duration-300" />
              </motion.a>
            ))}
          </motion.div>

        </div>

        {/* Separador delgado & Sub-barra */}
        <div className="mt-8 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ink-gray-500">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()}{' '}
            <span className="text-white font-medium">STB Academy</span>. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-5">
            <a href="#" className="flex items-center gap-1 hover:text-primary-400 transition-colors">
              <Shield className="h-3 w-3" />
              Seguridad
            </a>
            <a href="#" className="flex items-center gap-1 hover:text-primary-400 transition-colors">
              <FileText className="h-3 w-3" />
              Términos
            </a>

            {/* Botón interactivo Scroll to top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Volver arriba"
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-ink-gray-400 hover:border-primary-500/40 hover:bg-primary-500/10 hover:text-primary-300 hover:shadow-[0_0_10px_rgba(84,180,53,0.2)] transition-all ml-1"
            >
              <ArrowUp className="h-3.5 w-3.5" />
              <span>Arriba</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}


