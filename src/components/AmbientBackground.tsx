import { motion, useReducedMotion } from 'framer-motion';

/**
 * Fondo global fijo para toda la app STB Academy.
 * Negro profundo con tinte verde/azul, blobs animados,
 * cuadrícula técnica y scanline de luz.
 */
export function AmbientBackground() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-deep-950">
      {/* Base: gradientes radiales verde + azul */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at top left, rgba(20,83,45,.35), transparent 55%), radial-gradient(ellipse at bottom right, rgba(15,52,96,.4), transparent 55%)',
        }}
      />

      {/* Blob verde */}
      <motion.div
        aria-hidden
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 60, -40, 0], y: [0, -50, 40, 0] }
        }
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-15%] left-[-10%] h-[560px] w-[560px] rounded-full bg-primary-500/25 blur-[130px]"
      />

      {/* Blob azul */}
      <motion.div
        aria-hidden
        animate={
          reduceMotion
            ? undefined
            : { x: [0, -70, 50, 0], y: [0, 60, -40, 0] }
        }
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[-20%] right-[-12%] h-[640px] w-[640px] rounded-full bg-navy-800/70 blur-[150px]"
      />

      {/* Blob cian (acento tecnológico) */}
      <motion.div
        aria-hidden
        animate={
          reduceMotion
            ? undefined
            : { x: [0, 40, -60, 0], y: [0, -60, 30, 0] }
        }
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[40%] left-[55%] h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-[130px]"
      />

      {/* Cuadrícula técnica con máscara radial */}
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid"
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Scanline: banda de luz que recorre la pantalla */}
      {!reduceMotion && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 animate-scan bg-[linear-gradient(to_bottom,transparent,transparent_45%,rgba(111,204,75,0.25)_50%,rgba(0,229,255,0.15)_53%,transparent_58%)]" />
        </div>
      )}

      {/* Vignette sutil para profundidad */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}

export default AmbientBackground;
