// Configuration des validations du formulaire d'application
export const FORM_VALIDATION_CONFIG = {
  // Règles générales
  MIN_AGE: 15,
  MAX_AGE: 100,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  
  // Champs obligatoires par étape
  REQUIRED_FIELDS: {
    STEP_1: {
      // Contact Details
      email: {
        required: true,
        type: 'email',
        label: 'Email',
        placeholder: 'votre.email@exemple.com',
        validation: {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Format d\'email invalide'
        }
      },
      phone: {
        required: true,
        type: 'tel',
        label: 'Téléphone',
        placeholder: '+212XXXXXXXXX',
        validation: {
          pattern: /^\+212[0-9]{9}$/,
          message: 'Format téléphone invalide (+212XXXXXXXXX)'
        }
      },
      whatsapp: {
        required: true,
        type: 'tel',
        label: 'WhatsApp',
        placeholder: '+212XXXXXXXXX',
        validation: {
          pattern: /^\+212[0-9]{9}$/,
          message: 'Format WhatsApp invalide (+212XXXXXXXXX)'
        }
      },
      
      // Student Information
      firstName: {
        required: true,
        type: 'text',
        label: 'Prénom',
        placeholder: 'Votre prénom',
        validation: {
          minLength: 2,
          maxLength: 50,
          pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
          message: 'Prénom invalide (2-50 caractères, lettres seulement)'
        }
      },
      lastName: {
        required: true,
        type: 'text',
        label: 'Nom',
        placeholder: 'Votre nom',
        validation: {
          minLength: 2,
          maxLength: 50,
          pattern: /^[a-zA-ZÀ-ÿ\s'-]+$/,
          message: 'Nom invalide (2-50 caractères, lettres seulement)'
        }
      },
      dateOfBirth: {
        required: true,
        type: 'date',
        label: 'Date de naissance',
        validation: {
          minAge: 15,
          maxAge: 100,
          message: 'Âge minimum: 15 ans, maximum: 100 ans'
        }
      },
      placeOfBirth: {
        required: true,
        type: 'text',
        label: 'Lieu de naissance',
        placeholder: 'Ville, Pays',
        validation: {
          minLength: 2,
          maxLength: 100,
          message: 'Lieu de naissance requis (2-100 caractères)'
        }
      },
      gender: {
        required: true,
        type: 'select',
        label: 'Genre',
        options: [
          { value: 'MALE', label: 'Masculin' },
          { value: 'FEMALE', label: 'Féminin' }
        ],
        validation: {
          message: 'Genre requis'
        }
      },
      maritalStatus: {
        required: true,
        type: 'select',
        label: 'Statut marital',
        options: [
          { value: 'SINGLE', label: 'Célibataire' },
          { value: 'MARRIED', label: 'Marié(e)' }
        ],
        validation: {
          message: 'Statut marital requis'
        }
      },
      passportNumber: {
        required: true,
        type: 'text',
        label: 'Numéro de passeport',
        placeholder: 'Numéro de passeport',
        validation: {
          minLength: 6,
          maxLength: 15,
          pattern: /^[A-Z0-9]+$/,
          message: 'Format passeport invalide (6-15 caractères alphanumériques)'
        }
      },
      passportExpiry: {
        required: true,
        type: 'date',
        label: 'Date d\'expiration du passeport',
        validation: {
          minMonthsFromNow: 6,
          message: 'Passeport doit être valide au moins 6 mois'
        }
      },
      
      // Language Proficiency
      englishLevel: {
        required: true,
        type: 'select',
        label: 'Niveau d\'anglais',
        options: [
          { value: 'POOR', label: 'Faible' },
          { value: 'FAIR', label: 'Moyen' },
          { value: 'GOOD', label: 'Bon' },
          { value: 'VERY_GOOD', label: 'Très bon' },
          { value: 'EXCELLENT', label: 'Excellent' }
        ],
        validation: {
          message: 'Niveau d\'anglais requis'
        }
      },
      englishCertificate: {
        required: true,
        type: 'select',
        label: 'Certificat d\'anglais',
        options: [
          { value: 'IELTS', label: 'IELTS' },
          { value: 'TOEFL', label: 'TOEFL' },
          { value: 'DUOLINGO', label: 'Duolingo' },
          { value: 'OTHER', label: 'Autre' },
          { value: 'NONE', label: 'Aucun' }
        ],
        validation: {
          message: 'Certificat d\'anglais requis'
        }
      },
      
      // Home Address Details
      country: {
        required: true,
        type: 'country-selector',
        label: 'Pays',
        defaultValue: 'Morocco',
        validation: {
          message: 'Pays requis'
        }
      },
      fullAddress: {
        required: true,
        type: 'textarea',
        label: 'Adresse complète',
        placeholder: 'Rue, Ville, Code postal, Pays',
        validation: {
          minLength: 10,
          maxLength: 500,
          message: 'Adresse complète requise (10-500 caractères)'
        }
      }
    },
    
    STEP_2: {
      // Education Background (au moins une formation)
      educationBackground: {
        required: true,
        type: 'repeatable',
        minItems: 1,
        fields: {
          school: {
            required: true,
            type: 'text',
            label: 'École/Université',
            placeholder: 'Nom de l\'établissement'
          },
          major: {
            required: true,
            type: 'text',
            label: 'Spécialisation',
            placeholder: 'Domaine d\'études'
          },
          startedDate: {
            required: true,
            type: 'date',
            label: 'Date de début'
          },
          finishedDate: {
            required: true,
            type: 'date',
            label: 'Date de fin'
          },
          grade: {
            required: false,
            type: 'text',
            label: 'Note/Diplôme',
            placeholder: 'Note obtenue ou diplôme'
          }
        }
      },
      
      // Work Experience (au moins une expérience)
      workExperience: {
        required: true,
        type: 'repeatable',
        minItems: 1,
        fields: {
          employer: {
            required: true,
            type: 'text',
            label: 'Employeur',
            placeholder: 'Nom de l\'entreprise'
          },
          jobTitle: {
            required: true,
            type: 'text',
            label: 'Poste',
            placeholder: 'Titre du poste'
          },
          startedDate: {
            required: true,
            type: 'date',
            label: 'Date de début'
          },
          finishedDate: {
            required: false,
            type: 'date',
            label: 'Date de fin',
            conditional: 'isPresent'
          },
          isPresent: {
            required: false,
            type: 'checkbox',
            label: 'Poste actuel'
          }
        }
      },
      
      // Financial Supporter (Guarantor)
      guarantorRelationship: {
        required: true,
        type: 'text',
        label: 'Relation avec le garant',
        placeholder: 'Père, Mère, Tuteur, etc.',
        validation: {
          minLength: 2,
          maxLength: 50,
          message: 'Relation requise (2-50 caractères)'
        }
      },
      guarantorName: {
        required: true,
        type: 'text',
        label: 'Nom complet du garant',
        placeholder: 'Nom et prénom du garant',
        validation: {
          minLength: 2,
          maxLength: 100,
          message: 'Nom du garant requis (2-100 caractères)'
        }
      },
      guarantorCountry: {
        required: true,
        type: 'country-selector',
        label: 'Pays du garant',
        defaultValue: 'Morocco',
        validation: {
          message: 'Pays du garant requis'
        }
      },
      guarantorAddress: {
        required: true,
        type: 'textarea',
        label: 'Adresse du garant',
        placeholder: 'Adresse complète du garant',
        validation: {
          minLength: 10,
          maxLength: 500,
          message: 'Adresse du garant requise (10-500 caractères)'
        }
      },
      guarantorEmail: {
        required: true,
        type: 'email',
        label: 'Email du garant',
        placeholder: 'email.garant@exemple.com',
        validation: {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Format d\'email invalide'
        }
      },
      guarantorWorkplace: {
        required: true,
        type: 'text',
        label: 'Lieu de travail du garant',
        placeholder: 'Entreprise ou organisation',
        validation: {
          minLength: 2,
          maxLength: 100,
          message: 'Lieu de travail requis (2-100 caractères)'
        }
      },
      guarantorWorkplaceAddress: {
        required: true,
        type: 'textarea',
        label: 'Adresse du lieu de travail',
        placeholder: 'Adresse complète du lieu de travail',
        validation: {
          minLength: 10,
          maxLength: 500,
          message: 'Adresse du lieu de travail requise (10-500 caractères)'
        }
      },
      
      // Emergency Contact in China
      emergencyName: {
        required: true,
        type: 'text',
        label: 'Nom du contact d\'urgence',
        placeholder: 'Nom et prénom du contact',
        validation: {
          minLength: 2,
          maxLength: 100,
          message: 'Nom du contact requis (2-100 caractères)'
        }
      },
      emergencyCountry: {
        required: true,
        type: 'country-selector',
        label: 'Pays du contact d\'urgence',
        defaultValue: 'Morocco',
        validation: {
          message: 'Pays du contact requis'
        }
      },
      emergencyEmail: {
        required: true,
        type: 'email',
        label: 'Email du contact d\'urgence',
        placeholder: 'email.contact@exemple.com',
        validation: {
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: 'Format d\'email invalide'
        }
      },
      emergencyAddress: {
        required: true,
        type: 'textarea',
        label: 'Adresse du contact d\'urgence',
        placeholder: 'Adresse complète du contact',
        validation: {
          minLength: 10,
          maxLength: 500,
          message: 'Adresse du contact requise (10-500 caractères)'
        }
      }
    },
    
    STEP_3: {
      // Declarations (toutes obligatoires)
      declarations: {
        termsAccepted: {
          required: true,
          type: 'checkbox',
          label: 'J\'accepte les conditions générales',
          validation: {
            message: 'Acceptation des conditions requise'
          }
        },
        privacyAccepted: {
          required: true,
          type: 'checkbox',
          label: 'J\'accepte la politique de confidentialité',
          validation: {
            message: 'Acceptation de la confidentialité requise'
          }
        },
        accuracyAccepted: {
          required: true,
          type: 'checkbox',
          label: 'Je déclare que toutes les informations sont exactes',
          validation: {
            message: 'Déclaration d\'exactitude requise'
          }
        },
        paymentAccepted: {
          required: true,
          type: 'checkbox',
          label: 'J\'accepte la politique de paiement',
          validation: {
            message: 'Acceptation de la politique de paiement requise'
          }
        },
        refundAccepted: {
          required: true,
          type: 'checkbox',
          label: 'J\'accepte la politique de remboursement',
          validation: {
            message: 'Acceptation de la politique de remboursement requise'
          }
        },
        complianceAccepted: {
          required: true,
          type: 'checkbox',
          label: 'Je m\'engage à respecter les règles de l\'université',
          validation: {
            message: 'Engagement de respect des règles requis'
          }
        }
      }
    },
    
    STEP_4: {
      // Documents (certains obligatoires)
      documents: {
        passport: {
          required: true,
          type: 'file',
          label: 'Pages du passeport',
          acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
          maxSize: 5 * 1024 * 1024,
          validation: {
            message: 'Pages du passeport requises (PDF, JPG, PNG, max 5MB)'
          }
        },
        academicCertificate: {
          required: true,
          type: 'file',
          label: 'Certificat académique le plus élevé',
          acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
          maxSize: 5 * 1024 * 1024,
          validation: {
            message: 'Certificat académique requis (PDF, JPG, PNG, max 5MB)'
          }
        },
        academicTranscript: {
          required: true,
          type: 'file',
          label: 'Relevé de notes académique',
          acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
          maxSize: 5 * 1024 * 1024,
          validation: {
            message: 'Relevé de notes requis (PDF, JPG, PNG, max 5MB)'
          }
        },
        languageCertificate: {
          required: false,
          type: 'file',
          label: 'Certificat de maîtrise de l\'anglais',
          acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
          maxSize: 5 * 1024 * 1024,
          validation: {
            message: 'Certificat de langue (PDF, JPG, PNG, max 5MB)'
          }
        },
        physicalExamination: {
          required: false,
          type: 'file',
          label: 'Formulaire d\'examen physique',
          acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
          maxSize: 5 * 1024 * 1024,
          validation: {
            message: 'Examen physique (PDF, JPG, PNG, max 5MB)'
          }
        },
        noCriminalCertificate: {
          required: true,
          type: 'file',
          label: 'Certificat de non-condamnation',
          acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
          maxSize: 5 * 1024 * 1024,
          validation: {
            message: 'Certificat de non-condamnation requis (PDF, JPG, PNG, max 5MB)'
          }
        },
        bankStatement: {
          required: false,
          type: 'file',
          label: 'Relevé bancaire/Solvabilité',
          acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
          maxSize: 5 * 1024 * 1024,
          validation: {
            message: 'Relevé bancaire (PDF, JPG, PNG, max 5MB)'
          }
        },
        photo: {
          required: true,
          type: 'file',
          label: 'Photo personnelle (format passeport)',
          acceptedTypes: ['.jpg', '.jpeg', '.png'],
          maxSize: 5 * 1024 * 1024,
          validation: {
            message: 'Photo personnelle requise (JPG, PNG, max 5MB)'
          }
        },
        resume: {
          required: false,
          type: 'file',
          label: 'CV/Resume',
          acceptedTypes: ['.pdf', '.doc', '.docx'],
          maxSize: 5 * 1024 * 1024,
          validation: {
            message: 'CV/Resume (PDF, DOC, max 5MB)'
          }
        },
        awardCertificates: {
          required: false,
          type: 'file',
          label: 'Certificats de récompense',
          acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
          maxSize: 5 * 1024 * 1024,
          validation: {
            message: 'Certificats de récompense (PDF, JPG, PNG, max 5MB)'
          }
        },
        parentId: {
          required: false,
          type: 'file',
          label: 'Carte d\'identité du père/mère',
          acceptedTypes: ['.pdf', '.jpg', '.jpeg', '.png'],
          maxSize: 5 * 1024 * 1024,
          validation: {
            message: 'Carte d\'identité parent (PDF, JPG, PNG, max 5MB)'
          }
        }
      }
    },
    
    STEP_5: {
      // Payment (champs obligatoires selon la méthode)
      payment: {
        method: {
          required: true,
          type: 'select',
          label: 'Méthode de paiement',
          options: [
            { value: 'CREDIT_CARD', label: 'Carte de crédit' },
            { value: 'DEBIT_CARD', label: 'Carte de débit' },
            { value: 'BANK_TRANSFER', label: 'Virement bancaire' },
            { value: 'PAYPAL', label: 'PayPal' }
          ],
          validation: {
            message: 'Méthode de paiement requise'
          }
        },
        billingName: {
          required: true,
          type: 'text',
          label: 'Nom sur la carte',
          placeholder: 'Nom tel qu\'il apparaît sur la carte',
          validation: {
            minLength: 2,
            maxLength: 100,
            message: 'Nom sur la carte requis (2-100 caractères)'
          }
        },
        billingCountry: {
          required: true,
          type: 'country-selector',
          label: 'Pays de facturation',
          defaultValue: 'Morocco',
          validation: {
            message: 'Pays de facturation requis'
          }
        },
        billingAddress: {
          required: true,
          type: 'textarea',
          label: 'Adresse de facturation',
          placeholder: 'Adresse complète de facturation',
          validation: {
            minLength: 10,
            maxLength: 500,
            message: 'Adresse de facturation requise (10-500 caractères)'
          }
        },
        billingState: {
          required: true,
          type: 'text',
          label: 'État/Province',
          placeholder: 'État ou province',
          validation: {
            minLength: 2,
            maxLength: 100,
            message: 'État/Province requis (2-100 caractères)'
          }
        },
        billingPhone: {
          required: true,
          type: 'tel',
          label: 'Téléphone de facturation',
          placeholder: '+212XXXXXXXXX',
          validation: {
            pattern: /^\+212[0-9]{9}$/,
            message: 'Format téléphone invalide (+212XXXXXXXXX)'
          }
        },
        billingPostalCode: {
          required: true,
          type: 'text',
          label: 'Code postal',
          placeholder: 'Code postal',
          validation: {
            minLength: 3,
            maxLength: 10,
            message: 'Code postal requis (3-10 caractères)'
          }
        }
      },
      
      // Final declaration
      finalDeclaration: {
        required: true,
        type: 'checkbox',
        label: 'Je confirme que toutes les informations fournies sont exactes et complètes',
        validation: {
          message: 'Confirmation finale requise'
        }
      }
    }
  },
  
  // Messages d'erreur personnalisés
  ERROR_MESSAGES: {
    REQUIRED: 'Ce champ est obligatoire',
    INVALID_EMAIL: 'Format d\'email invalide',
    INVALID_PHONE: 'Format téléphone invalide (+212XXXXXXXXX)',
    INVALID_DATE: 'Date invalide',
    INVALID_AGE: 'Âge minimum: 15 ans',
    INVALID_FILE_SIZE: 'Fichier trop volumineux (max 5MB)',
    INVALID_FILE_TYPE: 'Type de fichier non autorisé',
    MIN_LENGTH: (min) => `Minimum ${min} caractères requis`,
    MAX_LENGTH: (max) => `Maximum ${max} caractères autorisés`,
    PATTERN_MISMATCH: 'Format invalide'
  },
  
  // Styles pour les champs obligatoires
  STYLES: {
    REQUIRED_INDICATOR: {
      color: '#ef4444',
      fontSize: '0.875rem',
      fontWeight: '500'
    },
    ERROR_STYLE: {
      borderColor: '#ef4444',
      boxShadow: '0 0 0 1px #ef4444'
    },
    SUCCESS_STYLE: {
      borderColor: '#10b981',
      boxShadow: '0 0 0 1px #10b981'
    }
  }
};

// Fonctions de validation utilitaires
export const validationHelpers = {
  // Calculer l'âge à partir d'une date
  calculateAge: (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  },
  
  // Valider l'âge minimum
  validateMinAge: (birthDate, minAge = 15) => {
    const age = validationHelpers.calculateAge(birthDate);
    return age >= minAge;
  },
  
  // Valider l'âge maximum
  validateMaxAge: (birthDate, maxAge = 100) => {
    const age = validationHelpers.calculateAge(birthDate);
    return age <= maxAge;
  },
  
  // Valider l'expiration du passeport (6 mois minimum)
  validatePassportExpiry: (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);
    
    return expiry > sixMonthsFromNow;
  },
  
  // Valider la taille du fichier
  validateFileSize: (file, maxSize = 5 * 1024 * 1024) => {
    return file && file.size <= maxSize;
  },
  
  // Valider le type de fichier
  validateFileType: (file, acceptedTypes) => {
    if (!file || !acceptedTypes) return false;
    
    const fileExtension = file.name.toLowerCase().split('.').pop();
    return acceptedTypes.some(type => 
      type.startsWith('.') ? fileExtension === type.slice(1) : file.type.includes(type)
    );
  }
};
