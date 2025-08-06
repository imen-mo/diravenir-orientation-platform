/**
 * Utilitaire pour gérer reCAPTCHA
 */

export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export const loadReCaptcha = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('reCAPTCHA chargé avec succès');
      resolve();
    };
    script.onerror = (error) => {
      console.error('Erreur lors du chargement de reCAPTCHA:', error);
      resolve(); // On résout quand même pour ne pas bloquer l'application
    };
    document.head.appendChild(script);
  });
};

export const getReCaptchaToken = async (action = 'submit') => {
  if (!window.grecaptcha) {
    console.warn('reCAPTCHA non chargé');
    return null;
  }
  
  try {
    const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
    return token;
  } catch (error) {
    console.error('Erreur lors de la génération du token reCAPTCHA:', error);
    return null;
  }
};
