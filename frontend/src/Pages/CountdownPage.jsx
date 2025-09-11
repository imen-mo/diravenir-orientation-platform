import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaClock, 
  FaPlay, 
  FaPause, 
  FaStop, 
  FaRedo, 
  FaArrowLeft,
  FaBell,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaCog,
  FaVolumeUp,
  FaVolumeMute
} from 'react-icons/fa';
import './CountdownPage.css';

const CountdownPage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  // Pré-configurations de countdown populaires
  const presets = [
    {
      name: 'Fin d\'année académique',
      description: 'Fin des cours et début des vacances',
      days: 30,
      color: 'blue'
    },
    {
      name: 'Examen final',
      description: 'Préparation aux examens de fin de semestre',
      days: 7,
      color: 'red'
    },
    {
      name: 'Délai de candidature',
      description: 'Dernière date pour soumettre les candidatures',
      days: 14,
      color: 'orange'
    },
    {
      name: 'Voyage d\'études',
      description: 'Départ pour le voyage d\'études à l\'étranger',
      days: 60,
      color: 'green'
    }
  ];

  useEffect(() => {
    // Charger les données sauvegardées depuis localStorage
    const savedTargetDate = localStorage.getItem('countdownTargetDate');
    const savedTargetTime = localStorage.getItem('countdownTargetTime');
    const savedSoundEnabled = localStorage.getItem('countdownSoundEnabled');
    
    if (savedTargetDate) setTargetDate(savedTargetDate);
    if (savedTargetTime) setTargetTime(savedTargetTime);
    if (savedSoundEnabled !== null) setSoundEnabled(JSON.parse(savedSoundEnabled));

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  useEffect(() => {
    if (isRunning && !isPaused) {
      const id = setInterval(() => {
        calculateTimeLeft();
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, isPaused]);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const target = new Date(`${targetDate}T${targetTime}`).getTime();
    const difference = target - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      // Vérifier les notifications
      checkNotifications(days, hours, minutes);
    } else {
      // Le countdown est terminé
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setIsRunning(false);
      setIsPaused(false);
      
      if (soundEnabled) {
        playNotificationSound();
      }
      
      addNotification({
        type: 'success',
        message: '🎉 Le countdown est terminé !',
        timestamp: new Date()
      });
    }
  };

  const checkNotifications = (days, hours, minutes) => {
    const totalMinutes = days * 24 * 60 + hours * 60 + minutes;
    
    // Notifications à 1 heure, 30 minutes, 10 minutes, 1 minute
    const notificationTimes = [60, 30, 10, 1];
    
    notificationTimes.forEach(time => {
      if (totalMinutes === time && !notifications.find(n => n.time === time)) {
        addNotification({
          type: 'warning',
          message: `⏰ Plus que ${time} minute${time > 1 ? 's' : ''} !`,
          timestamp: new Date(),
          time: time
        });
        
        if (soundEnabled) {
          playNotificationSound();
        }
      }
    });
  };

  const playNotificationSound = () => {
    // Créer un son de notification simple
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev.slice(0, 9)]); // Garder seulement les 10 dernières
  };

  const handleStart = () => {
    if (!targetDate || !targetTime) {
      alert('Veuillez définir une date et une heure cible');
      return;
    }

    const target = new Date(`${targetDate}T${targetTime}`);
    if (target <= new Date()) {
      alert('La date cible doit être dans le futur');
      return;
    }

    setIsRunning(true);
    setIsPaused(false);
    calculateTimeLeft();
    
    addNotification({
      type: 'info',
      message: '🚀 Countdown démarré !',
      timestamp: new Date()
    });
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    addNotification({
      type: 'info',
      message: isPaused ? '▶️ Countdown repris' : '⏸️ Countdown en pause',
      timestamp: new Date()
    });
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    
    addNotification({
      type: 'info',
      message: '⏹️ Countdown arrêté',
      timestamp: new Date()
    });
  };

  const handleReset = () => {
    handleStop();
    setTargetDate('');
    setTargetTime('');
    setNotifications([]);
    localStorage.removeItem('countdownTargetDate');
    localStorage.removeItem('countdownTargetTime');
  };

  const handlePresetClick = (preset) => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + preset.days);
    
    const dateString = targetDate.toISOString().split('T')[0];
    const timeString = '23:59';
    
    setTargetDate(dateString);
    setTargetTime(timeString);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('countdownTargetDate', dateString);
    localStorage.setItem('countdownTargetTime', timeString);
    
    addNotification({
      type: 'info',
      message: `📅 Preset "${preset.name}" appliqué`,
      timestamp: new Date()
    });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    localStorage.setItem('countdownSoundEnabled', JSON.stringify(!soundEnabled));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  const getTotalTimeLeft = () => {
    return timeLeft.days * 24 * 60 * 60 + timeLeft.hours * 60 * 60 + timeLeft.minutes * 60 + timeLeft.seconds;
  };

  const getProgressPercentage = () => {
    if (!targetDate || !targetTime) return 0;
    
    const now = new Date().getTime();
    const target = new Date(`${targetDate}T${targetTime}`).getTime();
    const start = new Date().getTime();
    
    if (target <= start) return 100;
    
    const elapsed = now - start;
    const total = target - start;
    
    return Math.min((elapsed / total) * 100, 100);
  };

  return (
    <div className="countdown-page">
      {/* Header */}
      <header className="countdown-header">
        <div className="header-content">
          <button onClick={handleBackClick} className="back-btn">
            <FaArrowLeft />
            Retour
          </button>
          <div className="header-info">
            <h1>⏰ Countdown Timer</h1>
            <p>Créez et gérez vos countdowns personnalisés</p>
          </div>
          <div className="header-actions">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className={`settings-btn ${showSettings ? 'active' : ''}`}
            >
              <FaCog />
            </button>
            <button 
              onClick={toggleSound}
              className={`sound-btn ${soundEnabled ? 'enabled' : 'disabled'}`}
            >
              {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
            </button>
          </div>
        </div>
      </header>

      <div className="countdown-container">
        {/* Settings Panel */}
        {showSettings && (
          <div className="settings-panel">
            <h3>⚙️ Paramètres</h3>
            <div className="settings-content">
              <div className="setting-item">
                <label>
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={toggleSound}
                  />
                  Activer les sons de notification
                </label>
              </div>
              <div className="setting-item">
                <button onClick={clearNotifications} className="clear-btn">
                  Effacer les notifications
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Countdown Display */}
        <div className="countdown-display">
          <div className="countdown-circle">
            <div className="progress-ring">
              <svg className="progress-ring-svg" width="200" height="200">
                <circle
                  className="progress-ring-circle-bg"
                  stroke="#e0e0e0"
                  strokeWidth="8"
                  fill="transparent"
                  r="90"
                  cx="100"
                  cy="100"
                />
                <circle
                  className="progress-ring-circle"
                  stroke="#4CAF50"
                  strokeWidth="8"
                  fill="transparent"
                  r="90"
                  cx="100"
                  cy="100"
                  style={{
                    strokeDasharray: `${2 * Math.PI * 90}`,
                    strokeDashoffset: `${2 * Math.PI * 90 * (1 - getProgressPercentage() / 100)}`
                  }}
                />
              </svg>
              <div className="time-display">
                <div className="time-unit">
                  <span className="time-value">{formatTime(timeLeft.days)}</span>
                  <span className="time-label">Jours</span>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                  <span className="time-value">{formatTime(timeLeft.hours)}</span>
                  <span className="time-label">Heures</span>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                  <span className="time-value">{formatTime(timeLeft.minutes)}</span>
                  <span className="time-label">Minutes</span>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                  <span className="time-value">{formatTime(timeLeft.seconds)}</span>
                  <span className="time-label">Secondes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Target Date Display */}
          {targetDate && targetTime && (
            <div className="target-info">
              <h3>🎯 Cible:</h3>
              <p>{new Date(`${targetDate}T${targetTime}`).toLocaleString('fr-FR')}</p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="countdown-controls">
          <div className="date-time-inputs">
            <div className="input-group">
              <label>📅 Date cible:</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => {
                  setTargetDate(e.target.value);
                  localStorage.setItem('countdownTargetDate', e.target.value);
                }}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="input-group">
              <label>🕐 Heure cible:</label>
              <input
                type="time"
                value={targetTime}
                onChange={(e) => {
                  setTargetTime(e.target.value);
                  localStorage.setItem('countdownTargetTime', e.target.value);
                }}
              />
            </div>
          </div>

          <div className="control-buttons">
            {!isRunning ? (
              <button onClick={handleStart} className="control-btn start">
                <FaPlay />
                Démarrer
              </button>
            ) : (
              <>
                <button onClick={handlePause} className="control-btn pause">
                  {isPaused ? <FaPlay /> : <FaPause />}
                  {isPaused ? 'Reprendre' : 'Pause'}
                </button>
                <button onClick={handleStop} className="control-btn stop">
                  <FaStop />
                  Arrêter
                </button>
              </>
            )}
            <button onClick={handleReset} className="control-btn reset">
              <FaRedo />
              Reset
            </button>
          </div>
        </div>

        {/* Presets */}
        <div className="countdown-presets">
          <h3>🚀 Presets rapides</h3>
          <div className="presets-grid">
            {presets.map((preset, index) => (
              <button
                key={index}
                className={`preset-btn ${preset.color}`}
                onClick={() => handlePresetClick(preset)}
              >
                <div className="preset-icon">
                  <FaCalendarAlt />
                </div>
                <div className="preset-content">
                  <h4>{preset.name}</h4>
                  <p>{preset.description}</p>
                  <span className="preset-days">{preset.days} jours</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="notifications-panel">
            <div className="notifications-header">
              <h3>🔔 Notifications</h3>
              <button onClick={clearNotifications} className="clear-notifications-btn">
                Effacer tout
              </button>
            </div>
            <div className="notifications-list">
              {notifications.map((notification, index) => (
                <div key={index} className={`notification-item ${notification.type}`}>
                  <div className="notification-icon">
                    {notification.type === 'success' && <FaCheckCircle />}
                    {notification.type === 'warning' && <FaExclamationTriangle />}
                    {notification.type === 'info' && <FaInfoCircle />}
                  </div>
                  <div className="notification-content">
                    <p>{notification.message}</p>
                    <span className="notification-time">
                      {notification.timestamp.toLocaleTimeString('fr-FR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownPage;
