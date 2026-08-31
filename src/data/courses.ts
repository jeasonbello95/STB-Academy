import { courses, type Course } from '@/data/content';
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

export async function fetchCourses(): Promise<Course[]> {
  if (typeof window !== 'undefined' && window.STB_APP_CONFIG?.stbApiUrl) {
    try {
      const response = await fetch(`${window.STB_APP_CONFIG.stbApiUrl}courses`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map((item: any) => ({
            ...item,
            icon: BookOpen,
          }));
        }
      }
    } catch (err) {
      console.warn('Error fetching courses from WordPress Tutor LMS, using default fallback:', err);
    }
  }
  return courses;
}

export async function fetchTopCourses(): Promise<Course[]> {
  const allCourses = await fetchCourses();
  return allCourses.slice(0, 3);
}
