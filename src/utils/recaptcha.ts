/**
 * Utilidad para Google reCAPTCHA v3
 * En entorno local no ejecuta nada y devuelve string vacío (bypass automático).
 * En producción carga el SDK oficial de Google y genera el token de seguridad invisible.
 */

let scriptLoaded = false;

export async function getRecaptchaToken(action: string = 'submit'): Promise<string> {
  if (typeof window === 'undefined') {
    return '';
  }

  const recaptchaConfig = (window as any).STB_APP_CONFIG?.recaptcha;

  // Si está desactivado en local o no hay clave configurada, no hacer nada
  if (!recaptchaConfig?.enabled || !recaptchaConfig?.siteKey) {
    return '';
  }

  const siteKey = recaptchaConfig.siteKey;

  // Cargar el script de Google reCAPTCHA v3 sólo si está habilitado en producción
  if (!scriptLoaded) {
    await new Promise<void>((resolve) => {
      const existingScript = document.querySelector(`script[src*="recaptcha/api.js"]`);
      if (existingScript) {
        scriptLoaded = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        scriptLoaded = true;
        resolve();
      };
      script.onerror = () => {
        console.warn('No se pudo cargar el script de Google reCAPTCHA.');
        resolve();
      };
      document.head.appendChild(script);
    });
  }

  return new Promise((resolve) => {
    const grecaptcha = (window as any).grecaptcha;
    if (grecaptcha && grecaptcha.ready) {
      grecaptcha.ready(async () => {
        try {
          const token = await grecaptcha.execute(siteKey, { action });
          resolve(token || '');
        } catch (err) {
          console.warn('Error al ejecutar reCAPTCHA:', err);
          resolve('');
        }
      });
    } else {
      resolve('');
    }
  });
}
