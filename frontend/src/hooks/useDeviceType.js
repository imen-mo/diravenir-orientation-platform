import { useState, useEffect } from 'react';

// Hook pour détecter le type d'appareil
const useDeviceType = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  return { isMobile, isDesktop: !isMobile };
};

export default useDeviceType;
