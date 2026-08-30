interface BrandLogoProps {
  variant?: 'white' | 'green';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-14',
  xl: 'h-20',
};

const textSizeClasses = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
};

const srcByVariant = {
  white: '/imagenes/LOGO-STB-ACADEMY--BLANCO.png',
  green: '/imagenes/LOGO-STB-ACADEMY--BLANCO--VERDE.png',
};

/**
 * Logo de marca STB Academy con resplandor verde.
 * Usa los PNG reales servidos desde /imagenes/.
 */
export function BrandLogo({
  variant = 'white',
  size = 'sm',
  showText = false,
  className = '',
}: BrandLogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src={srcByVariant[variant]}
        alt="STB Academy"
        className={`${sizeClasses[size]} w-auto object-contain drop-shadow-[0_0_12px_rgba(84,180,53,0.45)]`}
      />
      {showText && (
        <span
          className={`font-display font-bold tracking-tight ${textSizeClasses[size]}`}
        >
          STB <span className="text-primary-500">Academy</span>
        </span>
      )}
    </span>
  );
}

export default BrandLogo;
