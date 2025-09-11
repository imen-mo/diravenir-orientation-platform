import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrientationHeader from '../components/OrientationHeader';
import './OrientationCountdown.css';

const OrientationCountdown = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowMessage(true);
      setTimeout(() => {
        navigate('/orientation/question/1');
      }, 2000);
    }
  }, [countdown, navigate]);

  return (
    <div className="orientation-countdown">
      <OrientationHeader />
      <div className="countdown-container">
        <div className="countdown-content">
          {countdown > 0 ? (
            <>
              <h1 className="countdown-title">
                Préparez-vous !
              </h1>
              <div className="countdown-number">
                {countdown}
              </div>
              <p className="countdown-subtitle">
                Le test commence dans...
              </p>
            </>
          ) : (
            <>
              <h1 className="countdown-title">
                C'est parti ! 🚀
              </h1>
              <div className="countdown-success">
                <div className="success-icon">✓</div>
              </div>
              <p className="countdown-subtitle">
                Redirection vers le test...
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrientationCountdown;
