import { courses, type Course } from '@/data/content';

export async function fetchCourses(): Promise<Course[]> {
  return courses;
}

export async function fetchTopCourses(): Promise<Course[]> {
  return courses.slice(0, 3);
}
