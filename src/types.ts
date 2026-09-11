export type { Course } from '@/data/content';
export type CourseCategory = 'Programación' | 'Robótica' | 'IA' | 'Diseño' | 'Electrónica' | 'Hardware';

export interface CourseSubscriptionDetails {
  has_subscription: boolean;
  plan_name?: string;
  price: string;
  price_raw?: number;
  installments: number; // e.g. 3 cuotas, 0 if ongoing
  interval: string; // e.g. 'mes', 'semana', 'quincena', 'año'
  interval_count?: number;
  sign_up_fee?: string | null;
  sign_up_fee_raw?: number;
  summary: string; // e.g. '3 cuotas de $35,00 / mes'
  cuotas_text: string; // e.g. '3 cuotas mensuales de $35,00'
  total_subscription_price?: string | null;
}

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
  has_subscription?: boolean;
  subscription_details?: CourseSubscriptionDetails | null;
}

