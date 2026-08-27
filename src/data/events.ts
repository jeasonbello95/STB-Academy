import type { CourseEvent } from '@/types';

const events: CourseEvent[] = [
  {
    id: 'workshop-robotica',
    title: 'Taller de Robótica Educativa',
    date: '2026-09-12',
    description: 'Construye y programa tu primer prototipo con sensores y motores.',
    location: 'CC La Redoma de los Robles, Porlamar',
  },
  {
    id: 'bootcamp-ia',
    title: 'Bootcamp de Inteligencia Artificial',
    date: '2026-10-10',
    description: 'Explora modelos de IA y crea una aplicación práctica desde cero.',
    location: 'CC La Redoma de los Robles, Porlamar',
  },
];

export async function fetchEvents(): Promise<CourseEvent[]> {
  return events;
}
