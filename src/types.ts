export type { Course } from '@/data/content';
export type CourseCategory = 'Programación' | 'Robótica' | 'IA' | 'Diseño' | 'Electrónica' | 'Hardware';

export interface CourseEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
}
