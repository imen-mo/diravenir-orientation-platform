import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { applicationService } from '../services/applicationService';
import { toast } from 'react-toastify';
import GlobalLayout from '../components/GlobalLayout';
import ModernDatePicker from '../components/ModernDatePicker';
import ModernCountrySelector from '../components/ModernCountrySelector';
import { Tooltip } from 'react-tooltip';
import { clientValidation, validateField, errorMessages } from '../services/validationService';
import { useTheme } from '../contexts/ThemeContext.jsx';
import './Apply.css';

const Apply = () => {
  const { getText } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationId, setApplicationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const autoSaveTimeout = useRef(null);
  
  // Program data from navigation
  const [selectedProgram, setSelectedProgram] = useState(null);
  
  // Modal states
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  
  // Validation states
  const [fieldErrors, setFieldErrors] = useState({});
  const [fieldValidations, setFieldValidations] = useState({});
  
  const [formData, setFormData] = useState({
    // Contact Details
    email: '',
    phone: '',
    whatsapp: '',
    
    // Student Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    placeOfBirth: '',
    gender: '',
    maritalStatus: '',
    passportNumber: '',
    passportExpiry: '',
    
    // Language Proficiency
    englishLevel: '',
    englishCertificate: '',
    englishScore: '',
    
    // Home Address Details
    country: 'Morocco', // Valeur par défaut
    fullAddress: '',
    
    // Education Background (repeatable block)
    educationBackground: [{
      school: '',
      major: '',
      startedDate: '',
      finishedDate: '',
      grade: ''
    }],
    
    // Work Experience (repeatable block)
    workExperience: [{
      employer: '',
      jobTitle: '',
      startedDate: '',
      finishedDate: '',
      isPresent: false
    }],
    
    // Family Information
    familyMembers: [{
      name: '',
      nationality: 'Morocco', // Valeur par défaut
      email: '',
      workplace: '',
      position: '',
      relationship: ''
    }],
    
    // Financial Supporter (Guarantor)
    guarantorRelationship: '',
    guarantorName: '',
    guarantorCountry: 'Morocco', // Valeur par défaut
    guarantorAddress: '',
    guarantorEmail: '',
    guarantorWorkplace: '',
    guarantorWorkplaceAddress: '',
    
    // Emergency Contact in China
    emergencyContact: {
      name: '',
      country: 'Morocco', // Valeur par défaut
      email: '',
      completeAddress: ''
    },
    
    // Declarations
    declarations: {
      termsAccepted: false,
      privacyAccepted: false,
      accuracyAccepted: false,
      paymentAccepted: false,
      refundAccepted: false,
      complianceAccepted: false
    },
    
    // Documents
    documents: {
      passport: null,
      academicCertificate: null,
      academicTranscript: null,
      languageCertificate: null,
      physicalExamination: null,
      noCriminalCertificate: null,
      bankStatement: null,
      photo: null,
      resume: null,
      awardCertificates: null,
      parentId: null
    },
    
    // Payment
    payment: {
      method: '',
      amount: 0,
      currency: 'USD',
      expiryDate: '',
      cardNumber: '',
      securityCode: '',
      billingName: '',
      billingCountry: '',
      billingAddress: '',
      billingState: '',
      billingPhone: '',
      billingPostalCode: '',
      rememberMe: false
    },
    
    finalDeclaration: false
  });

  // Basic validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\+212[0-9]{9}$/;
    return phoneRegex.test(phone);
  };

  // Step validation améliorée avec validation détaillée
  const isStepValid = (step) => {
    console.log(`Validating step ${step}`, formData);
    
    switch (step) {
      case 1:
        const step1Errors = [];
        
        // Validation des champs obligatoires avec messages spécifiques
        if (!formData.firstName.trim()) {
          step1Errors.push('Prénom requis');
        } else if (!clientValidation.validateName(formData.firstName)) {
          step1Errors.push('Prénom invalide (2-50 caractères)');
        }
        
        if (!formData.lastName.trim()) {
          step1Errors.push('Nom requis');
        } else if (!clientValidation.validateName(formData.lastName)) {
          step1Errors.push('Nom invalide (2-50 caractères)');
        }
        
        if (!formData.email.trim()) {
          step1Errors.push('Email requis');
        } else if (!clientValidation.validateEmail(formData.email)) {
          step1Errors.push('Format d\'email invalide');
        }
        
        if (!formData.phone.trim()) {
          step1Errors.push('Téléphone requis');
        } else if (!clientValidation.validatePhone(formData.phone)) {
          step1Errors.push('Format téléphone invalide (+212XXXXXXXXX)');
        }
        
        if (!formData.whatsapp.trim()) {
          step1Errors.push('WhatsApp requis');
        } else if (!clientValidation.validatePhone(formData.whatsapp)) {
          step1Errors.push('Format WhatsApp invalide (+212XXXXXXXXX)');
        }
        
        if (!formData.dateOfBirth) {
          step1Errors.push('Date de naissance requise');
        } else if (!clientValidation.validateAge(formData.dateOfBirth)) {
          step1Errors.push('Âge minimum: 15 ans');
        }
        
        if (!formData.placeOfBirth.trim()) {
          step1Errors.push('Lieu de naissance requis');
        }
        
        if (!formData.gender.trim()) {
          step1Errors.push('Genre requis');
        }
        
        if (!formData.maritalStatus.trim()) {
          step1Errors.push('Statut marital requis');
        }
        
        if (!formData.passportNumber.trim()) {
          step1Errors.push('Numéro de passeport requis');
        } else if (!clientValidation.validatePassport(formData.passportNumber)) {
          step1Errors.push('Format passeport invalide (6-15 caractères alphanumériques)');
        }
        
        if (!formData.passportExpiry) {
          step1Errors.push('Date d\'expiration du passeport requise');
        } else if (!clientValidation.validatePassportExpiry(formData.passportExpiry)) {
          step1Errors.push('Passeport doit être valide au moins 6 mois');
        }
        
        if (!formData.englishLevel.trim()) {
          step1Errors.push('Niveau d\'anglais requis');
        }
        
        if (!formData.englishCertificate.trim()) {
          step1Errors.push('Certificat d\'anglais requis');
        }
        
        if (step1Errors.length > 0) {
          console.log('Step 1 validation errors:', step1Errors);
          // Suppression du toast d'erreur - validation silencieuse
          return false;
        }
        
        console.log('Step 1 validation: SUCCESS');
        return true;
      case 2:
        return (
          formData.educationBackground[0]?.school?.trim() !== '' &&
          formData.workExperience[0]?.employer?.trim() !== '' &&
          formData.guarantorName.trim() !== '' &&
          formData.emergencyContact.name.trim() !== ''
        );
      case 3:
        // Validation complète de l'étape 3 avec tous les champs de déclaration
        const step3Valid = (
          formData.declarations.termsAccepted &&
          formData.declarations.privacyAccepted &&
          formData.declarations.accuracyAccepted &&
          formData.declarations.paymentAccepted &&
          formData.declarations.refundAccepted &&
          formData.declarations.complianceAccepted
        );
        
        console.log('Step 3 validation result:', step3Valid);
        console.log('Declarations status:', formData.declarations);
        return step3Valid;
      case 4:
        // Validation complète de l'étape 4 avec tous les documents requis
        const step4Valid = (
          formData.documents.passport &&
          formData.documents.academicCertificate &&
          formData.documents.academicTranscript &&
          formData.documents.noCriminalCertificate &&
          formData.documents.photo
        );
        
        console.log('Step 4 validation result:', step4Valid);
        console.log('Documents status:', {
          passport: !!formData.documents.passport,
          academicCertificate: !!formData.documents.academicCertificate,
          academicTranscript: !!formData.documents.academicTranscript,
          noCriminalCertificate: !!formData.documents.noCriminalCertificate,
          photo: !!formData.documents.photo
        });
        return step4Valid;
      case 5:
        // Validation de l'étape 5 - seulement les champs requis affichés
        const step5Valid = (
          formData.payment.method && formData.payment.method.trim() !== '' &&
          formData.payment.billingName && formData.payment.billingName.trim() !== '' &&
          formData.payment.billingCountry && formData.payment.billingCountry.trim() !== '' &&
          formData.payment.billingAddress && formData.payment.billingAddress.trim() !== '' &&
          formData.payment.billingState && formData.payment.billingState.trim() !== '' &&
          formData.payment.billingPhone && formData.payment.billingPhone.trim() !== '' &&
          formData.payment.billingPostalCode && formData.payment.billingPostalCode.trim() !== '' &&
          formData.finalDeclaration === true
        );
        
        console.log('Step 5 validation result:', step5Valid);
        console.log('Payment status:', {
          method: formData.payment.method,
          cardNumber: formData.payment.cardNumber,
          expiryDate: formData.payment.expiryDate,
          securityCode: formData.payment.securityCode,
          billingName: formData.payment.billingName,
          billingCountry: formData.payment.billingCountry,
          billingAddress: formData.payment.billingAddress,
          billingState: formData.payment.billingState,
          billingPhone: formData.payment.billingPhone,
          billingPostalCode: formData.payment.billingPostalCode,
          finalDeclaration: formData.finalDeclaration
        });
        return step5Valid;
      default:
        return false;
    }
  };

  // Check if a specific field is valid
  const isFieldValid = (fieldName) => {
    const value = formData[fieldName];
    if (typeof value === 'string') {
      return value.trim() !== '';
    }
    return value !== null && value !== undefined && value !== '';
  };

  // Navigation functions
  const nextStep = async () => {
    if (isStepValid(currentStep) && currentStep < 5) {
      // Sauvegarder l'étape actuelle avant de passer à la suivante
      if (applicationId) {
        await saveApplicationStep(currentStep);
      }
      
      setCurrentStep(currentStep + 1);
      toast.success(`Moving to step ${currentStep + 1}`);
    } else {
      // Give specific feedback about what's missing
      if (currentStep === 1) {
        const missingFields = [];
        if (formData.firstName.trim() === '') missingFields.push('First name');
        if (formData.lastName.trim() === '') missingFields.push('Last name');
        if (formData.email.trim() === '') missingFields.push('Email');
        if (formData.phone.trim() === '') missingFields.push('Phone');
        if (formData.whatsapp.trim() === '') missingFields.push('WhatsApp');
        if (formData.dateOfBirth.trim() === '') missingFields.push('Date of birth');
        if (formData.placeOfBirth.trim() === '') missingFields.push('Place of birth');
        if (formData.gender.trim() === '') missingFields.push('Gender');
        if (formData.maritalStatus.trim() === '') missingFields.push('Marital status');
        if (formData.passportNumber.trim() === '') missingFields.push('Passport number');
        if (formData.passportExpiry.trim() === '') missingFields.push('Passport expiry date');
        if (formData.englishLevel.trim() === '') missingFields.push('English level');
        if (formData.englishCertificate.trim() === '') missingFields.push('English certificate');
        
        // Suppression du toast d'erreur - validation silencieuse
        console.log(`Missing fields: ${missingFields.join(', ')}`);
      } else {
        console.log('Please complete all required fields in this step before continuing.');
      }
    }
  };

  const prevStep = async () => {
    if (currentStep > 1) {
      // Sauvegarder l'étape actuelle avant de revenir
      if (applicationId) {
        await saveApplicationStep(currentStep);
      }
      
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = async (step) => {
    if (step >= 1 && step <= 5) {
      // Check if previous steps are valid
      for (let i = 1; i < step; i++) {
        if (!isStepValid(i)) {
          console.log(`Please complete step ${i} before accessing step ${step}.`);
          return;
        }
      }
      
      // Sauvegarder l'étape actuelle avant de changer
      if (applicationId) {
        await saveApplicationStep(currentStep);
      }
      
      setCurrentStep(step);
    }
  };

  // Handle final submission
  const handleSubmit = async () => {
    if (!isStepValid(currentStep)) {
      console.log('Please complete all required fields before submitting.');
      return;
    }

    try {
      setLoading(true);
      
      // Sauvegarder l'étape finale
      if (applicationId) {
        await saveApplicationStep(currentStep);
      }
      
      // Marquer l'application comme soumise
      if (applicationId) {
        await applicationService.updateApplicationStatus(applicationId, 'SUBMITTED');
      }
      
      toast.success('Application submitted successfully!');
      
      // Sauvegarder les données de l'application pour la page de succès
      const successData = {
        ...formData,
        applicationId: applicationId,
        programName: selectedProgram?.name || 'Program',
        universityName: selectedProgram?.university || 'University',
        applicationFees: selectedProgram?.applicationFee || 4000,
        serviceFees: selectedProgram?.serviceFee || 11000
      };
      
      // Sauvegarder en localStorage pour la page de succès
      localStorage.setItem('lastSubmittedApplication', JSON.stringify(successData));
      
      // Rediriger vers la page de succès
      setTimeout(() => {
        navigate('/application-success', {
          state: {
            applicationData: successData
          }
        });
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting application:', error);
      // Suppression du toast d'erreur - gestion silencieuse
    } finally {
      setLoading(false);
    }
  };

  // Form handling avec validation en temps réel
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    
    // Validation en temps réel
    validateFieldRealTime(field, value);
    
    // Auto-save intelligent après modification (avec délai)
    if (applicationId && value && value.toString().trim() !== '') {
      clearTimeout(autoSaveTimeout.current);
      autoSaveTimeout.current = setTimeout(() => {
        autoSaveApplication();
      }, 3000); // Sauvegarde automatique après 3 secondes d'inactivité
    }
  };
  
  // Fonction de validation en temps réel
  const validateFieldRealTime = (fieldName, value) => {
    const errors = { ...fieldErrors };
    const validations = { ...fieldValidations };
    
    // Validation spécifique selon le type de champ
    const validationResult = validateField(fieldName, value);
    
    if (!validationResult.valid) {
      errors[fieldName] = validationResult.message;
      validations[fieldName] = false;
    } else {
      delete errors[fieldName];
      validations[fieldName] = true;
    }
    
    setFieldErrors(errors);
    setFieldValidations(validations);
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => {
      const currentArray = Array.isArray(prev[field]) ? prev[field] : [];
      const updatedArray = currentArray.map((item, i) => 
        i === index ? { ...item, ...value } : item
      );
      
      return {
        ...prev,
        [field]: updatedArray
      };
    });
    
    // Auto-save après modification
    if (applicationId) {
      clearTimeout(autoSaveTimeout.current);
      autoSaveTimeout.current = setTimeout(() => {
        autoSaveApplication();
      }, 2000);
    }
  };

  const addFamilyMember = () => {
    setFormData(prev => {
      const currentFamilyMembers = Array.isArray(prev.familyMembers) ? prev.familyMembers : [];
      return {
        ...prev,
        familyMembers: [...currentFamilyMembers, { name: '', nationality: '', relationship: '' }]
      };
    });
  };

  const removeFamilyMember = (index) => {
    setFormData(prev => {
      const currentFamilyMembers = Array.isArray(prev.familyMembers) ? prev.familyMembers : [];
      const updatedFamilyMembers = currentFamilyMembers.filter((_, i) => i !== index);
      return {
        ...prev,
        familyMembers: updatedFamilyMembers
      };
    });
  };

  const addEducationBackground = () => {
    setFormData(prev => {
      const currentEducation = Array.isArray(prev.educationBackground) ? prev.educationBackground : [];
      return {
        ...prev,
        educationBackground: [...currentEducation, { 
          school: '', 
          major: '', 
          startedDate: '', 
          finishedDate: '', 
          grade: '' 
        }]
      };
    });
  };

  const removeEducationBackground = (index) => {
    setFormData(prev => {
      const currentEducation = Array.isArray(prev.educationBackground) ? prev.educationBackground : [];
      const updatedEducation = currentEducation.filter((_, i) => i !== index);
      return {
        ...prev,
        educationBackground: updatedEducation
      };
    });
  };

  const addWorkExperience = () => {
    setFormData(prev => {
      const currentWork = Array.isArray(prev.workExperience) ? prev.workExperience : [];
      return {
        ...prev,
        workExperience: [...currentWork, { 
          employer: '', 
          jobTitle: '', 
          startedDate: '', 
          finishedDate: '', 
          isPresent: false 
        }]
      };
    });
  };

  const removeWorkExperience = (index) => {
    setFormData(prev => {
      const currentWork = Array.isArray(prev.workExperience) ? prev.workExperience : [];
      const updatedWork = currentWork.filter((_, i) => i !== index);
      return {
        ...prev,
        workExperience: updatedWork
      };
    });
  };

  // Handle file upload
  const handleFileUpload = (documentType, file) => {
    if (!file) return;
    
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }));
    
    toast.success(`${documentType} uploaded successfully!`);
  };

  // Download Application PDF
  const downloadApplicationPDF = async () => {
    try {
      // Check if jsPDF is available
      if (typeof window.jsPDF === 'undefined') {
        // If jsPDF is not available, create a simple text file
        const textContent = generateTextContent();
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `application_${applicationId || 'draft'}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        toast.success('Application details downloaded as text file!');
        return;
      }
      
      // Create PDF with jsPDF if available
      const { jsPDF } = window.jsPDF;
      const doc = new jsPDF();
      
      // Add logo at the top (if available)
      try {
        // You can add a logo image here if you have one
        // doc.addImage(logoImage, 'PNG', 20, 20, 40, 20);
      } catch (e) {
        console.log('Logo not available for PDF');
      }
      
      // Set font and size
      doc.setFont('helvetica');
      doc.setFontSize(12);
      
      // Add header with program information
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(84, 22, 82); // #541652
      doc.text('DIRAVENIR', 20, 30);
      
      doc.setFontSize(16);
      doc.setTextColor(252, 190, 28); // #FCBE1C
      if (selectedProgram) {
        doc.text(selectedProgram.name, 20, 45);
        doc.setFontSize(12);
        doc.setTextColor(84, 22, 82);
        doc.text(`${selectedProgram.type} - ${selectedProgram.university}`, 20, 55);
      }
      
      // Add application details
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('APPLICATION FORM', 20, 75);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Application ID: ${applicationId || 'Draft'}`, 20, 90);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 100);
      doc.text(`Current Step: ${currentStep}/5`, 20, 110);
      doc.text(`Status: Draft`, 20, 120);
      
      let yPosition = 140;
      
      // Personal Information
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(84, 22, 82);
      doc.text('PERSONAL INFORMATION', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(`Name: ${formData.firstName} ${formData.lastName}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Email: ${formData.email}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Phone: ${formData.phone}`, 20, yPosition);
      yPosition += 7;
      doc.text(`WhatsApp: ${formData.whatsapp}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Date of Birth: ${formData.dateOfBirth}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Place of Birth: ${formData.placeOfBirth}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Gender: ${formData.gender}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Marital Status: ${formData.maritalStatus}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Passport Number: ${formData.passportNumber}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Passport Expiry: ${formData.passportExpiry}`, 20, yPosition);
      yPosition += 15;
      
      // Language Proficiency
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(84, 22, 82);
      doc.text('LANGUAGE PROFICIENCY', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(`English Level: ${formData.englishLevel}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Certificate: ${formData.englishCertificate}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Score: ${formData.englishScore}`, 20, yPosition);
      yPosition += 15;
      
      // Address
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(84, 22, 82);
      doc.text('ADDRESS', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(`Country: ${formData.country}`, 20, yPosition);
      yPosition += 7;
      doc.text(`Full Address: ${formData.fullAddress}`, 20, yPosition);
      yPosition += 15;
      
      // Education Background
      if (formData.educationBackground && formData.educationBackground.length > 0) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(84, 22, 82);
        doc.text('EDUCATION BACKGROUND', 20, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        
        formData.educationBackground.forEach((edu, index) => {
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.text(`Education ${index + 1}:`, 20, yPosition);
          yPosition += 7;
          doc.text(`  School: ${edu.school}`, 25, yPosition);
          yPosition += 7;
          doc.text(`  Major: ${edu.major}`, 25, yPosition);
          yPosition += 7;
          doc.text(`  Started: ${edu.startedDate}`, 25, yPosition);
          yPosition += 7;
          doc.text(`  Finished: ${edu.finishedDate}`, 25, yPosition);
          yPosition += 7;
          doc.text(`  Grade: ${edu.grade}`, 25, yPosition);
          yPosition += 10;
        });
      }
      
      // Work Experience
      if (formData.workExperience && formData.workExperience.length > 0) {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(84, 22, 82);
        doc.text('WORK EXPERIENCE', 20, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        
        formData.workExperience.forEach((work, index) => {
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
          }
          
          doc.text(`Work ${index + 1}:`, 20, yPosition);
          yPosition += 7;
          doc.text(`  Employer: ${work.employer}`, 25, yPosition);
          yPosition += 7;
          doc.text(`  Position: ${work.jobTitle}`, 25, yPosition);
          yPosition += 7;
          doc.text(`  Started: ${work.startedDate}`, 25, yPosition);
          yPosition += 7;
          doc.text(`  Finished: ${work.isPresent ? 'Present' : work.finishedDate}`, 25, yPosition);
          yPosition += 10;
        });
      }
      
      // Payment Summary
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(84, 22, 82);
      doc.text('PAYMENT SUMMARY', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(0, 0, 0);
      const appFee = selectedProgram?.applicationFee || 4000;
      const serviceFee = selectedProgram?.serviceFee || 11000;
      const total = appFee + serviceFee;
      
      doc.text(`Application Fee: ${appFee} MAD`, 20, yPosition);
      yPosition += 7;
      doc.text(`Service Charge: ${serviceFee} MAD`, 20, yPosition);
      yPosition += 7;
      doc.text(`Total: ${total} MAD`, 20, yPosition);
      yPosition += 15;
      
      // Footer
      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(84, 22, 82);
      doc.text('This is a draft application form. Please complete all steps and submit for processing.', 20, yPosition);
      
      // Save the PDF
      doc.save(`application_${applicationId || 'draft'}.pdf`);
      
      toast.success('PDF downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Suppression du toast d'erreur - gestion silencieuse
    }
  };

  // Generate Text Content (fallback)
  const generateTextContent = () => {
    const content = `
Application Form - Diravenir

Application ID: ${applicationId || 'Draft'}
Date: ${new Date().toLocaleDateString()}
Current Step: ${currentStep}/5

PERSONAL INFORMATION
===================
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}
WhatsApp: ${formData.whatsapp}
Date of Birth: ${formData.dateOfBirth}
Place of Birth: ${formData.placeOfBirth}
Gender: ${formData.gender}
Marital Status: ${formData.maritalStatus}
Passport Number: ${formData.passportNumber}
Passport Expiry: ${formData.passportExpiry}

LANGUAGE PROFICIENCY
===================
English Level: ${formData.englishLevel}
Certificate: ${formData.englishCertificate}
Score: ${formData.englishScore}

ADDRESS
=======
Country: ${formData.country}
Full Address: ${formData.fullAddress}

EDUCATION BACKGROUND
===================
${formData.educationBackground?.map((edu, index) => `
Education ${index + 1}:
- School: ${edu.school}
- Major: ${edu.major}
- Started: ${edu.startedDate}
- Finished: ${edu.finishedDate}
- Grade: ${edu.grade}
`).join('')}

WORK EXPERIENCE
==============
${formData.workExperience?.map((work, index) => `
Work ${index + 1}:
- Employer: ${work.employer}
- Position: ${work.jobTitle}
- Started: ${work.startedDate}
- Finished: ${work.isPresent ? 'Present' : work.finishedDate}
`).join('')}

FAMILY INFORMATION
=================
${formData.familyMembers?.map((member, index) => `
Family Member ${index + 1}:
- Name: ${member.name}
- Nationality: ${member.nationality}
- Relationship: ${member.relationship}
- Email: ${member.email}
- Workplace: ${member.workplace}
- Position: ${member.position}
`).join('')}

FINANCIAL GUARANTOR
==================
Relationship: ${formData.guarantorRelationship}
Name: ${formData.guarantorName}
Country: ${formData.guarantorCountry}
Address: ${formData.guarantorAddress}
Email: ${formData.guarantorEmail}

EMERGENCY CONTACT
================
Name: ${formData.emergencyContact.name}
Country: ${formData.emergencyContact.country}
Email: ${formData.emergencyContact.email}
Address: ${formData.emergencyContact.completeAddress}

PAYMENT SUMMARY
===============
Application Fee: 4000 MAD
Service Charge: 11000 MAD
Total: 15000 MAD

This is a draft application form. Please complete all steps and submit for processing.
    `;
    
    return content;
  };

  // Submit application
  const submitApplication = async () => {
    try {
      setLoading(true);
      
      // Validate final step
      if (!formData.finalDeclaration) {
        console.log('Please accept the final declaration before submitting.');
        return;
      }
      
      // Validate all steps are complete
      for (let i = 1; i <= 5; i++) {
        if (!isStepValid(i)) {
          console.log(`Please complete step ${i} before submitting.`);
          return;
        }
      }
      
      if (!applicationId) {
        console.log('No application ID found. Please save your progress first.');
        return;
      }
      
      // Prepare final application data for submission
      const finalApplicationData = {
        ...formData,
        currentStep: 5,
        status: 'SUBMITTED',
        submittedAt: new Date().toISOString(),
        // Program information
        programName: selectedProgram?.name || 'Unknown Program',
        universityName: selectedProgram?.university || 'Unknown University',
        applicationFees: selectedProgram?.applicationFee?.toString() || '4000',
        serviceFees: selectedProgram?.serviceFee?.toString() || '11000',
        // Map form data to backend entity structure
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dateOfBirth: formData.dateOfBirth,
        placeOfBirth: formData.placeOfBirth,
        gender: formData.gender,
        maritalStatus: formData.maritalStatus,
        passportNumber: formData.passportNumber,
        passportExpiry: formData.passportExpiry,
        englishLevel: formData.englishLevel,
        englishCertificate: formData.englishCertificate,
        englishScore: formData.englishScore,
        country: formData.country,
        fullAddress: formData.fullAddress,
        // Convert arrays to JSON strings for backend storage
        educationBackground: JSON.stringify(formData.educationBackground),
        workExperience: JSON.stringify(formData.workExperience),
        familyMembers: JSON.stringify(formData.familyMembers),
        // Guarantor information
        guarantorRelationship: formData.guarantorRelationship,
        guarantorName: formData.guarantorName,
        guarantorCountry: formData.guarantorCountry,
        guarantorAddress: formData.guarantorAddress,
        guarantorEmail: formData.guarantorEmail,
        guarantorWorkplace: formData.guarantorWorkplace,
        guarantorWorkplaceAddress: formData.guarantorWorkplaceAddress,
        // Emergency contact
        emergencyName: formData.emergencyContact?.name,
        emergencyCountry: formData.emergencyContact?.country,
        emergencyEmail: formData.emergencyContact?.email,
        emergencyAddress: formData.emergencyContact?.completeAddress,
        // Declarations
        declaration1: formData.declarations?.termsAccepted || false,
        declaration2: formData.declarations?.privacyAccepted || false,
        declaration3: formData.declarations?.accuracyAccepted || false,
        declaration4: formData.declarations?.paymentAccepted || false,
        declaration5: formData.declarations?.refundAccepted || false,
        declaration6: formData.declarations?.complianceAccepted || false,
        finalDeclaration: formData.finalDeclaration,
        // Payment information
        paymentMethod: formData.payment?.method,
        paymentAmount: formData.payment?.amount?.toString(),
        paymentCurrency: formData.payment?.currency || 'MAD',
        // Document paths (if documents were uploaded)
        passportPath: formData.documents?.passport?.name,
        academicCertificatePath: formData.documents?.academicCertificate?.name,
        academicTranscriptPath: formData.documents?.academicTranscript?.name,
        languageCertificatePath: formData.documents?.languageCertificate?.name,
        physicalExaminationPath: formData.documents?.physicalExamination?.name,
        nonCriminalCertificatePath: formData.documents?.noCriminalCertificate?.name,
        bankStatementPath: formData.documents?.bankStatement?.name,
        photoPath: formData.documents?.photo?.name,
        resumePath: formData.documents?.resume?.name,
        awardCertificatesPath: formData.documents?.awardCertificates?.name,
        parentIdPath: formData.documents?.parentId?.name
      };
      
      // Submit the application to the backend
      const response = await applicationService.submitApplication(applicationId);
      
      if (response) {
        // Update local storage with final data
        localStorage.setItem('applicationFormData', JSON.stringify(finalApplicationData));
        localStorage.setItem('applicationStatus', 'SUBMITTED');
        
        toast.success('Application submitted successfully! Check your email for confirmation.');
        
        // Navigate to dashboard or confirmation page
        navigate('/dashboard', { 
          state: { 
            applicationSubmitted: true, 
            applicationId: applicationId,
            programName: selectedProgram?.name 
          } 
        });
      } else {
        throw new Error('Failed to submit application');
      }
      
    } catch (error) {
      console.error('Error submitting application:', error);
      // Suppression du toast d'erreur - gestion silencieuse
    } finally {
      setLoading(false);
    }
  };

  // Save progress
  const saveApplicationProgress = async () => {
    try {
      setSaving(true);
      
      // Prepare data for saving - map to backend entity structure
      const dataToSave = {
        // Basic information
        email: formData.email || 'temp@example.com',
        firstName: formData.firstName || 'Temporary',
        lastName: formData.lastName || 'User',
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        dateOfBirth: formData.dateOfBirth,
        placeOfBirth: formData.placeOfBirth,
        gender: formData.gender,
        maritalStatus: formData.maritalStatus,
        passportNumber: formData.passportNumber,
        passportExpiry: formData.passportExpiry,
        englishLevel: formData.englishLevel,
        englishCertificate: formData.englishCertificate,
        englishScore: formData.englishScore,
        country: formData.country || 'Morocco',
        fullAddress: formData.fullAddress,
        province: formData.province,
        postalCode: formData.postalCode,
        
        // Program information
        programName: selectedProgram?.name,
        universityName: selectedProgram?.university,
        applicationFees: selectedProgram?.applicationFee?.toString(),
        serviceFees: selectedProgram?.serviceFee?.toString(),
        
        // Convert arrays to JSON strings for backend storage
        educationBackground: JSON.stringify(formData.educationBackground),
        workExperience: JSON.stringify(formData.workExperience),
        familyMembers: JSON.stringify(formData.familyMembers),
        
        // Guarantor information
        guarantorRelationship: formData.guarantorRelationship,
        guarantorName: formData.guarantorName,
        guarantorCountry: formData.guarantorCountry,
        guarantorAddress: formData.guarantorAddress,
        guarantorEmail: formData.guarantorEmail,
        guarantorWorkplace: formData.guarantorWorkplace,
        guarantorWorkplaceAddress: formData.guarantorWorkplaceAddress,
        
        // Emergency contact
        emergencyName: formData.emergencyContact?.name,
        emergencyCountry: formData.emergencyContact?.country,
        emergencyEmail: formData.emergencyContact?.email,
        emergencyAddress: formData.emergencyContact?.completeAddress,
        
        // Declarations
        declaration1: formData.declarations?.termsAccepted || false,
        declaration2: formData.declarations?.privacyAccepted || false,
        declaration3: formData.declarations?.accuracyAccepted || false,
        declaration4: formData.declarations?.paymentAccepted || false,
        declaration5: formData.declarations?.refundAccepted || false,
        declaration6: formData.declarations?.complianceAccepted || false,
        finalDeclaration: formData.finalDeclaration,
        
        // Payment information
        paymentMethod: formData.payment?.method,
        paymentAmount: formData.payment?.amount?.toString(),
        paymentCurrency: formData.payment?.currency || 'MAD',
        
        // Document paths (if documents were uploaded)
        passportPath: formData.documents?.passport?.name,
        academicCertificatePath: formData.documents?.academicCertificate?.name,
        academicTranscriptPath: formData.documents?.academicTranscript?.name,
        languageCertificatePath: formData.documents?.languageCertificate?.name,
        physicalExaminationPath: formData.documents?.physicalExamination?.name,
        nonCriminalCertificatePath: formData.documents?.noCriminalCertificate?.name,
        bankStatementPath: formData.documents?.bankStatement?.name,
        photoPath: formData.documents?.photo?.name,
        resumePath: formData.documents?.resume?.name,
        awardCertificatesPath: formData.documents?.awardCertificates?.name,
        parentIdPath: formData.documents?.parentId?.name,
        
        // Application status
        currentStep: currentStep,
        status: 'DRAFT',
        lastSaved: new Date().toISOString()
      };
        
      if (!applicationId) {
        // Create new application
        try {
          const response = await applicationService.createApplication(dataToSave);
          setApplicationId(response.id);
          toast.success('New application created successfully!');
          
          // Save to localStorage as backup
          localStorage.setItem('applicationFormData', JSON.stringify(dataToSave));
          localStorage.setItem('applicationId', response.id);
          
        } catch (error) {
          console.error('Error creating application:', error);
          
          // Fallback: save to localStorage only
          const tempId = 'temp_' + Date.now();
          localStorage.setItem('applicationFormData', JSON.stringify(dataToSave));
          localStorage.setItem('applicationId', tempId);
          setApplicationId(tempId);
          
          console.log('Saved locally. Please check your internet connection and try again.');
        }
      } else {
        // Update existing application
        try {
          await applicationService.updateApplication(applicationId, dataToSave);
          toast.success('Progress saved successfully!');
          
          // Update localStorage
          localStorage.setItem('applicationFormData', JSON.stringify(dataToSave));
          
        } catch (error) {
          console.error('Error saving progress:', error);
          
          // Fallback: save to localStorage only
          localStorage.setItem('applicationFormData', JSON.stringify(dataToSave));
          console.log('Saved locally. Please check your internet connection and try again.');
        }
      }
      
        } catch (error) {
          console.error('Error saving progress:', error);
          // Suppression du toast d'erreur - gestion silencieuse
        } finally {
          setSaving(false);
        }
  };

  // Initialize on mount
  useEffect(() => {
    const initializeApplication = async () => {
      try {
        // Get program data from navigation state
        if (location.state && location.state.program) {
          setSelectedProgram(location.state.program);
        } else {
          // Fallback: try to get from localStorage or set default
          const savedProgram = localStorage.getItem('selectedProgram');
          if (savedProgram) {
            setSelectedProgram(JSON.parse(savedProgram));
          } else {
            // No program selected, redirect to programs page
            console.log('No program selected. Please select a program first.');
            navigate('/programs');
            return;
          }
        }
        
        // FORCER le démarrage à l'étape 1 pour chaque nouveau programme
        setCurrentStep(1);
        
        // Nettoyer les données précédentes pour ce nouveau programme
        localStorage.removeItem('applicationFormData');
        localStorage.removeItem('applicationId');
        
        // Générer un nouvel ID d'application pour chaque programme
        const newApplicationId = `temp_${Date.now()}`;
        setApplicationId(newApplicationId);
        
        // Try to create new application or connect to existing one
        try {
          const savedId = localStorage.getItem('applicationId');
          if (savedId) {
            // Try to get existing application
            const existingApp = await applicationService.getApplicationById(savedId);
            if (existingApp) {
              setApplicationId(savedId);
              toast.success('Connected to existing application');
              return;
            }
          }
          
          // Create new application with minimal data
          const minimalData = {
            email: formData.email || 'temp@example.com',
            firstName: formData.firstName || 'Temporary',
            lastName: formData.lastName || 'User',
            country: 'Morocco',
            status: 'DRAFT',
            currentStep: 1,
            programId: selectedProgram?.id
          };
          const response = await applicationService.createApplication(minimalData);
          setApplicationId(response.id);
          toast.success('New application created');
        } catch (error) {
          console.error('Error with application:', error);
          console.log('Working in offline mode. Data will be saved locally.');
        }
      } catch (error) {
        console.error('Error initializing application:', error);
        toast.warning('Working in offline mode. Data will be saved locally.');
      }
    };
    
    initializeApplication();
    
    // Cleanup function to clear timeout
    return () => {
      if (autoSaveTimeout.current) {
        clearTimeout(autoSaveTimeout.current);
      }
    };
  }, [location.state, navigate]);

  // Function to download application as PDF from backend
  const downloadApplicationPdf = async () => {
    if (!applicationId) {
      console.log('No application ID found');
      return;
    }
    
    try {
      setLoading(true);
      
      // Appel à l'API backend pour générer et télécharger le PDF
      const response = await fetch(`http://localhost:8080/api/applications/${applicationId}/download-pdf`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Récupérer le PDF comme blob
      const pdfBlob = await response.blob();
      
      // Créer l'URL et télécharger
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Application_${applicationId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('PDF téléchargé avec succès !');
      
    } catch (error) {
      console.error('Erreur lors du téléchargement du PDF:', error);
      // Suppression du toast d'erreur - gestion silencieuse
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour gérer le succès du paiement
  const handlePaymentSuccess = () => {
    try {
      console.log('🚀 Début du traitement du paiement...');
      console.log('📋 État actuel du formulaire:', {
        currentStep,
        paymentMethod: formData.payment.method,
        finalDeclaration: formData.finalDeclaration,
        isStepValid: isStepValid(5)
      });
      
      // Vérifier que toutes les données nécessaires sont présentes
      if (!formData.payment.method || !formData.finalDeclaration) {
        console.log('Veuillez remplir tous les champs requis et accepter la déclaration finale');
        console.log('❌ Validation échouée:', {
          method: formData.payment.method,
          finalDeclaration: formData.finalDeclaration
        });
        return;
      }
      
      // Construire les données de paiement
      const paymentData = {
        amount: 15000,
        currency: 'MAD',
        method: formData.payment.method,
        refNumber: `REF${Date.now()}`,
        paymentTime: new Date().toLocaleString('fr-FR'),
        senderName: `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || 'Étudiant',
        applicationId: applicationId || `APP_${Date.now()}`,
        studentEmail: formData.email || 'student@example.com',
        programName: selectedProgram?.name || 'Programme',
        universityName: selectedProgram?.university || 'Université',
        documents: formData.documents || {}
      };
      
      console.log('📊 Données de paiement construites:', paymentData);
      
      // Sauvegarder temporairement les données
      localStorage.setItem('paymentData', JSON.stringify(paymentData));
      
      // Rediriger vers la page de succès avec les données
      console.log('🔄 Redirection vers la page de succès...');
      console.log('📍 URL de redirection:', `/payment-success?data=${encodeURIComponent(JSON.stringify(paymentData))}`);
      
      // Utiliser setTimeout pour s'assurer que les logs s'affichent
      setTimeout(() => {
        window.location.href = `/payment-success?data=${encodeURIComponent(JSON.stringify(paymentData))}`;
      }, 100);
      
    } catch (error) {
      console.error('❌ Erreur lors du traitement du paiement:', error);
      // Suppression du toast d'erreur - gestion silencieuse
    }
  };

  // ===== AUTO-SAVE FUNCTIONALITY =====
  
  const autoSaveApplication = async () => {
    if (!applicationId || saving) return;
    
    try {
      setSaving(true);
      
      // Préparer les données pour la sauvegarde
      const saveData = {
        ...formData,
        currentStep: currentStep,
        status: currentStep === 1 ? 'DRAFT' : 'IN_PROGRESS'
      };
      
      // Sauvegarder automatiquement
      await applicationService.autoSaveApplication(applicationId, saveData);
      
      console.log('✅ Application sauvegardée automatiquement');
      
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde automatique:', error);
      // Sauvegarde locale en cas d'erreur réseau
      try {
        localStorage.setItem('applicationFormData', JSON.stringify(saveData));
        localStorage.setItem('applicationId', applicationId);
        console.log('✅ Sauvegarde locale de secours effectuée');
      } catch (localError) {
        console.error('❌ Erreur sauvegarde locale:', localError);
      }
    } finally {
      setSaving(false);
    }
  };

  const saveApplicationStep = async (step) => {
    if (!applicationId || saving) return;
    
    try {
      setSaving(true);
      
      // Préparer les données pour la sauvegarde
      const saveData = {
        ...formData,
        currentStep: step,
        status: step === 1 ? 'DRAFT' : 'IN_PROGRESS'
      };
      
      // Sauvegarder l'étape
      await applicationService.saveApplicationStep(applicationId, step, saveData);
      
      console.log(`✅ Étape ${step} sauvegardée`);
      toast.success(`Étape ${step} sauvegardée avec succès`);
      
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde de l\'étape:', error);
      // Suppression du toast d'erreur - gestion silencieuse
    } finally {
      setSaving(false);
    }
  };

  return (
    <GlobalLayout activePage="apply">
      <div className="apply-container-new">
        {/* Header avec logo et nom du programme */}
        <div className="apply-header-new">
          {selectedProgram && (
            <div className="program-header-info">
              <div className="program-logo-container">
                <img 
                  src={selectedProgram.logo || '/src/assets/logo.png'} 
                  alt={`${selectedProgram.name} Logo`}
                  className="program-logo"
                />
              </div>
              <div className="program-info">
                <h1 className="program-name">{selectedProgram.name}</h1>
                <p className="program-university">{selectedProgram.university}</p>
                <p className="program-details">
                  {selectedProgram.level} • {selectedProgram.duration} • {selectedProgram.language}
                </p>
              </div>
            </div>
          )}
          <div className="application-title">
            <h1>{getText('applicationForm')}</h1>
            <p>{getText('completeApplicationIn5Steps')}</p>
          </div>
        </div>

        {/* Main content */}
        <div className="apply-content-new">
          {/* Left side - Your Application */}
          <div className="form-container-new">
            <h2 className="main-title-new">{getText('yourApplication')}</h2>
            
            {/* Progress Bar with 5 Steps */}
            <div className="progress-bar-container-new">
              <div className="progress-steps-new">
                <div className={`progress-step-new ${currentStep >= 1 ? 'completed' : ''} ${currentStep === 1 ? 'current' : ''}`}>
                  <div className={`progress-number-new ${currentStep >= 1 ? 'completed' : ''} ${currentStep === 1 ? 'current' : ''}`}>1</div>
                  <div className="progress-label-new">{getText('yourInformation')}</div>
                </div>
                <div className={`progress-step-new ${currentStep >= 2 ? 'completed' : ''} ${currentStep === 2 ? 'current' : ''}`}>
                  <div className={`progress-number-new ${currentStep >= 2 ? 'completed' : ''} ${currentStep === 2 ? 'current' : ''}`}>2</div>
                  <div className="progress-label-new">{getText('yourFamily')}</div>
                </div>
                <div className={`progress-step-new ${currentStep >= 3 ? 'completed' : ''} ${currentStep === 3 ? 'current' : ''}`}>
                  <div className={`progress-number-new ${currentStep >= 3 ? 'completed' : ''} ${currentStep === 3 ? 'current' : ''}`}>3</div>
                  <div className="progress-label-new">{getText('declarationAgreement')}</div>
                </div>
                <div className={`progress-step-new ${currentStep >= 4 ? 'completed' : ''} ${currentStep === 4 ? 'current' : ''}`}>
                  <div className={`progress-number-new ${currentStep >= 4 ? 'completed' : ''} ${currentStep === 4 ? 'current' : ''}`}>4</div>
                  <div className="progress-label-new">{getText('uploadDocuments')}</div>
                </div>
                <div className={`progress-step-new ${currentStep >= 5 ? 'completed' : ''} ${currentStep === 5 ? 'current' : ''}`}>
                  <div className={`progress-number-new ${currentStep >= 5 ? 'completed' : ''} ${currentStep === 5 ? 'current' : ''}`}>5</div>
                  <div className="progress-label-new">{getText('finalStep')}</div>
                </div>
              </div>
            </div>

            {/* Step 1: Your Information */}
        {currentStep === 1 && (
              <div className="form-section-new">
                <h2 className="section-title-new">1) {getText('contactDetails')}</h2>
                
                <div className="form-group-new">
                  <label>{getText('emailAddress')} *</label>
              <input
                type="email"
                    className="form-control-new"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder={getText('enterYourEmailAddress')}
              />
            </div>

                <div className="form-group-new">
                  <label>
                    Numéro de téléphone <span className="required">*</span>
                    <span 
                      className="help-icon" 
                      data-tip="Format requis: +212XXXXXXXXX (Maroc)"
                      data-for="phone-help"
                    >
                      <i className="fas fa-question-circle"></i>
                    </span>
                  </label>
                  <input
                    type="text"
                    className={`form-control-new ${fieldValidations.phone ? 'valid' : fieldErrors.phone ? 'invalid' : ''}`}
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+212XXXXXXXXX"
                  />
                  {fieldErrors.phone && (
                    <div className="error-message">
                      {fieldErrors.phone}
                    </div>
                  )}
                  <div className="field-help">
                    <i className="fas fa-info-circle"></i>
                    Format requis : +212XXXXXXXXX (Maroc)
                  </div>
                  <Tooltip id="phone-help" effect="solid" />
                </div>

                <div className="form-group-new">
                  <label>
                    Numéro WhatsApp <span className="required">*</span>
                    <span 
                      className="help-icon" 
                      data-tip="Format requis: +212XXXXXXXXX (Maroc)"
                      data-for="whatsapp-help"
                    >
                      <i className="fas fa-question-circle"></i>
                    </span>
                  </label>
                  <input
                    type="text"
                    className={`form-control-new ${fieldValidations.whatsapp ? 'valid' : fieldErrors.whatsapp ? 'invalid' : ''}`}
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                    placeholder="+212XXXXXXXXX (si différent du téléphone)"
                  />
                  {fieldErrors.whatsapp && (
                    <div className="error-message">
                      {fieldErrors.whatsapp}
                    </div>
                  )}
                  <div className="field-help">
                    <i className="fas fa-info-circle"></i>
                    Format requis : +212XXXXXXXXX (Maroc)
                  </div>
                  <Tooltip id="whatsapp-help" effect="solid" />
                </div>

                <h2 className="section-title-new">2) Student's Information</h2>

                <div className="form-group-new">
                  <label>First name *</label>
              <input
                type="text"
                    className="form-control-new"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name (min 2, max 50 characters)"
                    minLength="2"
                    maxLength="50"
                  />
                </div>

                <div className="form-group-new">
                  <label>Last name *</label>
                  <input
                    type="text"
                    className="form-control-new"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name (min 2, max 50 characters)"
                    minLength="2"
                    maxLength="50"
                  />
                </div>

                <div className="form-group-new">
                  <label>
                    Date de naissance <span className="required">*</span>
                    <span 
                      className="help-icon" 
                      data-tip="Vous devez avoir au moins 15 ans pour postuler"
                      data-for="dateOfBirth-help"
                    >
                      <i className="fas fa-question-circle"></i>
                    </span>
                  </label>
                  <ModernDatePicker
                    value={formData.dateOfBirth}
                    onChange={(date) => handleInputChange('dateOfBirth', date)}
                    placeholder="Select your date of birth"
                    maxDate={new Date().toISOString().split('T')[0]}
                    minDate="1900-01-01"
                    className={`form-control-new ${fieldValidations.dateOfBirth ? 'valid' : fieldErrors.dateOfBirth ? 'invalid' : ''}`}
                  />
                  {fieldErrors.dateOfBirth && (
                    <div className="error-message">
                      {fieldErrors.dateOfBirth}
                    </div>
                  )}
                  <div className="field-help">
                    <i className="fas fa-info-circle"></i>
                    Âge minimum requis : 15 ans
                  </div>
                  <Tooltip id="dateOfBirth-help" effect="solid" />
                </div>

                <div className="form-group-new">
                  <label>Place of birth *</label>
              <input
                type="text"
                    className="form-control-new"
                value={formData.placeOfBirth}
                onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                    placeholder="Enter city/town"
              />
            </div>

                <div className="form-group-new">
              <label>Gender *</label>
              <select
                    className="form-control-new"
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

                <div className="form-group-new">
                  <label>Marital status *</label>
              <select
                    className="form-control-new"
                value={formData.maritalStatus}
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
              >
                <option value="">Select marital status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>

                <div className="form-group-new">
                  <label>
                    Numéro de passeport <span className="required">*</span>
                    <span 
                      className="help-icon" 
                      data-tip="Format: 6-15 caractères alphanumériques en majuscules"
                      data-for="passportNumber-help"
                    >
                      <i className="fas fa-question-circle"></i>
                    </span>
                  </label>
                  <input
                    type="text"
                    className={`form-control-new ${fieldValidations.passportNumber ? 'valid' : fieldErrors.passportNumber ? 'invalid' : ''}`}
                    value={formData.passportNumber}
                    onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                    placeholder="6-15 caractères alphanumériques, majuscules"
                    minLength="6"
                    maxLength="15"
                  />
                  {fieldErrors.passportNumber && (
                    <div className="error-message">
                      {fieldErrors.passportNumber}
                    </div>
                  )}
                  <div className="field-help">
                    <i className="fas fa-info-circle"></i>
                    Format : 6-15 caractères alphanumériques en majuscules
                  </div>
                  <Tooltip id="passportNumber-help" effect="solid" />
                </div>

                <div className="form-group-new">
                  <label>
                    Date d'expiration du passeport <span className="required">*</span>
                    <span 
                      className="help-icon" 
                      data-tip="Le passeport doit être valide au moins 6 mois après la date de candidature"
                      data-for="passportExpiry-help"
                    >
                      <i className="fas fa-question-circle"></i>
                    </span>
                  </label>
                  <ModernDatePicker
                    value={formData.passportExpiry}
                    onChange={(date) => handleInputChange('passportExpiry', date)}
                    placeholder="Passport expiry date"
                    minDate={new Date().toISOString().split('T')[0]}
                    className={`form-control-new ${fieldValidations.passportExpiry ? 'valid' : fieldErrors.passportExpiry ? 'invalid' : ''}`}
                  />
                  {fieldErrors.passportExpiry && (
                    <div className="error-message">
                      {fieldErrors.passportExpiry}
                    </div>
                  )}
                  <div className="field-help">
                    <i className="fas fa-info-circle"></i>
                    Validité minimum : 6 mois après la candidature
                  </div>
                  <Tooltip id="passportExpiry-help" effect="solid" />
                </div>

                <h2 className="section-title-new">3) Language Proficiency</h2>

                <div className="form-group-new">
                  <label>English level *</label>
                  <select
                    className="form-control-new"
                    value={formData.englishLevel}
                    onChange={(e) => handleInputChange('englishLevel', e.target.value)}
                  >
                    <option value="">Select English level</option>
                    <option value="Poor">Poor</option>
                    <option value="Fair">Fair</option>
                    <option value="Good">Good</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Excellent">Excellent</option>
                  </select>
                </div>

                <div className="form-group-new">
                  <label>Certificate of English Proficiency *</label>
                  <select
                    className="form-control-new"
                    value={formData.englishCertificate}
                    onChange={(e) => handleInputChange('englishCertificate', e.target.value)}
                  >
                    <option value="">Select certificate type</option>
                    <option value="IELTS">IELTS</option>
                    <option value="TOEFL">TOEFL</option>
                    <option value="Duolingo">Duolingo</option>
                    <option value="Other">Other</option>
                    <option value="None">None</option>
                  </select>
                </div>

                {formData.englishCertificate && formData.englishCertificate !== 'None' && (
                  <div className="form-group-new">
                    <label>Score</label>
                    <input
                      type="text"
                      className="form-control-new"
                      value={formData.englishScore}
                      onChange={(e) => handleInputChange('englishScore', e.target.value)}
                      placeholder="Enter your score"
                    />
                  </div>
                )}

                <h2 className="section-title-new">4) Home Address Details</h2>

                <div className="form-group-new">
              <label>Country *</label>
              <ModernCountrySelector
                value={formData.country}
                onChange={(country) => handleInputChange('country', country)}
                placeholder="Select your country"
                className="form-control-new"
              />
            </div>

                <div className="form-group-new">
                  <label>Full address *</label>
              <textarea
                    className="form-control-new"
                value={formData.fullAddress}
                onChange={(e) => handleInputChange('fullAddress', e.target.value)}
                    placeholder="Street, city, province, postal code"
                rows="3"
              />
            </div>

                <h2 className="section-title-new">5) Educational Background (repeatable block)</h2>
                
                {Array.isArray(formData.educationBackground) && formData.educationBackground.map((education, index) => (
                  <div key={index} className="education-block-new">
                    <h3>Education {index + 1}</h3>
                    <div className="form-group-new">
                      <label>School *</label>
              <input
                type="text"
                        className="form-control-new"
                        value={education.school}
                        onChange={(e) => handleArrayChange('educationBackground', index, { school: e.target.value })}
                        placeholder="Enter school name"
              />
            </div>
                    <div className="form-group-new">
                      <label>Major</label>
              <input
                type="text"
                        className="form-control-new"
                        value={education.major}
                        onChange={(e) => handleArrayChange('educationBackground', index, { major: e.target.value })}
                        placeholder="Enter major/field of study"
              />
            </div>
                    <div className="form-group-new">
                      <label>Started date *</label>
                      <ModernDatePicker
                        value={education.startedDate}
                        onChange={(date) => handleArrayChange('educationBackground', index, { startedDate: date })}
                        placeholder="Select start date"
                        maxDate={new Date().toISOString().split('T')[0]}
                        minDate="1950-01-01"
                        className="form-control-new"
                      />
            </div>
                    <div className="form-group-new">
                      <label>Finished date *</label>
                      <ModernDatePicker
                        value={education.finishedDate}
                        onChange={(date) => handleArrayChange('educationBackground', index, { finishedDate: date })}
                        placeholder="Select end date"
                        maxDate={new Date().toISOString().split('T')[0]}
                        minDate="1950-01-01"
                        className="form-control-new"
                      />
            </div>
                    <div className="form-group-new">
                      <label>Grade / GPA</label>
              <input
                type="text"
                        className="form-control-new"
                        value={education.grade}
                        onChange={(e) => handleArrayChange('educationBackground', index, { grade: e.target.value })}
                        placeholder="Enter grade or GPA"
              />
            </div>
                    {formData.educationBackground.length > 1 && (
                      <button 
                        type="button" 
                        className="remove-btn-new"
                        onClick={() => removeEducationBackground(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                
                <button type="button" className="add-btn-new" onClick={addEducationBackground}>
                  + Add Education Background
                </button>

                <h2 className="section-title-new">6) Work Experience (repeatable block)</h2>
                
                {Array.isArray(formData.workExperience) && formData.workExperience.map((work, index) => (
                  <div key={index} className="work-block-new">
                    <h3>Work Experience {index + 1}</h3>
                    <div className="form-group-new">
                      <label>Employer *</label>
              <input
                type="text"
                        className="form-control-new"
                        value={work.employer}
                        onChange={(e) => handleArrayChange('workExperience', index, { employer: e.target.value })}
                        placeholder="Enter employer name"
              />
            </div>
                    <div className="form-group-new">
                      <label>Job title *</label>
              <input
                type="text"
                        className="form-control-new"
                        value={work.jobTitle}
                        onChange={(e) => handleArrayChange('workExperience', index, { jobTitle: e.target.value })}
                        placeholder="Enter job title"
              />
            </div>
                    <div className="form-group-new">
                      <label>Started date *</label>
                      <ModernDatePicker
                        value={work.startedDate}
                        onChange={(date) => handleArrayChange('workExperience', index, { startedDate: date })}
                        placeholder="Select start date"
                        maxDate={new Date().toISOString().split('T')[0]}
                        minDate="1950-01-01"
                        className="form-control-new"
                      />
            </div>
                    <div className="form-group-new">
                      <label>Finished date</label>
                      <ModernDatePicker
                        value={work.finishedDate}
                        onChange={(date) => handleArrayChange('workExperience', index, { finishedDate: date })}
                        placeholder="Select end date"
                        maxDate={new Date().toISOString().split('T')[0]}
                        minDate="1950-01-01"
                        disabled={work.isPresent}
                        className="form-control-new"
                      />
            </div>
                    <div className="form-group-new">
                      <label>
              <input
                          type="checkbox"
                          checked={work.isPresent}
                          onChange={(e) => handleArrayChange('workExperience', index, { isPresent: e.target.checked })}
                        />
                        Present
                      </label>
            </div>
                    {formData.workExperience.length > 1 && (
                      <button 
                        type="button" 
                        className="remove-btn-new"
                        onClick={() => removeWorkExperience(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                
                <button type="button" className="add-btn-new" onClick={addWorkExperience}>
                  + Add Work Experience
                </button>

                {/* Continue Button for Step 1 */}
                <div className="continue-button-section">
                  <button 
                    type="button"
                    className="continue-button-perfect"
                    onClick={() => setCurrentStep(2)}
                    disabled={!isStepValid(1)}
                  >
                    Continue to Next Step →
                  </button>
                </div>
              </div>
            )}

                        {/* Step 2: Your Family */}
            {currentStep === 2 && (
              <div className="form-section-new">
                <h2 className="section-title-new">A) Family Contact (repeatable)</h2>
                
            {Array.isArray(formData.familyMembers) && formData.familyMembers.map((member, index) => (
                  <div key={index} className="family-member-item-new">
                    <h3>Family Member {index + 1}</h3>
                    <div className="form-group-new">
                      <label>Name *</label>
                  <input
                    type="text"
                        className="form-control-new"
                    value={member.name || ''}
                    onChange={(e) => handleArrayChange('familyMembers', index, { name: e.target.value })}
                    placeholder="Full name"
                  />
                    </div>
                    <div className="form-group-new">
                      <label>Nationality *</label>
                      <select
                        className="form-control-new"
                    value={member.nationality || ''}
                    onChange={(e) => handleArrayChange('familyMembers', index, { nationality: e.target.value })}
                      >
                        <option value="">Select nationality</option>
                        <option value="Morocco">🇲🇦 Morocco</option>
                        <option value="Algeria">🇩🇿 Algeria</option>
                        <option value="Tunisia">🇹🇳 Tunisia</option>
                        <option value="Egypt">🇪🇬 Egypt</option>
                        <option value="Senegal">🇸🇳 Senegal</option>
                        <option value="Ivory Coast">🇨🇮 Ivory Coast</option>
                        <option value="Nigeria">🇳🇬 Nigeria</option>
                        <option value="Ghana">🇬🇭 Ghana</option>
                        <option value="Kenya">🇰🇪 Kenya</option>
                        <option value="South Africa">🇿🇦 South Africa</option>
                      </select>
                    </div>
                    <div className="form-group-new">
                      <label>Email</label>
                      <input
                        type="email"
                        className="form-control-new"
                        value={member.email || ''}
                        onChange={(e) => handleArrayChange('familyMembers', index, { email: e.target.value })}
                        placeholder="Email address"
                      />
                    </div>
                    <div className="form-group-new">
                      <label>Workplace</label>
                  <input
                    type="text"
                        className="form-control-new"
                    value={member.workplace || ''}
                    onChange={(e) => handleArrayChange('familyMembers', index, { workplace: e.target.value })}
                    placeholder="Workplace"
                  />
                    </div>
                    <div className="form-group-new">
                      <label>Position</label>
                      <input
                        type="text"
                        className="form-control-new"
                        value={member.position || ''}
                        onChange={(e) => handleArrayChange('familyMembers', index, { position: e.target.value })}
                        placeholder="Position"
                      />
                    </div>
                    <div className="form-group-new">
                      <label>Relationship *</label>
                      <select
                        className="form-control-new"
                    value={member.relationship || ''}
                    onChange={(e) => handleArrayChange('familyMembers', index, { relationship: e.target.value })}
                      >
                        <option value="">Select relationship</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Guardian">Guardian</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                      </select>
                </div>
                    {formData.familyMembers.length > 1 && (
                      <button 
                        type="button" 
                        className="remove-btn-new"
                        onClick={() => removeFamilyMember(index)}
                      >
                        Remove
                      </button>
                    )}
              </div>
            ))}
                
                <button type="button" className="add-btn-new" onClick={addFamilyMember}>
                  + ADD A FAMILY MEMBER
            </button>

                <h2 className="section-title-new">B) Financial Supporter (Guarantor)</h2>
                
                <div className="form-group-new">
                  <label>Relationship *</label>
              <select
                    className="form-control-new"
                value={formData.guarantorRelationship}
                onChange={(e) => handleInputChange('guarantorRelationship', e.target.value)}
              >
                <option value="">Select relationship</option>
                <option value="Self">Self</option>
                <option value="Parent">Parent</option>
                <option value="Guardian">Guardian</option>
                <option value="Friend">Friend</option>
                <option value="Company">Company</option>
                <option value="Government">Government</option>
              </select>
            </div>

                <div className="form-group-new">
                  <label>Guarantor's name *</label>
              <input
                type="text"
                    className="form-control-new"
                value={formData.guarantorName}
                onChange={(e) => handleInputChange('guarantorName', e.target.value)}
                placeholder="Enter guarantor name"
              />
            </div>

                <div className="form-group-new">
                  <label>Guarantor's country *</label>
                  <ModernCountrySelector
                    value={formData.guarantorCountry}
                    onChange={(country) => handleInputChange('guarantorCountry', country)}
                    placeholder="Select country"
                    className="form-control-new"
                  />
            </div>

                <div className="form-group-new">
                  <label>Guarantor's address *</label>
              <textarea
                    className="form-control-new"
                value={formData.guarantorAddress}
                onChange={(e) => handleInputChange('guarantorAddress', e.target.value)}
                placeholder="Enter guarantor address"
                rows="3"
              />
            </div>

                <div className="form-group-new">
                  <label>Guarantor's email</label>
              <input
                type="email"
                    className="form-control-new"
                value={formData.guarantorEmail}
                onChange={(e) => handleInputChange('guarantorEmail', e.target.value)}
                placeholder="Enter guarantor email"
              />
            </div>

                <div className="form-group-new">
                  <label>Workplace</label>
              <input
                type="text"
                    className="form-control-new"
                value={formData.guarantorWorkplace}
                onChange={(e) => handleInputChange('guarantorWorkplace', e.target.value)}
                placeholder="Enter workplace"
              />
            </div>

                <div className="form-group-new">
                  <label>Workplace address</label>
                  <textarea
                    className="form-control-new"
                    value={formData.guarantorWorkplaceAddress}
                    onChange={(e) => handleInputChange('guarantorWorkplaceAddress', e.target.value)}
                    placeholder="Enter workplace address"
                    rows="3"
                  />
                </div>

                <h2 className="section-title-new">C) Emergency Contact in China</h2>
                
                <div className="form-group-new">
                  <p className="helper-text">
                    If you don't know anyone in China, we'll assume your country's embassy in China.
                  </p>
                </div>

                <div className="form-group-new">
                  <label>Name</label>
              <input
                type="text"
                    className="form-control-new"
                value={formData.emergencyContact?.name || ''}
                onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                placeholder="Enter emergency contact name"
              />
            </div>

                <div className="form-group-new">
                  <label>Country *</label>
                  <ModernCountrySelector
                    value={formData.emergencyContact?.country || ''}
                    onChange={(country) => handleInputChange('emergencyContact.country', country)}
                    placeholder="Select country"
                    className="form-control-new"
                  />
                </div>

                <div className="form-group-new">
                  <label>Email</label>
              <input
                type="email"
                    className="form-control-new"
                value={formData.emergencyContact?.email || ''}
                onChange={(e) => handleInputChange('emergencyContact.email', e.target.value)}
                placeholder="Enter email address"
                  />
                </div>

                <div className="form-group-new">
                  <label>Complete address</label>
                  <textarea
                    className="form-control-new"
                    value={formData.emergencyContact?.completeAddress || ''}
                    onChange={(e) => handleInputChange('emergencyContact.completeAddress', e.target.value)}
                    placeholder="Enter complete address"
                    rows="3"
              />
            </div>

                {/* Navigation Buttons for Step 2 */}
                <div className="continue-button-section">
                  <button 
                    type="button"
                    className="nav-btn-new prev-btn-new"
                    onClick={prevStep}
                  >
                    ← Previous
                  </button>
                  
                  <button 
                    type="button"
                    className="continue-button-perfect"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!isStepValid(currentStep)}
                  >
                    Continue to Next Step →
                  </button>
                </div>
          </div>
        )}



            {/* Step 3: Declaration & Agreement */}
        {currentStep === 3 && (
              <div className="form-section-new">
                <h2 className="section-title-new">Declaration & Agreement</h2>
            
                <div className="form-group-new">
                  <label className="checkbox-label-new">
                <input
                  type="checkbox"
                  checked={formData.declarations?.termsAccepted || false}
                  onChange={(e) => handleInputChange('declarations.termsAccepted', e.target.checked)}
                />
                    I have read and understood the Terms and Conditions and Privacy Policy of Diravenir *
              </label>
                  <button type="button" className="view-details-link" onClick={() => setShowTermsModal(true)}>
                    View details
                  </button>
            </div>

                <div className="form-group-new">
                  <label className="checkbox-label-new">
                <input
                  type="checkbox"
                  checked={formData.declarations?.privacyAccepted || false}
                  onChange={(e) => handleInputChange('declarations.privacyAccepted', e.target.checked)}
                />
                    I give consent to Diravenir to collect, process, and share my data with relevant parties for the purpose of admission and visa processing *
              </label>
                  <button type="button" className="view-details-link" onClick={() => setShowPrivacyModal(true)}>
                    View details
                  </button>
            </div>

                <div className="form-group-new">
                  <label className="checkbox-label-new">
                <input
                  type="checkbox"
                  checked={formData.declarations?.accuracyAccepted || false}
                  onChange={(e) => handleInputChange('declarations.accuracyAccepted', e.target.checked)}
                />
                    I declare that the information and documents provided in my application are accurate and authentic to the best of my knowledge *
              </label>
            </div>

                <div className="form-group-new">
                  <label className="checkbox-label-new">
                <input
                  type="checkbox"
                  checked={formData.declarations.paymentAccepted}
                  onChange={(e) => handleInputChange('declarations.paymentAccepted', e.target.checked)}
                />
                    I have read and understood the Payment Policy of Diravenir and agree to its terms *
              </label>
                  <button type="button" className="view-details-link" onClick={() => setShowPaymentModal(true)}>
                    View details
                  </button>
            </div>

                <div className="form-group-new">
                  <label className="checkbox-label-new">
                <input
                  type="checkbox"
                  checked={formData.declarations.refundAccepted}
                  onChange={(e) => handleInputChange('declarations.refundAccepted', e.target.checked)}
                />
                    I have read and understood the Refund Policy of Diravenir and agree to its terms *
              </label>
                  <button type="button" className="view-details-link" onClick={() => setShowRefundModal(true)}>
                    View details
                  </button>
            </div>

                <div className="form-group-new">
                  <label className="checkbox-label-new">
                <input
                  type="checkbox"
                  checked={formData.declarations.complianceAccepted}
                  onChange={(e) => handleInputChange('declarations.complianceAccepted', e.target.checked)}
                />
                    I agree to attend all required courses, interviews, and exams as outlined in the application process. I will abide by the laws and regulations of the university and Diravenir *
              </label>
            </div>

                <div className="form-group-new">
                  <p className="helper-text">
                    <strong>Note:</strong> All checkboxes must be checked before proceeding to the next step.
                  </p>
            </div>

                {/* Navigation Buttons for Step 3 */}
                <div className="continue-button-section">
                  <button 
                    type="button"
                    className="nav-btn-new prev-btn-new"
                    onClick={prevStep}
                  >
                    ← Previous
                  </button>
                  
                  <button 
                    type="button"
                    className="continue-button-perfect"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!isStepValid(currentStep)}
                  >
                    Continue to Next Step →
                  </button>
                </div>
          </div>
        )}



            {/* Step 4: Upload Documents */}
        {currentStep === 4 && (
              <div className="form-section-new">
                <h2 className="section-title-new">Upload Documents</h2>
                
                <div className="form-group-new">
                  <p className="helper-text">
                    <strong>Accepted types:</strong> .jpg, .jpeg, .png, .bmp, .doc, .docx, .pdf, .xls, .xlsx | <strong>Max file size:</strong> 5MB
                  </p>
                </div>
            
            <h3>Required Documents *</h3>
            
                <div className="file-upload-new">
                  <div className="upload-icon-new">📄</div>
                  <div className="upload-text-new">Passport Pages *</div>
              <input
                type="file"
                id="passport"
                onChange={(e) => handleFileUpload('passport', e.target.files[0])}
                    accept=".jpg,.jpeg,.png,.bmp,.doc,.docx,.pdf,.xls,.xlsx"
              />
                  <label htmlFor="passport" className="file-upload-btn-new">Choose File</label>
              {formData.documents.passport && (
                    <div className="file-info-new">
                      <div className="file-name-new">{formData.documents.passport.name}</div>
                      <div className="file-size-new">{(formData.documents.passport.size / 1024 / 1024).toFixed(2)} MB</div>
                      <button type="button" className="replace-btn-new" onClick={() => handleFileUpload('passport', null)}>Replace</button>
                </div>
              )}
            </div>

                <div className="file-upload-new">
                  <div className="upload-icon-new">🎓</div>
                  <div className="upload-text-new">Highest Academic Certificate *</div>
              <input
                type="file"
                id="academicCertificate"
                onChange={(e) => handleFileUpload('academicCertificate', e.target.files[0])}
                    accept=".jpg,.jpeg,.png,.bmp,.doc,.docx,.pdf,.xls,.xlsx"
              />
                  <label htmlFor="academicCertificate" className="file-upload-btn-new">Choose File</label>
              {formData.documents.academicCertificate && (
                    <div className="file-info-new">
                      <div className="file-name-new">{formData.documents.academicCertificate.name}</div>
                      <div className="file-size-new">{(formData.documents.academicCertificate.size / 1024 / 1024).toFixed(2)} MB</div>
                      <button type="button" className="replace-btn-new" onClick={() => handleFileUpload('academicCertificate', null)}>Replace</button>
                </div>
              )}
            </div>

                <div className="file-upload-new">
                  <div className="upload-icon-new">📊</div>
                  <div className="upload-text-new">Highest Academic Transcript *</div>
              <input
                type="file"
                id="academicTranscript"
                onChange={(e) => handleFileUpload('academicTranscript', e.target.files[0])}
                    accept=".jpg,.jpeg,.png,.bmp,.doc,.docx,.pdf,.xls,.xlsx"
              />
                  <label htmlFor="academicTranscript" className="file-upload-btn-new">Choose File</label>
              {formData.documents.academicTranscript && (
                    <div className="file-info-new">
                      <div className="file-name-new">{formData.documents.academicTranscript.name}</div>
                      <div className="file-size-new">{(formData.documents.academicTranscript.size / 1024 / 1024).toFixed(2)} MB</div>
                      <button type="button" className="replace-btn-new" onClick={() => handleFileUpload('academicTranscript', null)}>Replace</button>
                </div>
              )}
            </div>

                <div className="file-upload-new">
                  <div className="upload-icon-new">🌐</div>
                  <div className="upload-text-new">Language Proficiency Certificate (if applicable)</div>
                  <input
                    type="file"
                    id="languageCertificate"
                    onChange={(e) => handleFileUpload('languageCertificate', e.target.files[0])}
                    accept=".jpg,.jpeg,.png,.bmp,.doc,.docx,.pdf,.xls,.xlsx"
                  />
                  <label htmlFor="languageCertificate" className="file-upload-btn-new">Choose File</label>
                  {formData.documents.languageCertificate && (
                    <div className="file-info-new">
                      <div className="file-name-new">{formData.documents.languageCertificate.name}</div>
                      <div className="file-size-new">{(formData.documents.languageCertificate.size / 1024 / 1024).toFixed(2)} MB</div>
                      <button type="button" className="replace-btn-new" onClick={() => handleFileUpload('languageCertificate', null)}>Replace</button>
                    </div>
                  )}
                  <label className="not-applicable-label">
                    <input
                      type="checkbox"
                      checked={!formData.documents.languageCertificate}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleFileUpload('languageCertificate', null);
                        }
                      }}
                    />
                    Not applicable
                  </label>
                </div>

                <div className="file-upload-new">
                  <div className="upload-icon-new">🏥</div>
                  <div className="upload-text-new">Physical Examination Report *</div>
                  <input
                    type="file"
                    id="physicalExamination"
                    onChange={(e) => handleFileUpload('physicalExamination', e.target.files[0])}
                    accept=".jpg,.jpeg,.png,.bmp,.doc,.docx,.pdf,.xls,.xlsx"
                  />
                  <label htmlFor="physicalExamination" className="file-upload-btn-new">Choose File</label>
                  {formData.documents.physicalExamination && (
                    <div className="file-info-new">
                      <div className="file-name-new">{formData.documents.physicalExamination.name}</div>
                      <div className="file-size-new">{(formData.documents.physicalExamination.size / 1024 / 1024).toFixed(2)} MB</div>
                      <button type="button" className="replace-btn-new" onClick={() => handleFileUpload('physicalExamination', null)}>Replace</button>
                    </div>
                  )}
                </div>

                <div className="file-upload-new">
                  <div className="upload-icon-new">⚖️</div>
                  <div className="upload-text-new">No Criminal Record Certificate *</div>
              <input
                type="file"
                id="noCriminalCertificate"
                onChange={(e) => handleFileUpload('noCriminalCertificate', e.target.files[0])}
                    accept=".jpg,.jpeg,.png,.bmp,.doc,.docx,.pdf,.xls,.xlsx"
              />
                  <label htmlFor="noCriminalCertificate" className="file-upload-btn-new">Choose File</label>
              {formData.documents.noCriminalCertificate && (
                    <div className="file-info-new">
                      <div className="file-name-new">{formData.documents.noCriminalCertificate.name}</div>
                      <div className="file-size-new">{(formData.documents.noCriminalCertificate.size / 1024 / 1024).toFixed(2)} MB</div>
                      <button type="button" className="replace-btn-new" onClick={() => handleFileUpload('noCriminalCertificate', null)}>Replace</button>
                </div>
              )}
            </div>

                <div className="file-upload-new">
                  <div className="upload-icon-new">📸</div>
                  <div className="upload-text-new">Passport Photo *</div>
              <input
                type="file"
                id="photo"
                onChange={(e) => handleFileUpload('photo', e.target.files[0])}
                    accept=".jpg,.jpeg,.png,.bmp"
              />
                  <label htmlFor="photo" className="file-upload-btn-new">Choose File</label>
              {formData.documents.photo && (
                    <div className="file-info-new">
                      <div className="file-name-new">{formData.documents.photo.name}</div>
                      <div className="file-size-new">{(formData.documents.photo.size / 1024 / 1024).toFixed(2)} MB</div>
                      <button type="button" className="replace-btn-new" onClick={() => handleFileUpload('photo', null)}>Replace</button>
                </div>
              )}
            </div>

            <h3>Optional Documents</h3>
            
                <div className="file-upload-new">
                  <div className="upload-icon-new">💼</div>
                  <div className="upload-text-new">Resume/CV</div>
              <input
                type="file"
                    id="resume"
                    onChange={(e) => handleFileUpload('resume', e.target.files[0])}
                    accept=".jpg,.jpeg,.png,.bmp,.doc,.docx,.pdf,.xls,.xlsx"
                  />
                  <label htmlFor="resume" className="file-upload-btn-new">Choose File</label>
                  {formData.documents.resume && (
                    <div className="file-info-new">
                      <div className="file-name-new">{formData.documents.resume.name}</div>
                      <div className="file-size-new">{(formData.documents.resume.size / 1024 / 1024).toFixed(2)} MB</div>
                      <button type="button" className="replace-btn-new" onClick={() => handleFileUpload('resume', null)}>Replace</button>
                </div>
              )}
            </div>

                <div className="file-upload-new">
                  <div className="upload-icon-new">🏆</div>
                  <div className="upload-text-new">Award Certificates</div>
              <input
                type="file"
                    id="awardCertificates"
                    onChange={(e) => handleFileUpload('awardCertificates', e.target.files[0])}
                    accept=".jpg,.jpeg,.png,.bmp,.doc,.docx,.pdf,.xls,.xlsx"
                  />
                  <label htmlFor="awardCertificates" className="file-upload-btn-new">Choose File</label>
                  {formData.documents.awardCertificates && (
                    <div className="file-info-new">
                      <div className="file-name-new">{formData.documents.awardCertificates.name}</div>
                      <div className="file-size-new">{(formData.documents.awardCertificates.size / 1024 / 1024).toFixed(2)} MB</div>
                      <button type="button" className="replace-btn-new" onClick={() => handleFileUpload('awardCertificates', null)}>Replace</button>
                </div>
              )}
            </div>

                {/* Navigation Buttons for Step 4 */}
                <div className="continue-button-section">
                  <button 
                    type="button"
                    className="nav-btn-new prev-btn-new"
                    onClick={prevStep}
                  >
                    ← Previous
                  </button>
                  
                  <button 
                    type="button"
                    className="continue-button-perfect"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!isStepValid(currentStep)}
                  >
                    Continue to Next Step →
                  </button>
                </div>
          </div>
        )}



        {/* Step 5: Final Step */}
        {currentStep === 5 && (
          <div className="form-section-new">
            <div className="step5-container-perfect">
              {/* Single Payment Form Card - Everything Inside */}
              <div className="payment-form-card-perfect">
                <h2 className="payment-form-title">PAYMENT FORM</h2>
                
                {/* Payment Information Section */}
                <div className="payment-info-section">
                  <h3 className="section-subtitle">PAYMENT INFORMATION</h3>
                  
                  <div className="form-row">
                    {/* Left Column */}
                    <div className="form-column">
                      <div className="form-group">
                        <label>Select a payment method</label>
                        <div className="select-container">
                          <select 
                            className="form-control"
                            value={formData.payment.method}
                            onChange={(e) => handleInputChange('payment.method', e.target.value)}
                          >
                            <option value="">-- select --</option>
                            <option value="mastercard">MasterCard</option>
                            <option value="visa">VISA</option>
                            <option value="cash_plus">Cash Plus</option>
                            <option value="cash_payment">Cash Payment</option>
                            <option value="bank_transfer">Bank Transfer</option>
                          </select>
                          <span className="select-arrow">V</span>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label>Card Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter card number"
                          value={formData.payment.cardNumber || ''}
                          onChange={(e) => handleInputChange('payment.cardNumber', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    {/* Right Column */}
                    <div className="form-column">
                      <div className="form-group">
                        <label>Expiration date</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="MM / YYYY"
                          value={formData.payment.expiryDate || ''}
                          onChange={(e) => handleInputChange('payment.expiryDate', e.target.value)}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Security code</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="CVV"
                          value={formData.payment.securityCode || ''}
                          onChange={(e) => handleInputChange('payment.securityCode', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="section-divider"></div>

                {/* Billing Information Section */}
                <div className="billing-info-section">
                  <h3 className="section-subtitle">BILLING INFORMATION</h3>
                  
                  <div className="form-row">
                    {/* Left Column */}
                    <div className="form-column">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter full name"
                          value={formData.payment.billingName || ''}
                          onChange={(e) => handleInputChange('payment.billingName', e.target.value)}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Billing Address</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter billing address"
                          value={formData.payment.billingAddress || ''}
                          onChange={(e) => handleInputChange('payment.billingAddress', e.target.value)}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter phone number"
                          value={formData.payment.billingPhone || ''}
                          onChange={(e) => handleInputChange('payment.billingPhone', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    {/* Right Column */}
                    <div className="form-column">
                      <div className="form-group">
                        <label>Country</label>
                        <div className="select-container">
                          <select 
                            className="form-control"
                            value={formData.payment.billingCountry || ''}
                            onChange={(e) => handleInputChange('payment.billingCountry', e.target.value)}
                          >
                            <option value="">-- select --</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Algeria">Algeria</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Egypt">Egypt</option>
                          </select>
                          <span className="select-arrow">V</span>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label>State</label>
                        <div className="select-container">
                          <select 
                            className="form-control"
                            value={formData.payment.billingState || ''}
                            onChange={(e) => handleInputChange('payment.billingState', e.target.value)}
                          >
                            <option value="">-- select --</option>
                            <option value="Casablanca">Casablanca</option>
                            <option value="Rabat">Rabat</option>
                            <option value="Marrakech">Marrakech</option>
                            <option value="Fez">Fez</option>
                          </select>
                          <span className="select-arrow">&gt;</span>
                        </div>
                      </div>
                      
                      <div className="form-group">
                        <label>Zip or Postal Code</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter postal code"
                          value={formData.payment.billingPostalCode || ''}
                          onChange={(e) => handleInputChange('payment.billingPostalCode', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="remember-me-section">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.payment.rememberMe || false}
                      onChange={(e) => handleInputChange('payment.rememberMe', e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    Remember Me
                  </label>
                </div>

                {/* Final Declaration Checkbox */}
                <div className="final-declaration-section">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.finalDeclaration || false}
                      onChange={(e) => handleInputChange('finalDeclaration', e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    Je confirme que toutes les informations fournies sont exactes et complètes. Je comprends que soumettre cette candidature constitue une demande formelle de services d'admission. *
                  </label>
                </div>

                {/* Navigation Buttons for Step 5 */}
                <div className="continue-button-section">
                  <button 
                    type="button"
                    className="nav-btn-new prev-btn-new"
                    onClick={prevStep}
                  >
                    ← Previous
                  </button>
                  
                  <button 
                    type="button"
                    className="continue-button-perfect"
                    onClick={handlePaymentSuccess}
                    disabled={loading || !isStepValid(currentStep)}
                  >
                    {loading ? 'Processing...' : 'Submit Application'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}


      </div>

      {/* Right side - Summary */}
      <div className="summary-container-new">
        <div className="summary-card-new">
          <h3 className="summary-title-new">Your Application Summary</h3>
          
          {/* Program Information */}
          {selectedProgram && (
            <div className="program-info-new">
              <div className="program-logo-new">
                <img src={selectedProgram.logo} alt={selectedProgram.name} />
              </div>
              <div className="program-details-new">
                <div className="program-name-new">{selectedProgram.name}</div>
              </div>
            </div>
          )}

          {/* Application Details */}
          <div className="application-details-new">
            <div className="detail-row-new">
              <span className="detail-label-new">Application ID</span>
              <span className="detail-value-new">{applicationId || 'Draft'}</span>
            </div>
            <div className="detail-row-new">
              <span className="detail-label-new">Current Step</span>
              <span className="detail-value-new">{currentStep}/5</span>
            </div>
            <div className="detail-row-new">
              <span className="detail-label-new">Current status</span>
              <span className="detail-value-new">Application Started</span>
            </div>
          </div>
          
          {/* Cost Breakdown */}
          <div className="cost-breakdown-new">
            <h4 className="cost-title-new">Cost Breakdown</h4>
            <div className="cost-item-new">
              <span className="cost-label-new">Application Fees</span>
              <span className="cost-value-new">{selectedProgram?.applicationFee || 4000} MAD</span>
            </div>
            <div className="cost-item-new">
              <span className="cost-label-new">Service Fees</span>
              <span className="cost-value-new">{selectedProgram?.serviceFee || 11000} MAD</span>
            </div>
            <div className="cost-total-new">
              <span className="cost-label-new">Total</span>
              <span className="cost-value-new">{(selectedProgram?.applicationFee || 4000) + (selectedProgram?.serviceFee || 11000)} MAD</span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="summary-actions-new">
            <button 
              className="btn-save-progress-new"
              onClick={saveApplicationProgress}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Progress'}
            </button>
          </div>
        </div>

        {/* Payment Methods Card - Only visible in Step 5 */}
        {currentStep === 5 && (
          <div className="payment-methods-card-new">
            <h3 className="payment-methods-title-new">PAYMENT METHODS</h3>
            <div className="payment-methods-logos-new">
              <div className="payment-logo-item-new large-payment-logo">
                <img src="/src/assets/MasterCard.png" alt="MasterCard" className="payment-logo-img-new large-payment-image" />
                <span className="payment-method-name">MasterCard</span>
              </div>
              <div className="payment-logo-item-new large-payment-logo">
                <img src="/src/assets/visa.png" alt="VISA" className="payment-logo-img-new large-payment-image" />
                <span className="payment-method-name">VISA</span>
              </div>
              <div className="payment-logo-item-new large-payment-logo">
                <img src="/src/assets/cashPlus.png" alt="CASH PLUS" className="payment-logo-img-new large-payment-image cashplus-logo-new" />
                <span className="payment-method-name">CASH PLUS</span>
              </div>
              <div className="payment-logo-item-new large-payment-logo">
                <img src="/src/assets/cashPayment.png" alt="CASH PAYMENT" className="payment-logo-img-new large-payment-image" />
                <span className="payment-method-name">CASH PAYMENT</span>
              </div>
              <div className="payment-logo-item-new large-payment-logo">
                <img src="/src/assets/bankTransfer.png" alt="BANK TRANSFER" className="payment-logo-img-new large-payment-image" />
                <span className="payment-method-name">BANK TRANSFER</span>
              </div>
            </div>
            
            {/* PDF Download Section */}
            <div className="pdf-download-section">
              <div className="pdf-download-card">
                <div className="pdf-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="#541652" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="#541652" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke="#541652" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17H8" stroke="#541652" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 9H8" stroke="#541652" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="pdf-info">
                  <h4>Download Application PDF</h4>
                  <p>Get your complete application document with all information and documents</p>
                </div>
                <button 
                  className="pdf-download-btn"
                  onClick={downloadApplicationPDF}
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="modal-overlay-new" onClick={() => setShowTermsModal(false)}>
          <div className="modal-content-new" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-new">
              <h2>Terms and Conditions</h2>
              <button className="modal-close-new" onClick={() => setShowTermsModal(false)}>×</button>
            </div>
            <div className="modal-body-new">
              <h3>1. Application Process</h3>
              <p>By submitting this application, you agree to provide accurate and complete information. Any false statements may result in immediate rejection.</p>
              
              <h3>2. Document Requirements</h3>
              <p>All required documents must be submitted in the specified format. Incomplete applications will not be processed.</p>
              
              <h3>3. Processing Timeline</h3>
              <p>Applications are typically processed within 2-4 weeks. Delays may occur due to high volume or incomplete documentation.</p>
              
              <h3>4. Fees and Payment</h3>
              <p>Application fees are non-refundable. Service charges cover processing, document verification, and administrative costs.</p>
              
              <h3>5. Privacy and Data Protection</h3>
              <p>Your personal information will be handled in accordance with our Privacy Policy and applicable data protection laws.</p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="modal-overlay-new" onClick={() => setShowPrivacyModal(false)}>
          <div className="modal-content-new" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-new">
              <h2>Privacy Policy</h2>
              <button className="modal-close-new" onClick={() => setShowPrivacyModal(false)}>×</button>
            </div>
            <div className="modal-body-new">
              <h3>Data Collection</h3>
              <p>We collect personal information including contact details, educational background, and supporting documents to process your application.</p>
              
              <h3>Data Usage</h3>
              <p>Your information is used solely for application processing, communication, and service delivery. We do not sell or share your data with third parties.</p>
              
              <h3>Data Security</h3>
              <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
              
              <h3>Data Retention</h3>
              <p>Your application data is retained for the duration of the application process and for a reasonable period thereafter for record-keeping purposes.</p>
              
              <h3>Your Rights</h3>
              <p>You have the right to access, correct, or delete your personal information. Contact us for any privacy-related concerns.</p>
            </div>
          </div>
        </div>
      )}

      {/* Payment Policy Modal */}
      {showPaymentModal && (
        <div className="modal-overlay-new" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content-new" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-new">
              <h2>Payment Policy</h2>
              <button className="modal-close-new" onClick={() => setShowPaymentModal(false)}>×</button>
            </div>
            <div className="modal-body-new">
              <h3>Fee Structure</h3>
              <p>Application Fee: 4,000 MAD (non-refundable)<br/>
              Service Charge: 11,000 MAD (covers processing and administrative costs)</p>
              
              <h3>Payment Methods</h3>
              <p>We accept bank transfers, cash payments at our office, and checks. All payments must be made in MAD (Moroccan Dirham).</p>
              
              <h3>Payment Timeline</h3>
              <p>Payment is required before application processing begins. Applications will not be processed until full payment is received.</p>
              
              <h3>Receipts</h3>
              <p>Official receipts will be provided for all payments. Please keep these for your records.</p>
            </div>
          </div>
        </div>
      )}

      {/* Refund Policy Modal */}
      {showRefundModal && (
        <div className="modal-overlay-new" onClick={() => setShowRefundModal(false)}>
          <div className="modal-content-new" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-new">
              <h2>Refund Policy</h2>
              <button className="modal-close-new" onClick={() => setShowRefundModal(false)}>×</button>
            </div>
            <div className="modal-body-new">
              <h3>Application Fee</h3>
              <p>The application fee of 4,000 MAD is non-refundable under any circumstances.</p>
              
              <h3>Service Charge</h3>
              <p>Service charges may be partially refunded in the following cases:</p>
              <ul>
                <li>Application rejected due to our error</li>
                <li>Service cancellation before processing begins</li>
                <li>Force majeure circumstances</li>
              </ul>
              
              <h3>Refund Process</h3>
              <p>Refund requests must be submitted in writing within 30 days. Processing time is 5-10 business days.</p>
              
              <h3>No Refund Cases</h3>
              <p>No refunds are provided for:</p>
              <ul>
                <li>Incomplete applications</li>
                <li>False information provided</li>
                <li>Client-initiated cancellations after processing begins</li>
              </ul>
            </div>
          </div>
        </div>
      )}

        </div>
      </div>
    </GlobalLayout>
  );
};

export default Apply;
