import { motion } from 'framer-motion';
import {
  Cpu,
  Mail,
  Phone,
  Clock,
  MapPin,
  Shield,
  FileText,
} from 'lucide-react';
import { navLinks } from '@/data/content';

export default function Footer() {
  return (
    <footer id="ubicacion" className="relative bg-ink-gray-950 border-t border-white/5">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-green/50 to-transparent" />

      <div className="container-max section-padding py-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 — Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-7 h-7 text-neon-green" strokeWidth={2.5} />
              <span className="font-display text-lg font-bold">
                STB <span className="text-neon-green">Academy</span>
              </span>
            </div>
            <p className="text-sm text-ink-gray-400 leading-relaxed max-w-xs">
              Educación tecnológica de vanguardia para transformar tu futuro
              profesional.
            </p>
          </motion.div>

          {/* Column 2 — Explora */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-display font-semibold text-white mb-4">
              Explora
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-ink-gray-400 hover:text-neon-green transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-display font-semibold text-white mb-4">
              Contacto
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-neon-green mt-0.5 shrink-0" />
                <a
                  href="mailto:info@stbacademy.net"
                  className="text-sm text-ink-gray-400 hover:text-white transition-colors"
                >
                  info@stbacademy.net
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-neon-green mt-0.5 shrink-0" />
                <span className="text-sm text-ink-gray-400">
                  +58 412-1421335
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-neon-green mt-0.5 shrink-0" />
                <span className="text-sm text-ink-gray-400">
                  Lun - Vie: 8AM - 8PM
                </span>
              </li>
            </ul>
          </motion.div>

          {/* Column 4 — Ubicación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="font-display font-semibold text-white mb-4">
              Ubicación
            </h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-neon-green mt-0.5 shrink-0" />
              <p className="text-sm text-ink-gray-400 leading-relaxed">
                CC La Redoma de Los Robles, local 50, Porlamar, Edo. Nueva
                Esparta, Venezuela.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ink-gray-500">
            © {new Date().getFullYear()} STB Academy. Todos los derechos
            reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="flex items-center gap-1.5 text-xs text-ink-gray-500 hover:text-neon-green transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              Política de Seguridad
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 text-xs text-ink-gray-500 hover:text-neon-green transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              Términos y Condiciones
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
