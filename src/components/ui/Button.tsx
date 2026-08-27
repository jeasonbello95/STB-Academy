import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { RouterLink } from '@/components/RouterLink';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'glow';
  size?: 'lg' | 'xl';
  children: ReactNode;
}

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-500',
  secondary: 'border border-white/10 bg-ink-900 text-white hover:border-primary-500/40',
  outline: 'border border-white/20 text-white hover:border-primary-400 hover:text-primary-300',
  glow: 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 hover:bg-primary-400',
};

export function Button({ to, href, variant = 'primary', size = 'lg', className = '', children, ...props }: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-6 font-semibold transition-all duration-300 ${size === 'xl' ? 'py-4 text-lg' : 'py-3'} ${variants[variant]} ${className}`;

  if (to) return <RouterLink to={to} className={classes}>{children}</RouterLink>;
  if (href) return <a href={href} className={classes}>{children}</a>;
  return <button className={classes} {...props}>{children}</button>;
}
