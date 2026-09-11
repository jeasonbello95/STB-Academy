import type { CourseEvent } from '@/types';

export async function fetchEvents(): Promise<CourseEvent[]> {
  const apiUrl = (typeof window !== 'undefined' && window.STB_APP_CONFIG?.stbApiUrl) || '/wp-json/stb/v1/';
  
  // 1. Intentar endpoint dedicado /events (cursos con etiqueta 'presencial')
  try {
    const response = await fetch(`${apiUrl}events`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        return data.map((item: any) => ({
          id: String(item.id),
          course_id: String(item.course_id || item.id),
          title: item.title,
          date: item.date || item.event_date || new Date().toISOString().slice(0, 10),
          description: item.description || '',
          location: item.location || 'CC La Redoma de los Robles, Local 50 — Porlamar, Nueva Esparta',
          days: item.days || '',
          schedule: item.schedule || '',
          price: item.price || 'Gratis',
          price_raw: typeof item.price_raw === 'number' ? item.price_raw : 0,
          is_free: item.is_free !== undefined ? Boolean(item.is_free) : item.price === 'Gratis',
          image: item.image || 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80',
          permalink: item.permalink || `/courses/${item.slug || item.id}`,
          tag: 'Presencial',
          duration: item.schedule || item.duration || 'Presencial',
          level: item.level || 'Todos los niveles',
          category: item.category || 'Trading Presencial',
          instructor_name: item.instructor_name || 'STB Academy Master',
          has_subscription: Boolean(item.has_subscription),
          subscription_details: item.subscription_details || null,
        }));
      }
    }
  } catch (err) {
    console.warn('Error fetching /events from WordPress:', err);
  }

  // 2. Fallback: consultar /courses y filtrar únicamente cursos con etiqueta 'presencial'
  try {
    const response = await fetch(`${apiUrl}courses`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (response.ok) {
      const courses = await response.json();
      if (Array.isArray(courses)) {
        const presenciales = courses.filter((c: any) =>
          c.is_presencial ||
          (c.tag && c.tag.toLowerCase() === 'presencial') ||
          (Array.isArray(c.tags) && c.tags.some((t: string) => t.toLowerCase() === 'presencial'))
        );

        if (presenciales.length > 0) {
          return presenciales.map((item: any) => ({
            id: String(item.id),
            course_id: String(item.id),
            title: item.title,
            date: item.event_date || item.date || new Date().toISOString().slice(0, 10),
            description: item.description || '',
            location: item.location || 'CC La Redoma de los Robles, Local 50 — Porlamar, Nueva Esparta',
            days: item.days || '',
            schedule: item.schedule || '',
            price: item.price || 'Gratis',
            price_raw: typeof item.price_raw === 'number' ? item.price_raw : 0,
            is_free: item.is_free !== undefined ? Boolean(item.is_free) : item.price === 'Gratis',
            image: item.image || 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=1200&q=80',
            permalink: item.permalink || `/courses/${item.slug || item.id}`,
            tag: 'Presencial',
            duration: item.schedule || item.duration || 'Presencial',
            level: item.level || 'Todos los niveles',
            category: item.category || 'Trading Presencial',
            instructor_name: item.instructor_name || 'STB Academy Master',
            has_subscription: Boolean(item.has_subscription),
            subscription_details: item.subscription_details || null,
          }));
        }
      }
    }
  } catch (err) {
    console.warn('Error fetching courses fallback for events:', err);
  }

  return [];
}
