import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationService } from '../services/applicationService';
import { toast } from 'react-toastify';
import GlobalLayout from '../components/GlobalLayout';
import './Apply.css';

const Apply = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [applicationId, setApplicationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const autoSaveTimeout = useRef(null);
  
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
    country: '',
    fullAddress: '',
    province: '',
    postalCode: '',
    
    // Education Background
    education: {
      level: '',
      institution: '',
      startedDate: '',
      finishedDate: '',
      grade: ''
    },
    
    // Work Experience
    workExperience: {
      company: '',
      position: '',
      startedDate: '',
      finishedDate: '',
      isPresent: false
    },
    
    // Family Information
    familyMembers: [{
      name: '',
      nationality: '',
      relationship: ''
    }],
    
    // Financial Supporter (Guarantor)
    guarantorRelationship: '',
    guarantorName: '',
    guarantorCountry: '',
    guarantorAddress: '',
    guarantorEmail: '',
    guarantorWorkplace: '',
    guarantorWorkplaceAddress: '',
    
    // Emergency Contact
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    emergencyCountry: '',
    
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
      currency: 'USD'
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

  // Step validation
  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return (
          formData.firstName.trim() !== '' &&
          formData.lastName.trim() !== '' &&
          formData.email.trim() !== '' &&
          formData.phone.trim() !== '' &&
          formData.whatsapp.trim() !== ''
        );
      case 2:
        return (
          formData.education.level.trim() !== '' &&
          formData.education.institution.trim() !== '' &&
          formData.workExperience.company.trim() !== '' &&
          formData.workExperience.position.trim() !== '' &&
          formData.guarantorName.trim() !== '' &&
          formData.emergencyContact.name.trim() !== ''
        );
      case 3:
        return (
          formData.declarations.termsAccepted &&
          formData.declarations.privacyAccepted &&
          formData.declarations.refundAccepted
        );
      case 4:
        return (
          formData.documents.passport &&
          formData.documents.academicCertificate &&
          formData.documents.academicTranscript &&
          formData.documents.noCriminalCertificate &&
          formData.documents.photo
        );
      case 5:
        return (
          formData.payment.method.trim() !== '' &&
          formData.payment.amount > 0 &&
          formData.finalDeclaration
        );
      default:
        return false;
    }
  };

  // Navigation functions
  const nextStep = () => {
    if (isStepValid(currentStep) && currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.error('Please complete all required fields in this step before continuing.');
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= 5) {
      // Check if previous steps are valid
      for (let i = 1; i < step; i++) {
        if (!isStepValid(i)) {
          toast.error(`Please complete step ${i} before accessing step ${step}.`);
          return;
        }
      }
      setCurrentStep(step);
    }
  };

  // Form handling
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

  // Submit application
  const submitApplication = async () => {
    try {
      setLoading(true);
      
      // Validate final step
      if (!formData.finalDeclaration) {
        toast.error('Please accept the final declaration before submitting.');
        return;
      }
      
      // Here you would typically send the application to the backend
      // await applicationService.submitApplication(applicationId);
      
      toast.success('Application submitted successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Could not submit application: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Save progress
  const saveApplicationProgress = async () => {
    try {
      setSaving(true);
      
      if (!applicationId) {
        // Create new application
        const createData = {
          ...formData,
          currentStep: currentStep,
          status: 'DRAFT'
        };
        
        try {
          const response = await applicationService.createApplication(createData);
          setApplicationId(response.id);
          toast.success('New application created successfully');
        } catch (error) {
          console.error('Error creating application:', error);
          toast.error('Could not create application: ' + error.message);
        }
      } else {
        // Update existing application
        try {
          await applicationService.saveProgress(applicationId, {
            ...formData,
            currentStep: currentStep
          });
          toast.success('Progress saved successfully!');
        } catch (error) {
          console.error('Error saving progress:', error);
          toast.error('Could not save progress: ' + error.message);
        }
      }
      
      // Save to localStorage as backup
      localStorage.setItem('applicationFormData', JSON.stringify(formData));
      if (applicationId) {
        localStorage.setItem('applicationId', applicationId);
      }
      
    } catch (error) {
      console.error('Error saving progress:', error);
      toast.error('Could not save progress: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Initialize on mount
  useEffect(() => {
    const initializeApplication = async () => {
      try {
        // Try to load from localStorage first
        const savedData = localStorage.getItem('applicationFormData');
        const savedId = localStorage.getItem('applicationId');
        
        if (savedData && savedId) {
          try {
            const parsedData = JSON.parse(savedData);
            setFormData(parsedData);
            setCurrentStep(parsedData.currentStep || 1);
            setApplicationId(savedId);
            toast.info('Application data loaded from local storage');
          } catch (parseError) {
            console.error('Error parsing saved data:', parseError);
          }
        }
        
        // Try to create new application or connect to existing one
        try {
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
            lastName: formData.lastName || 'User'
          };
          const response = await applicationService.createApplication(minimalData);
          setApplicationId(response.id);
          toast.success('New application created');
        } catch (error) {
          console.error('Error with application:', error);
          toast.warning('Working in offline mode. Data will be saved locally.');
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
  }, []);

  return (
    <GlobalLayout activePage="apply">
      <div className="apply-container">
        {/* Header */}
        <div className="apply-header-top">
          <div className="header-content-top">
            <h1>Application Form</h1>
            <p>Complete your application in 5 simple steps</p>
            <div className="header-actions">
              <button className="save-btn" onClick={saveApplicationProgress} disabled={saving}>
                {saving ? 'Saving...' : 'Save Progress'}
              </button>
              <button className="btn-debug" onClick={() => {
                console.log('Current Form Data:', formData);
                console.log('Current Step:', currentStep);
                console.log('Step Valid:', isStepValid(currentStep));
                alert(`Debug Info:\nStep: ${currentStep}\nValid: ${isStepValid(currentStep)}\nCheck console for details.`);
              }}>
                🔍 Debug
              </button>
              <button className="btn-backend" onClick={async () => {
                try {
                  await applicationService.healthCheck();
                  toast.success('✅ Backend is accessible!');
                } catch (error) {
                  toast.error('❌ Backend not accessible: ' + error.message);
                }
              }}>
                🔌 Test Backend
              </button>
            </div>
          </div>
        </div>

      {/* Progress bar */}
      <div className="progress-bar-container">
        <div className="progress-steps">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`progress-step ${currentStep === step ? 'current' : ''} ${isStepValid(step) ? 'completed' : ''}`}
              onClick={() => goToStep(step)}
              style={{ cursor: 'pointer' }}
            >
              <div className="progress-number">
                {isStepValid(step) ? '✓' : step}
              </div>
              <div className="progress-label">
                {step === 1 && 'Personal Info'}
                {step === 2 && 'Education & Family'}
                {step === 3 && 'Declaration & Agreement'}
                {step === 4 && 'Upload Documents'}
                {step === 5 && 'Final Step'}
              </div>
            </div>
          ))}
        </div>
        <div className="progress-percentage">
          {Math.round((currentStep / 5) * 100)}% Complete
        </div>
      </div>

      {/* Main content */}
      <div className="apply-content">
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="form-section">
            <h2>Personal Information</h2>
            
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                className="form-control"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter your first name"
              />
            </div>

            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                className="form-control"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter your last name"
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                className="form-control"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Phone *</label>
              <input
                type="text"
                className="form-control"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+212XXXXXXXXX"
              />
            </div>

            <div className="form-group">
              <label>WhatsApp *</label>
              <input
                type="text"
                className="form-control"
                value={formData.whatsapp}
                onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                placeholder="+212XXXXXXXXX"
              />
            </div>

            <div className="form-group">
              <label>Date of Birth *</label>
              <input
                type="text"
                className="form-control"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div className="form-group">
              <label>Place of Birth *</label>
              <input
                type="text"
                className="form-control"
                value={formData.placeOfBirth}
                onChange={(e) => handleInputChange('placeOfBirth', e.target.value)}
                placeholder="Enter place of birth"
              />
            </div>

            <div className="form-group">
              <label>Gender *</label>
              <select
                className="form-control"
                value={formData.gender}
                onChange={(e) => handleInputChange('gender', e.target.value)}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Marital Status *</label>
              <select
                className="form-control"
                value={formData.maritalStatus}
                onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
              >
                <option value="">Select marital status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Passport Number *</label>
              <input
                type="text"
                className="form-control"
                value={formData.passportNumber}
                onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                placeholder="Enter passport number"
              />
            </div>

            <div className="form-group">
              <label>Passport Expiry *</label>
              <input
                type="text"
                className="form-control"
                value={formData.passportExpiry}
                onChange={(e) => handleInputChange('passportExpiry', e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div className="form-group">
              <label>Country *</label>
              <select
                className="form-control"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
              >
                <option value="">Select your country</option>
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

            <div className="form-group">
              <label>Full Address *</label>
              <textarea
                className="form-control"
                value={formData.fullAddress}
                onChange={(e) => handleInputChange('fullAddress', e.target.value)}
                placeholder="Enter your full address"
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Province/State *</label>
              <input
                type="text"
                className="form-control"
                value={formData.province}
                onChange={(e) => handleInputChange('province', e.target.value)}
                placeholder="Enter province or state"
              />
            </div>

            <div className="form-group">
              <label>Postal Code *</label>
              <input
                type="text"
                className="form-control"
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                placeholder="Enter postal code"
              />
            </div>
          </div>
        )}

        {/* Step 2: Education & Family Information */}
        {currentStep === 2 && (
          <div className="form-section">
            <h2>Education, Work Experience & Family Information</h2>

            <h3>Education Background</h3>
            <div className="form-group">
              <label>Education Level *</label>
              <select
                className="form-control"
                value={formData.education.level}
                onChange={(e) => handleInputChange('education.level', e.target.value)}
              >
                <option value="">Select education level</option>
                <option value="High School">High School</option>
                <option value="Bachelor">Bachelor's Degree</option>
                <option value="Master">Master's Degree</option>
                <option value="PhD">PhD</option>
              </select>
            </div>

            <div className="form-group">
              <label>Institution *</label>
              <input
                type="text"
                className="form-control"
                value={formData.education.institution}
                onChange={(e) => handleInputChange('education.institution', e.target.value)}
                placeholder="Enter institution name"
              />
            </div>

            <div className="form-group">
              <label>Start Date *</label>
              <input
                type="text"
                className="form-control"
                value={formData.education.startedDate}
                onChange={(e) => handleInputChange('education.startedDate', e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div className="form-group">
              <label>End Date *</label>
              <input
                type="text"
                className="form-control"
                value={formData.education.finishedDate}
                onChange={(e) => handleInputChange('education.finishedDate', e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div className="form-group">
              <label>Grade *</label>
              <input
                type="text"
                className="form-control"
                value={formData.education.grade}
                onChange={(e) => handleInputChange('education.grade', e.target.value)}
                placeholder="Enter your grade (e.g., A, B, 85%, etc.)"
              />
            </div>

            <h3>Work Experience</h3>
            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                className="form-control"
                value={formData.workExperience.company}
                onChange={(e) => handleInputChange('workExperience.company', e.target.value)}
                placeholder="Enter company name"
              />
            </div>

            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                className="form-control"
                value={formData.workExperience.position}
                onChange={(e) => handleInputChange('workExperience.position', e.target.value)}
                placeholder="Enter your position"
              />
            </div>

            <div className="form-group">
              <label>Start Date *</label>
              <input
                type="text"
                className="form-control"
                value={formData.workExperience.startedDate}
                onChange={(e) => handleInputChange('workExperience.startedDate', e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>

            <div className="form-group">
              <label>End Date *</label>
              <input
                type="text"
                className="form-control"
                value={formData.workExperience.finishedDate}
                onChange={(e) => handleInputChange('workExperience.finishedDate', e.target.value)}
                placeholder="DD/MM/YYYY"
              />
            </div>
            
            <h3>Family Members</h3>
            {formData.familyMembers.map((member, index) => (
              <div key={index} className="family-member-item">
                <div className="form-group">
                  <label>Family Member {index + 1}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={member.name || ''}
                    onChange={(e) => handleArrayChange('familyMembers', index, { name: e.target.value })}
                    placeholder="Full name"
                  />
                  <input
                    type="text"
                    className="form-control"
                    value={member.nationality || ''}
                    onChange={(e) => handleArrayChange('familyMembers', index, { nationality: e.target.value })}
                    placeholder="Nationality"
                  />
                  <input
                    type="text"
                    className="form-control"
                    value={member.relationship || ''}
                    onChange={(e) => handleArrayChange('familyMembers', index, { relationship: e.target.value })}
                    placeholder="Relationship"
                  />
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={addFamilyMember}>
              + Add Family Member
            </button>

            <h3>Financial Guarantor</h3>
            <div className="form-group">
              <label>Relationship to Guarantor *</label>
              <select
                className="form-control"
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

            <div className="form-group">
              <label>Guarantor Name *</label>
              <input
                type="text"
                className="form-control"
                value={formData.guarantorName}
                onChange={(e) => handleInputChange('guarantorName', e.target.value)}
                placeholder="Enter guarantor name"
              />
            </div>

            <div className="form-group">
              <label>Guarantor Country *</label>
              <input
                type="text"
                className="form-control"
                value={formData.guarantorCountry}
                onChange={(e) => handleInputChange('guarantorCountry', e.target.value)}
                placeholder="Enter guarantor country"
              />
            </div>

            <div className="form-group">
              <label>Guarantor Address *</label>
              <textarea
                className="form-control"
                value={formData.guarantorAddress}
                onChange={(e) => handleInputChange('guarantorAddress', e.target.value)}
                placeholder="Enter guarantor address"
                rows="3"
              />
            </div>

            <h3>Emergency Contact</h3>
            <div className="form-group">
              <label>Emergency Contact Name *</label>
              <input
                type="text"
                className="form-control"
                value={formData.emergencyContact.name}
                onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                placeholder="Enter emergency contact name"
              />
            </div>

            <div className="form-group">
              <label>Emergency Contact Phone *</label>
              <input
                type="text"
                className="form-control"
                value={formData.emergencyContact.phone}
                onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
                placeholder="Enter emergency contact phone"
              />
            </div>

            <div className="form-group">
              <label>Emergency Contact Relationship *</label>
              <input
                type="text"
                className="form-control"
                value={formData.emergencyContact.relationship}
                onChange={(e) => handleInputChange('emergencyContact.relationship', e.target.value)}
                placeholder="Enter relationship"
              />
            </div>

            <div className="form-group">
              <label>Emergency Contact Country *</label>
              <input
                type="text"
                className="form-control"
                value={formData.emergencyCountry}
                onChange={(e) => handleInputChange('emergencyCountry', e.target.value)}
                placeholder="Enter emergency contact country"
              />
            </div>
          </div>
        )}

        {/* Step 3: Declarations & Agreements */}
        {currentStep === 3 && (
          <div className="form-section">
            <h2>Declarations & Agreements</h2>
            
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.declarations.termsAccepted}
                  onChange={(e) => handleInputChange('declarations.termsAccepted', e.target.checked)}
                />
                I accept the Terms and Conditions *
              </label>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.declarations.privacyAccepted}
                  onChange={(e) => handleInputChange('declarations.privacyAccepted', e.target.checked)}
                />
                I accept the Privacy Policy *
              </label>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.declarations.accuracyAccepted}
                  onChange={(e) => handleInputChange('declarations.accuracyAccepted', e.target.checked)}
                />
                I confirm that all information provided is accurate and complete *
              </label>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.declarations.paymentAccepted}
                  onChange={(e) => handleInputChange('declarations.paymentAccepted', e.target.checked)}
                />
                I accept the Payment Policy *
              </label>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.declarations.refundAccepted}
                  onChange={(e) => handleInputChange('declarations.refundAccepted', e.target.checked)}
                />
                I accept the Refund Policy *
              </label>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.declarations.complianceAccepted}
                  onChange={(e) => handleInputChange('declarations.complianceAccepted', e.target.checked)}
                />
                I agree to comply with all attendance and academic requirements *
              </label>
            </div>

            <div className="form-group">
              <h3>Important Information</h3>
              <p>Please read all policies carefully before proceeding. These documents outline your rights and responsibilities as an applicant.</p>
            </div>
          </div>
        )}

        {/* Step 4: Document Upload */}
        {currentStep === 4 && (
          <div className="form-section">
            <h2>Document Upload</h2>
            
            <h3>Required Documents *</h3>
            
            <div className="file-upload">
              <div className="upload-icon">📄</div>
              <div className="upload-text">Passport Pages</div>
              <input
                type="file"
                id="passport"
                onChange={(e) => handleFileUpload('passport', e.target.files[0])}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor="passport">Choose File</label>
              {formData.documents.passport && (
                <div className="file-info">
                  <div className="file-name">{formData.documents.passport.name}</div>
                  <div className="file-size">{(formData.documents.passport.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
              )}
            </div>

            <div className="file-upload">
              <div className="upload-icon">🎓</div>
              <div className="upload-text">Highest Academic Certificate</div>
              <input
                type="file"
                id="academicCertificate"
                onChange={(e) => handleFileUpload('academicCertificate', e.target.files[0])}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor="academicCertificate">Choose File</label>
              {formData.documents.academicCertificate && (
                <div className="file-info">
                  <div className="file-name">{formData.documents.academicCertificate.name}</div>
                  <div className="file-size">{(formData.documents.academicCertificate.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
              )}
            </div>

            <div className="file-upload">
              <div className="upload-icon">📊</div>
              <div className="upload-text">Highest Academic Transcript</div>
              <input
                type="file"
                id="academicTranscript"
                onChange={(e) => handleFileUpload('academicTranscript', e.target.files[0])}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor="academicTranscript">Choose File</label>
              {formData.documents.academicTranscript && (
                <div className="file-info">
                  <div className="file-name">{formData.documents.academicTranscript.name}</div>
                  <div className="file-size">{(formData.documents.academicTranscript.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
              )}
            </div>

            <div className="file-upload">
              <div className="upload-icon">🚫</div>
              <div className="upload-text">Non-Criminal Certificate</div>
              <input
                type="file"
                id="noCriminalCertificate"
                onChange={(e) => handleFileUpload('noCriminalCertificate', e.target.files[0])}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor="noCriminalCertificate">Choose File</label>
              {formData.documents.noCriminalCertificate && (
                <div className="file-info">
                  <div className="file-name">{formData.documents.noCriminalCertificate.name}</div>
                  <div className="file-size">{(formData.documents.noCriminalCertificate.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
              )}
            </div>

            <div className="file-upload">
              <div className="upload-icon">📷</div>
              <div className="upload-text">Personal Photo (passport size)</div>
              <input
                type="file"
                id="photo"
                onChange={(e) => handleFileUpload('photo', e.target.files[0])}
                accept=".jpg,.jpeg,.png"
              />
              <label htmlFor="photo">Choose File</label>
              {formData.documents.photo && (
                <div className="file-info">
                  <div className="file-name">{formData.documents.photo.name}</div>
                  <div className="file-size">{(formData.documents.photo.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
              )}
            </div>

            <h3>Optional Documents</h3>
            
            <div className="file-upload">
              <div className="upload-icon">🌐</div>
              <div className="upload-text">Language Proficiency Certificate</div>
              <input
                type="file"
                id="languageCertificate"
                onChange={(e) => handleFileUpload('languageCertificate', e.target.files[0])}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label htmlFor="languageCertificate">Choose File</label>
              {formData.documents.languageCertificate && (
                <div className="file-info">
                  <div className="file-name">{formData.documents.languageCertificate.name}</div>
                  <div className="file-size">{(formData.documents.languageCertificate.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
              )}
            </div>

            <div className="file-upload">
              <div className="upload-icon">💼</div>
              <div className="upload-text">Resume/CV</div>
              <input
                type="file"
                id="resume"
                onChange={(e) => handleFileUpload('resume', e.target.files[0])}
                accept=".pdf,.doc,.docx"
              />
              <label htmlFor="resume">Choose File</label>
              {formData.documents.resume && (
                <div className="file-info">
                  <div className="file-name">{formData.documents.resume.name}</div>
                  <div className="file-size">{(formData.documents.resume.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
              )}
            </div>

            <div className="form-group">
              <p><strong>Note:</strong> All required documents must be uploaded to proceed. Optional documents can be uploaded later.</p>
            </div>
          </div>
        )}

        {/* Step 5: Final Step */}
        {currentStep === 5 && (
          <div className="form-section">
            <h2>Final Step - Review & Submit</h2>
            
            <h3>Payment Information</h3>
            <div className="form-group">
              <label>Payment Method *</label>
              <select
                className="form-control"
                value={formData.payment.method}
                onChange={(e) => handleInputChange('payment.method', e.target.value)}
              >
                <option value="">Select payment method</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
                <option value="Western Union">Western Union</option>
              </select>
            </div>

            <div className="form-group">
              <label>Payment Amount *</label>
              <input
                type="number"
                className="form-control"
                value={formData.payment.amount}
                onChange={(e) => handleInputChange('payment.amount', parseFloat(e.target.value))}
                placeholder="Enter amount"
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group">
              <label>Currency</label>
              <select
                className="form-control"
                value={formData.payment.currency}
                onChange={(e) => handleInputChange('payment.currency', e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="MAD">MAD</option>
              </select>
            </div>

            <h3>Final Declaration</h3>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.finalDeclaration}
                  onChange={(e) => handleInputChange('finalDeclaration', e.target.checked)}
                />
                I confirm that all information provided is accurate and complete, and I agree to submit this application *
              </label>
            </div>

            <div className="form-group">
              <h3>Application Summary</h3>
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Program:</strong> Bachelor in Business Administration</p>
              <p><strong>University:</strong> UNIVERSITY CHINA</p>
              <p><strong>Total Steps Completed:</strong> 5/5</p>
            </div>

            <div className="form-group">
              <button 
                className="btn btn-submit" 
                onClick={submitApplication}
                disabled={loading || !formData.finalDeclaration}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="navigation-buttons">
          <button className="btn btn-prev" onClick={prevStep} disabled={currentStep === 1}>
            Previous
          </button>
          <button className="btn btn-next" onClick={nextStep} disabled={currentStep === 5}>
            Next
          </button>
        </div>
      </div>
      </div>
    </GlobalLayout>
  );
};

export default Apply;
