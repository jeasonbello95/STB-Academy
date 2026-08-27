interface AnimatedCounterProps {
  target: number;
  suffix?: string;
}

export function AnimatedCounter({ target, suffix = '' }: AnimatedCounterProps) {
  return <>{target.toLocaleString('es-ES')}{suffix}</>;
}
