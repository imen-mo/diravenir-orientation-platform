// Service de validation côté client pour assurer la cohérence avec le backend
export const clientValidation = {
  /**
   * Valide l'âge minimum (15 ans)
   * @param {string|Date} dateOfBirth - Date de naissance
   * @returns {boolean} - True si l'âge est valide
   */
  validateAge: (dateOfBirth) => {
    if (!dateOfBirth) return false;
    
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    
    // Vérifier que la date n'est pas dans le futur
    if (birthDate > today) return false;
    
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    // Ajuster l'âge si l'anniversaire n'est pas encore passé cette année
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age >= 15;
  },
  
  /**
   * Valide le format du numéro de passeport
   * @param {string} passportNumber - Numéro de passeport
   * @returns {boolean} - True si le format est valide
   */
  validatePassport: (passportNumber) => {
    if (!passportNumber) return false;
    const passportRegex = /^[A-Z0-9]{6,15}$/;
    return passportRegex.test(passportNumber.toUpperCase());
  },
  
  /**
   * Valide le format du numéro de téléphone marocain
   * @param {string} phone - Numéro de téléphone
   * @returns {boolean} - True si le format est valide
   */
  validatePhone: (phone) => {
    if (!phone) return false;
    const phoneRegex = /^\+212[0-9]{9}$/;
    return phoneRegex.test(phone);
  },
  
  /**
   * Valide le format de l'email
   * @param {string} email - Adresse email
   * @returns {boolean} - True si le format est valide
   */
  validateEmail: (email) => {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  /**
   * Valide la date d'expiration du passeport (minimum 6 mois)
   * @param {string|Date} passportExpiry - Date d'expiration
   * @returns {boolean} - True si la date est valide
   */
  validatePassportExpiry: (passportExpiry) => {
    if (!passportExpiry) return false;
    
    const expiryDate = new Date(passportExpiry);
    const today = new Date();
    const minValidDate = new Date();
    minValidDate.setMonth(today.getMonth() + 6); // 6 mois minimum
    
    return expiryDate > minValidDate;
  },
  
  /**
   * Valide la longueur d'un nom (2-50 caractères)
   * @param {string} name - Nom à valider
   * @returns {boolean} - True si la longueur est valide
   */
  validateName: (name) => {
    if (!name) return false;
    const trimmedName = name.trim();
    return trimmedName.length >= 2 && trimmedName.length <= 50;
  }
};

// Messages d'erreur contextuels en français
export const errorMessages = {
  dateOfBirth: {
    required: "La date de naissance est obligatoire",
    invalid: "Vous devez avoir au moins 15 ans pour postuler",
    future: "La date de naissance ne peut pas être dans le futur",
    format: "Format de date invalide"
  },
  passportNumber: {
    required: "Le numéro de passeport est obligatoire",
    invalid: "Format invalide. Utilisez 6-15 caractères alphanumériques en majuscules",
    tooShort: "Le numéro de passeport doit contenir au moins 6 caractères",
    tooLong: "Le numéro de passeport ne peut pas dépasser 15 caractères"
  },
  passportExpiry: {
    required: "La date d'expiration du passeport est obligatoire",
    invalid: "Le passeport doit être valide au moins 6 mois après la date de candidature",
    past: "La date d'expiration ne peut pas être dans le passé"
  },
  phone: {
    required: "Le numéro de téléphone est obligatoire",
    invalid: "Format invalide. Utilisez le format: +212XXXXXXXXX",
    countryCode: "Le numéro doit commencer par +212 (Maroc)"
  },
  email: {
    required: "L'adresse email est obligatoire",
    invalid: "Format d'email invalide",
    format: "Veuillez entrer une adresse email valide"
  },
  firstName: {
    required: "Le prénom est obligatoire",
    invalid: "Le prénom doit contenir entre 2 et 50 caractères",
    tooShort: "Le prénom doit contenir au moins 2 caractères",
    tooLong: "Le prénom ne peut pas dépasser 50 caractères"
  },
  lastName: {
    required: "Le nom est obligatoire",
    invalid: "Le nom doit contenir entre 2 et 50 caractères",
    tooShort: "Le nom doit contenir au moins 2 caractères",
    tooLong: "Le nom ne peut pas dépasser 50 caractères"
  }
};

// Fonction utilitaire pour obtenir le message d'erreur approprié
export const getErrorMessage = (fieldName, value, validationType = 'invalid') => {
  const fieldMessages = errorMessages[fieldName];
  if (!fieldMessages) return "Champ invalide";
  
  // Si le champ est vide, retourner le message "required"
  if (!value || value.trim() === '') {
    return fieldMessages.required || fieldMessages.invalid;
  }
  
  return fieldMessages[validationType] || fieldMessages.invalid;
};

// Fonction de validation complète d'un champ
export const validateField = (fieldName, value) => {
  switch (fieldName) {
    case 'dateOfBirth':
      if (!value) return { valid: false, message: errorMessages.dateOfBirth.required };
      if (!clientValidation.validateAge(value)) {
        return { valid: false, message: errorMessages.dateOfBirth.invalid };
      }
      return { valid: true, message: '' };
      
    case 'passportNumber':
      if (!value) return { valid: false, message: errorMessages.passportNumber.required };
      if (!clientValidation.validatePassport(value)) {
        return { valid: false, message: errorMessages.passportNumber.invalid };
      }
      return { valid: true, message: '' };
      
    case 'passportExpiry':
      if (!value) return { valid: false, message: errorMessages.passportExpiry.required };
      if (!clientValidation.validatePassportExpiry(value)) {
        return { valid: false, message: errorMessages.passportExpiry.invalid };
      }
      return { valid: true, message: '' };
      
    case 'phone':
      if (!value) return { valid: false, message: errorMessages.phone.required };
      if (!clientValidation.validatePhone(value)) {
        return { valid: false, message: errorMessages.phone.invalid };
      }
      return { valid: true, message: '' };
      
    case 'email':
      if (!value) return { valid: false, message: errorMessages.email.required };
      if (!clientValidation.validateEmail(value)) {
        return { valid: false, message: errorMessages.email.invalid };
      }
      return { valid: true, message: '' };
      
    case 'firstName':
    case 'lastName':
      if (!value) return { valid: false, message: errorMessages[fieldName].required };
      if (!clientValidation.validateName(value)) {
        return { valid: false, message: errorMessages[fieldName].invalid };
      }
      return { valid: true, message: '' };
      
    default:
      return { valid: true, message: '' };
  }
};
