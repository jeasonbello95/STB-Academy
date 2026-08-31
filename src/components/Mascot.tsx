import { motion, useReducedMotion } from 'framer-motion';

interface MascotProps {
  src: string;
  alt?: string;
  className?: string;
  float?: boolean;
  floatDuration?: number;
  glow?: boolean;
}

/**
 * Mascota STB Academy. Animada con framer-motion (flotación suave)
 * y con resplandor verde opcional. Solo usa imágenes PNG.
 */
export function Mascot({
  src,
  alt = 'Mascota STB Academy',
  className = '',
  float = true,
  floatDuration = 6,
  glow = false,
}: MascotProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.img
      src={src}
      alt={alt}
      animate={
        float && !reduceMotion
          ? { y: [-10, 10, -10] }
          : undefined
      }
      transition={
        float && !reduceMotion
          ? { duration: floatDuration, repeat: Infinity, ease: 'easeInOut' }
          : undefined
      }
      className={`object-contain select-none ${
        glow ? 'drop-shadow-[0_0_20px_rgba(84,180,53,0.35)]' : ''
      } ${className}`}
      draggable={false}
    />
  );
}

export default Mascot;
