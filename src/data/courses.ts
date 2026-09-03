import { courses as defaultCourses, type Course } from '@/data/content';
import { BookOpen } from 'lucide-react';

interface StbAppConfig {
  restUrl?: string;
  stbApiUrl?: string;
  tutorApiUrl?: string;
  nonce?: string;
  siteUrl?: string;
  isUserLoggedIn?: boolean;
}

declare global {
  interface Window {
    STB_APP_CONFIG?: StbAppConfig;
  }
}

export interface DynamicCourse extends Course {
  slug?: string;
  price_raw?: number;
  is_free?: boolean;
  lesson_count?: number;
  total_enrolled?: number;
  instructor_name?: string;
  instructor_avatar?: string;
  rating_avg?: number;
  rating_count?: number;
  permalink?: string;
  categories?: string[];
}

export async function fetchCourses(): Promise<DynamicCourse[]> {
  const apiUrl = (typeof window !== 'undefined' && window.STB_APP_CONFIG?.stbApiUrl) || '/wp-json/stb/v1/';
  try {
    const response = await fetch(`${apiUrl}courses`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        return data.map((item: any) => ({
          id: String(item.id),
          title: item.title,
          slug: item.slug || String(item.id),
          description: item.description || '',
          price: item.price || 'Gratis',
          price_raw: item.price_raw || 0,
          is_free: Boolean(item.is_free),
          tag: item.tag || 'Tutor LMS',
          image: item.image || 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
          category: item.category || 'General',
          categories: Array.isArray(item.categories) ? item.categories : [item.category || 'General'],
          duration: item.duration || 'A tu propio ritmo',
          level: item.level || 'Todos los niveles',
          lesson_count: item.lesson_count || 0,
          total_enrolled: item.total_enrolled || 0,
          instructor_name: item.instructor_name || 'STB Academy',
          instructor_avatar: item.instructor_avatar || '',
          rating_avg: item.rating_avg || 5.0,
          rating_count: item.rating_count || 0,
          permalink: item.permalink || `/courses/${item.slug || item.id}`,
          icon: BookOpen,
        }));
      }
    }
  } catch (err) {
    console.warn('Error fetching courses from WordPress Tutor LMS, using default fallback:', err);
  }
  return defaultCourses;
}

export async function fetchTopCourses(): Promise<DynamicCourse[]> {
  const allCourses = await fetchCourses();
  return allCourses.slice(0, 3);
}
