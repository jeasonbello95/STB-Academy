import {
  Code2,
  Cpu,
  Brain,
  CircuitBoard,
  PenTool,
  Bot,
  type LucideIcon,
} from 'lucide-react';

export interface CourseModule {
  title: string;
  lessons: string[];
}

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
  rating?: number;
  studentsCount?: number;
  lessonsCount?: number;
  projectsCount?: number;
  skills?: string[];
  instructor?: {
    name: string;
    role: string;
    avatar: string;
  };
  syllabus?: CourseModule[];
  featured?: boolean;
}

export const courses: Course[] = [
  {
    id: 'robotica-arduino-stblock',
    title: 'Robótica y Automatización con STBlock & Arduino',
    description:
      'Aprende a construir y programar tus primeros robots desde cero usando bloques lógicos y microcontroladores Arduino.',
    price: '$25,00',
    tag: 'Ruta Estrella',
    image:
      'https://images.pexels.com/photos/8438996/pexels-photo-8438996.jpeg?auto=compress&cs=tinysrgb&w=940',
    icon: Bot,
    category: 'Robótica',
    duration: '6 semanas (36h)',
    level: 'Principiante',
    rating: 4.9,
    studentsCount: 420,
    lessonsCount: 24,
    projectsCount: 4,
    skills: ['Arduino Uno', 'STBlock', 'Servomotores', 'Sensores Ultrasonido', 'Lógica Algorítmica'],
    instructor: {
      name: 'Ing. Carlos Mendoza',
      role: 'Especialista en Robótica Educativa',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    syllabus: [
      {
        title: 'Módulo 1: Fundamentos de Robótica y Arquitectura Arduino',
        lessons: ['Introducción a la mecatrónica', 'Entorno STBlock y bloques visuales', 'Primer circuito: LEDs y salidas digitales'],
      },
      {
        title: 'Módulo 2: Sensores y Toma de Decisiones',
        lessons: ['Lectura analógica de sensores de luz y temperatura', 'Sensor ultrasónico para detección de obstáculos', 'Condicionales y bucles en tiempo real'],
      },
      {
        title: 'Módulo 3: Actuadores y Motores',
        lessons: ['Control de servomotores con PWM', 'Puente H y motores DC para tracción', 'Construcción del chasis del robot móvil'],
      },
      {
        title: 'Módulo 4: Proyecto Final y Certificación',
        lessons: ['Programación del robot seguidor de línea y evasor de obstáculos', 'Calibración y pruebas en pista', 'Defensa del proyecto y entrega de certificado'],
      },
    ],
    featured: true,
  },
  {
    id: 'ia-vision-computacional',
    title: 'Inteligencia Artificial y Visión Computacional',
    description:
      'Entrena modelos de Machine Learning y visión por computadora para dotar de visión inteligente y reconocimiento a robots.',
    price: '$35,00',
    tag: 'Nuevo 2026',
    image:
      'https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=940',
    icon: Brain,
    category: 'IA',
    duration: '8 semanas (48h)',
    level: 'Intermedio',
    rating: 4.95,
    studentsCount: 280,
    lessonsCount: 32,
    projectsCount: 5,
    skills: ['Python 3', 'OpenCV', 'YOLOv8', 'TensorFlow Lite', 'Edge AI'],
    instructor: {
      name: 'Dra. Elena Ramos',
      role: 'Investigadora en Inteligencia Artificial',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    },
    syllabus: [
      {
        title: 'Módulo 1: Fundamentos de Visión Artificial',
        lessons: ['Procesamiento digital de imágenes con Python', 'Filtros, umbralizado y detección de bordes con OpenCV', 'Detección de formas geométricas y colores'],
      },
      {
        title: 'Módulo 2: Redes Neuronales y Detección de Objetos',
        lessons: ['Introducción a redes convolucionales (CNN)', 'Entrenamiento de modelos con YOLOv8', 'Reconocimiento facial y de gestos en vivo'],
      },
      {
        title: 'Módulo 3: Despliegue en Hardware Embebido',
        lessons: ['Optimización con TensorFlow Lite', 'Integración con cámaras en Raspberry Pi y ESP32-CAM', 'Control de actuadores según detección visual'],
      },
    ],
    featured: true,
  },
  {
    id: 'electronica-microcontroladores-esp32',
    title: 'Electrónica Digital y Microcontroladores ESP32',
    description:
      'Aprende electrónica aplicada, diseño de circuitos en protoboard, comunicación WiFi/Bluetooth e IoT con el chip ESP32.',
    price: 'Gratis',
    tag: 'Acceso Libre',
    image:
      'https://images.pexels.com/photos/159220/printed-circuit-board-print-plate-via-macro-159220.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: CircuitBoard,
    category: 'Electrónica',
    duration: '5 semanas (25h)',
    level: 'Principiante',
    rating: 4.85,
    studentsCount: 950,
    lessonsCount: 18,
    projectsCount: 3,
    skills: ['ESP32', 'Ley de Ohm', 'I2C/SPI', 'MQTT', 'Dashboard Web IoT'],
    instructor: {
      name: 'Prof. Andrés Silva',
      role: 'Ingeniero Electrónico & Hardware Maker',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    syllabus: [
      {
        title: 'Módulo 1: Electrónica Básica para Makers',
        lessons: ['Voltaje, corriente y resistencia', 'Uso correcto del multímetro y protoboard', 'Lectura de diagramas esquemáticos'],
      },
      {
        title: 'Módulo 2: Programación del ESP32',
        lessons: ['Arquitectura de doble núcleo del ESP32', 'Pines GPIO, PWM y convertidores ADC/DAC', 'Conexión a redes WiFi locales'],
      },
      {
        title: 'Módulo 3: Proyecto Estación IoT en la Nube',
        lessons: ['Lectura de sensores ambientales DHT22/BMP280', 'Envío de telemetría por protocolo MQTT', 'Creación de un dashboard interactivo en tiempo real'],
      },
    ],
    featured: false,
  },
  {
    id: 'diseno-3d-cad-impresion',
    title: 'Diseño 3D, Modelado CAD e Impresión 3D',
    description:
      'Modela piezas mecánicas, carcasas personalizadas y ensambles funcionales listos para fabricación en impresoras 3D.',
    price: '$20,00',
    tag: 'Alta Demanda',
    image:
      'https://images.pexels.com/photos/3862601/pexels-photo-3862601.jpeg?auto=compress&cs=tinysrgb&w=940',
    icon: Cpu,
    category: 'Diseño',
    duration: '6 semanas (30h)',
    level: 'Principiante',
    rating: 4.88,
    studentsCount: 310,
    lessonsCount: 20,
    projectsCount: 4,
    skills: ['Autodesk Fusion 360', 'Slicers / Cura', 'Tolerancias Mecánicas', 'Filamentos PLA/PETG'],
    instructor: {
      name: 'Arq. Mariana Rojas',
      role: 'Diseñadora Industrial & Fabricación Digital',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
    syllabus: [
      {
        title: 'Módulo 1: Fundamentos de Modelado Paramétrico',
        lessons: ['Bocetado 2D con cotas y restricciones geométricas', 'Operaciones 3D: Extrusión, revolución y barrido', 'Diseño de piezas ergonómicas'],
      },
      {
        title: 'Módulo 2: Ensambles y Mecanismos Móviles',
        lessons: ['Diseño de engranajes y articulaciones', 'Tolerancias de ensamble por ajuste a presión (Snap-fit)', 'Renderizado fotorrealista de prototipos'],
      },
      {
        title: 'Módulo 3: Laminado y Fabricación Aditiva',
        lessons: ['Configuración de Cura y parámetros de impresión', 'Orientación, soportes y relleno de piezas', 'Mantenimiento y calibración de impresoras 3D'],
      },
    ],
    featured: false,
  },
  {
    id: 'python-programacion-avanzada',
    title: 'Programación en Python: De Cero a Sistemas Embebidos',
    description:
      'Domina el lenguaje más demandado del mundo: programación orientada a objetos, scripts de automatización y control de hardware.',
    price: '$28,00',
    tag: 'Certificación Profesional',
    image:
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=940',
    icon: Code2,
    category: 'Programación',
    duration: '7 semanas (42h)',
    level: 'Intermedio',
    rating: 4.92,
    studentsCount: 540,
    lessonsCount: 28,
    projectsCount: 4,
    skills: ['Python 3.12', 'POO', 'MicroPython', 'APIs REST', 'Asyncio'],
    instructor: {
      name: 'Lic. Javier Valera',
      role: 'Senior Software Engineer & Python Lead',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
    syllabus: [
      {
        title: 'Módulo 1: Lógica y Sintaxis Moderna en Python',
        lessons: ['Estructuras de datos avanzadas: Diccionarios, Sets y List Comprehensions', 'Funciones lambda, decoradores y manejo de excepciones', 'Programación Orientada a Objetos (POO)'],
      },
      {
        title: 'Módulo 2: Automatización y Consumo de APIs',
        lessons: ['Lectura y manipulación de archivos JSON/CSV', 'Conexión a servicios web con Requests y FastApi', 'Procesamiento de datos en segundo plano'],
      },
      {
        title: 'Módulo 3: MicroPython para Microcontroladores',
        lessons: ['Instalación de MicroPython en ESP32 y Raspberry Pi Pico', 'Control de puertos GPIO, hilos y timers', 'Creación de un servidor web embebido'],
      },
    ],
    featured: false,
  },
  {
    id: 'diseno-grafico-branding-digital',
    title: 'Diseño Gráfico, Branding y UI/UX',
    description:
      'Aprende composición visual, diseño de interfaces modernas, diseño vectorial y creación de marcas con impacto tecnológico.',
    price: '$18,00',
    tag: 'Popular',
    image:
      'https://images.pexels.com/photos/1714202/pexels-photo-1714202.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    icon: PenTool,
    category: 'Diseño',
    duration: '6 semanas (30h)',
    level: 'Principiante',
    rating: 4.82,
    studentsCount: 380,
    lessonsCount: 22,
    projectsCount: 3,
    skills: ['Figma', 'Vector Design', 'Teoría del Color', 'Design Systems', 'Tipografía'],
    instructor: {
      name: 'Lic. Andrea Gómez',
      role: 'Lead UI/UX Designer',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    },
    syllabus: [
      {
        title: 'Módulo 1: Fundamentos Visuales y Composición',
        lessons: ['Jerarquía visual y balance', 'Paletas de color y psicología cromática', 'Tipografías para pantallas digitales'],
      },
      {
        title: 'Módulo 2: Prototipado y Diseño de Interfaces en Figma',
        lessons: ['Auto Layout, Componentes y Variantes', 'Creación de Design Systems escalables', 'Prototipos interactivos con micro-animaciones'],
      },
      {
        title: 'Módulo 3: Proyecto de Branding Completo',
        lessons: ['Diseño del manual de identidad de marca', 'Exportación de activos para desarrollo web y móvil', 'Presentación profesional de portafolio'],
      },
    ],
    featured: false,
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
