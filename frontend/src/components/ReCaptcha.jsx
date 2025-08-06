import React, { useEffect, useRef } from 'react';

const ReCaptcha = ({ onVerify, siteKey = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" }) => {
  const recaptchaRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    // Charger le script reCAPTCHA
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      // Initialiser reCAPTCHA
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          console.log('reCAPTCHA chargé avec succès');
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      // Nettoyer le script lors du démontage
      const existingScript = document.querySelector(`script[src*="recaptcha"]`);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [siteKey]);

  const executeRecaptcha = async () => {
    try {
      if (window.grecaptcha) {
        const token = await window.grecaptcha.execute(siteKey, { action: 'submit' });
        onVerify(token);
        return token;
      } else {
        console.error('reCAPTCHA non disponible');
        return null;
      }
    } catch (error) {
      console.error('Erreur reCAPTCHA:', error);
      return null;
    }
  };

  return (
    <div className="recaptcha-container">
      <div 
        ref={recaptchaRef}
        className="g-recaptcha" 
        data-sitekey={siteKey}
        data-callback="onRecaptchaSuccess"
        data-size="invisible"
      />
      <button 
        type="button" 
        onClick={executeRecaptcha}
        className="recaptcha-button"
        style={{
          background: '#4285f4',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Vérifier reCAPTCHA
      </button>
    </div>
  );
};

export default ReCaptcha; 