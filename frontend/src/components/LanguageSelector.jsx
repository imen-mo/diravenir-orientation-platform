import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGlobe, FaChevronDown } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLanguage, changeLanguage } = useTheme();

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="language-selector">
      <motion.button
        className="language-selector-button"
        onClick={toggleDropdown}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <FaGlobe className="language-icon" />
        <span className="language-text">{currentLang?.flag} {currentLang?.name}</span>
        <FaChevronDown className={`chevron ${isOpen ? 'rotated' : ''}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="language-dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {languages.map((language) => (
              <motion.button
                key={language.code}
                className={`language-option ${currentLanguage === language.code ? 'active' : ''}`}
                onClick={() => handleLanguageChange(language.code)}
                whileHover={{ backgroundColor: 'var(--hover-bg)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <span className="language-flag">{language.flag}</span>
                <span className="language-name">{language.name}</span>
                {currentLanguage === language.code && (
                  <motion.div
                    className="active-indicator"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
