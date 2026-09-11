export type { Course } from '@/data/content';
export type CourseCategory = 'Programación' | 'Robótica' | 'IA' | 'Diseño' | 'Electrónica' | 'Hardware';

export interface CourseEvent {
  id: string;
  course_id?: string;
  title: string;
  date: string;
  description: string;
  location: string;
  days?: string;
  schedule?: string;
  price?: string;
  price_raw?: number;
  is_free?: boolean;
  image?: string;
  permalink?: string;
  tag?: string;
  duration?: string;
  level?: string;
  category?: string;
  instructor_name?: string;
}

