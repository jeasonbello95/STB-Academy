import { useState, useEffect } from 'react';

/**
 * Comprueba si el usuario actual tiene permisos de Administrador en STB Academy
 * analizando STB_APP_CONFIG, la respuesta de /wp-json/stb/v1/header y la barra de administración de WordPress.
 */
export function checkIsAdmin(): boolean {
  if (typeof window === 'undefined') return false;

  const config = (window as any)?.STB_APP_CONFIG;
  if (config?.isAdmin === true) return true;
  if (config?.headerData?.auth?.isAdmin === true) return true;
  if (config?.currentUser?.isAdmin === true) return true;

  if (typeof document !== 'undefined') {
    if (document.getElementById('wpadminbar') || document.body.classList.contains('admin-bar')) {
      return true;
    }
  }

  return false;
}

/**
 * Hook reactivo para verificar rol de administrador
 */
export function useIsAdmin(): boolean {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => checkIsAdmin());

  useEffect(() => {
    const update = () => setIsAdmin(checkIsAdmin());
    update();

    const timer = setTimeout(update, 200);

    const stbApiUrl = (window as any)?.STB_APP_CONFIG?.stbApiUrl;
    if (stbApiUrl && !(window as any)?.STB_APP_CONFIG?.headerData) {
      fetch(`${stbApiUrl}header`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.auth?.isAdmin) {
            setIsAdmin(true);
          }
        })
        .catch(() => {});
    }

    return () => clearTimeout(timer);
  }, []);

  return isAdmin;
}
