import {
  Code2,
  Cpu,
  Brain,
  CircuitBoard,
  PenTool,
  Bot,
  type LucideIcon,
} from 'lucide-react';

export interface Course {
  id: string;
  title: string;
  description: string;
  price: string;
  tag: string;
  image: string;
  icon: LucideIcon;
  category: string;
  duration: string;
  level: string;
}

export const courses: Course[] = [
  {
    id: 'graphic-design-1',
    title: 'Diseño Gráfico',
    description:
      'Domina los fundamentos del diseño visual, tipografía y composición digital con herramientas profesionales de la industria.',
    price: '$0,50',
    tag: 'Nuevo Curso',
    image:
      'https://images.pexels.com/photos/1714202/pexels-photo-1714202.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: PenTool,
    category: 'Diseño',
    duration: '8 semanas',
    level: 'Principiante',
  },
  {
    id: 'electronics',
    title: 'Electrónica',
    description:
      'Aprende los principios de la electrónica analógica y digital, desde componentes básicos hasta el diseño de circuitos.',
    price: 'Gratis',
    tag: 'Nuevo Curso',
    image:
      'https://images.pexels.com/photos/159220/printed-circuit-board-print-plate-via-macro-159220.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: CircuitBoard,
    category: 'Hardware',
    duration: '10 semanas',
    level: 'Principiante',
  },
  {
    id: 'graphic-design-2',
    title: 'Diseño Gráfico Avanzado',
    description:
      'Lleva tus habilidades al siguiente nivel con técnicas avanzadas de branding, ilustración y motion graphics.',
    price: '$0,50',
    tag: 'Nuevo Curso',
    image:
      'https://images.pexels.com/photos/17279852/pexels-photo-17279852.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: PenTool,
    category: 'Diseño',
    duration: '12 semanas',
    level: 'Intermedio',
  },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 1000, suffix: '+', label: 'Estudiantes' },
  { value: 50, suffix: '+', label: 'Cursos Activos' },
  { value: 98, suffix: '%', label: 'Tasa de Éxito' },
  { value: 24, suffix: '/7', label: 'Comunidad' },
];

export interface Pillar {
  icon: LucideIcon;
  label: string;
  description: string;
}

export const pillars: Pillar[] = [
  {
    icon: Code2,
    label: 'Práctica',
    description: 'Aprende construyendo proyectos reales',
  },
  {
    icon: Cpu,
    label: 'Desarrollo',
    description: 'Tecnologías de vanguardia en cada clase',
  },
  {
    icon: Brain,
    label: 'Certificación',
    description: 'Constancia de habilidades reconocida',
  },
];

export interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: LucideIcon;
}

export const slides: CarouselSlide[] = [
  {
    id: 'slide-1',
    title: 'La academia del futuro',
    subtitle: 'Transforma tu potencial técnico',
    description:
      'Aprende programación, robótica e inteligencia artificial con proyectos reales. Únete a la comunidad de creadores tecnológicos más innovadora.',
    image:
      'https://images.pexels.com/photos/33433724/pexels-photo-33433724.jpeg?auto=compress&cs=tinysrgb&w=1920',
    icon: Code2,
  },
  {
    id: 'slide-2',
    title: 'Robótica e IA',
    subtitle: 'Construye el futuro con tus manos',
    description:
      'Desde circuitos básicos hasta sistemas autónomos con inteligencia artificial. Convierte ideas en máquinas que piensan.',
    image:
      'https://images.pexels.com/photos/8438996/pexels-photo-8438996.jpeg?auto=compress&cs=tinysrgb&w=1920',
    icon: Bot,
  },
  {
    id: 'slide-3',
    title: 'Programación Real',
    subtitle: 'Escribe código que importa',
    description:
      'Full-stack, móvil, IA. Domina las tecnologías que las empresas buscan hoy con un enfoque 100% práctico.',
    image:
      'https://images.pexels.com/photos/6424583/pexels-photo-6424583.jpeg?auto=compress&cs=tinysrgb&w=1920',
    icon: Brain,
  },
];

export const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Cursos', href: '/cursos' },
  { label: 'Eventos', href: '/eventos' },
  { label: 'STBlock', href: '/stblock' },
];
