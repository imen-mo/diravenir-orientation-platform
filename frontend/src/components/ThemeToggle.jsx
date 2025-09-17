import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext.jsx';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
      onClick={toggleTheme}
      title={isDarkMode ? 'Passer au mode clair' : 'Passer au mode sombre'}
    >
      <div className="toggle-icon">
        {isDarkMode ? <FaSun /> : <FaMoon />}
      </div>
      <span className="toggle-text">
        {isDarkMode ? 'Mode clair' : 'Mode sombre'}
      </span>
    </button>
  );
};

export default ThemeToggle;
