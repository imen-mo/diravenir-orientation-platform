import React, { useState, useEffect } from 'react';
import ModernDatePicker from './ModernDatePicker';
import ModernCountrySelector from './ModernCountrySelector';
import './ModernFormField.css';

const ModernFormField = ({
  field,
  value,
  onChange,
  onBlur,
  error,
  touched,
  className = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [localError, setLocalError] = useState(null);

  // Validation en temps réel
  useEffect(() => {
    if (value && field.validation) {
      const validationError = validateField(field, value);
      setLocalError(validationError);
    } else {
      setLocalError(null);
    }
  }, [value, field]);

  const validateField = (fieldConfig, value) => {
    if (!fieldConfig.validation) return null;

    const { validation } = fieldConfig;

    // Validation requise
    if (fieldConfig.required && (!value || value.toString().trim() === '')) {
      return fieldConfig.validation.message || 'Ce champ est obligatoire';
    }

    // Validation de longueur minimale
    if (validation.minLength && value && value.toString().length < validation.minLength) {
      return `Minimum ${validation.minLength} caractères requis`;
    }

    // Validation de longueur maximale
    if (validation.maxLength && value && value.toString().length > validation.maxLength) {
      return `Maximum ${validation.maxLength} caractères autorisés`;
    }

    // Validation de pattern
    if (validation.pattern && value && !validation.pattern.test(value)) {
      return validation.message || 'Format invalide';
    }

    // Validation d'âge minimum
    if (validation.minAge && value) {
      const age = calculateAge(value);
      if (age < validation.minAge) {
        return `Âge minimum: ${validation.minAge} ans`;
      }
    }

    // Validation d'âge maximum
    if (validation.maxAge && value) {
      const age = calculateAge(value);
      if (age > validation.maxAge) {
        return `Âge maximum: ${validation.maxAge} ans`;
      }
    }

    // Validation d'expiration de passeport
    if (validation.minMonthsFromNow && value) {
      const today = new Date();
      const expiry = new Date(value);
      const sixMonthsFromNow = new Date();
      sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + validation.minMonthsFromNow);
      
      if (expiry <= sixMonthsFromNow) {
        return `Passeport doit être valide au moins ${validation.minMonthsFromNow} mois`;
      }
    }

    return null;
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleChange = (newValue) => {
    onChange(newValue);
    if (onBlur) {
      onBlur();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) {
      onBlur();
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const renderField = () => {
    const fieldProps = {
      value,
      onChange: handleChange,
      onBlur: handleBlur,
      onFocus: handleFocus,
      placeholder: field.placeholder,
      disabled: props.disabled,
      className: `modern-field-input ${isFocused ? 'focused' : ''} ${error || localError ? 'error' : ''}`,
      ...props
    };

    switch (field.type) {
      case 'email':
        return (
          <input
            type="email"
            {...fieldProps}
          />
        );

      case 'tel':
        return (
          <input
            type="tel"
            {...fieldProps}
          />
        );

      case 'text':
        return (
          <input
            type="text"
            {...fieldProps}
          />
        );

      case 'textarea':
        return (
          <textarea
            {...fieldProps}
            rows={4}
          />
        );

      case 'date':
        return (
          <ModernDatePicker
            selected={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            minDate={props.minDate}
            maxDate={props.maxDate}
            disabled={props.disabled}
            error={error || localError}
            required={field.required}
          />
        );

      case 'select':
        return (
          <select {...fieldProps}>
            <option value="">{field.placeholder || 'Sélectionner...'}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'country-selector':
        return (
          <ModernCountrySelector
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={props.disabled ? 'disabled' : ''}
          />
        );

      case 'checkbox':
        return (
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handleChange(e.target.checked)}
              disabled={props.disabled}
              className="modern-checkbox"
            />
            <span className="checkmark"></span>
            <span className="checkbox-label">{field.label}</span>
          </label>
        );

      case 'file':
        return (
          <div className="file-upload-container">
            <input
              type="file"
              onChange={(e) => handleChange(e.target.files[0])}
              accept={field.acceptedTypes?.join(',')}
              disabled={props.disabled}
              className="file-input"
            />
            <div className="file-upload-content">
              <span className="file-icon">📁</span>
              <span className="file-text">
                {value ? value.name : field.placeholder || 'Choisir un fichier'}
              </span>
            </div>
            {field.acceptedTypes && (
              <div className="file-types">
                Types acceptés: {field.acceptedTypes.join(', ')}
              </div>
            )}
          </div>
        );

      default:
        return (
          <input
            type="text"
            {...fieldProps}
          />
        );
    }
  };

  const hasError = error || localError;
  const showError = hasError && (touched || isFocused);

  return (
    <div className={`modern-form-field ${className} ${showError ? 'has-error' : ''} ${isFocused ? 'focused' : ''}`}>
      <div className="field-header">
        <label className="field-label">
          {field.label}
          {field.required && <span className="required-indicator">*</span>}
        </label>
        {field.validation?.message && (
          <span className="field-hint">{field.validation.message}</span>
        )}
      </div>

      <div className="field-input-container">
        {renderField()}
        
        {field.type !== 'checkbox' && field.type !== 'file' && (
          <div className="field-icon">
            {field.type === 'email' && '📧'}
            {field.type === 'tel' && '📞'}
            {field.type === 'text' && '✏️'}
            {field.type === 'textarea' && '📝'}
            {field.type === 'select' && '▼'}
          </div>
        )}
      </div>

      {showError && (
        <div className="field-error">
          <span className="error-icon">⚠️</span>
          <span className="error-text">{hasError}</span>
        </div>
      )}

      {field.type === 'file' && value && (
        <div className="file-preview">
          <span className="file-name">{value.name}</span>
          <span className="file-size">({(value.size / 1024 / 1024).toFixed(2)} MB)</span>
        </div>
      )}
    </div>
  );
};

export default ModernFormField;
