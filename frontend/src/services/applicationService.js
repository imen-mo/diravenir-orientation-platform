import axios from 'axios';

// Configuration axios pour l'API - PORT 8080 (nouveau backend normalisé)
const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const applicationService = {
  // Create new application
  createApplication: async (applicationData) => {
    try {
      const response = await api.post('/api/applications', applicationData);
      return response.data;
    } catch (error) {
      console.error('Error creating application:', error);
      
      // Améliorer la gestion d'erreur
      if (error.response) {
        // Erreur de réponse du serveur
        const errorData = error.response.data;
        if (errorData && errorData.error) {
          throw new Error(`${errorData.error}: ${errorData.details || 'Unknown error'}`);
        } else {
          throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);
        }
      } else if (error.request) {
        // Erreur de réseau
        throw new Error('Network error: Unable to connect to server');
      } else {
        // Erreur autre
        throw new Error(error.message || 'Unknown error occurred');
      }
    }
  },

  // Get application by ID
  getApplicationById: async (id) => {
    try {
      const response = await api.get(`/api/applications/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting application:', error);
      throw error;
    }
  },

  // Get application by application ID
  getApplicationByApplicationId: async (applicationId) => {
    try {
      const response = await api.get(`/api/applications/by-application-id/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting application by application ID:', error);
      throw error;
    }
  },

  // Get all applications
  getAllApplications: async () => {
    try {
      const response = await api.get('/api/applications');
      return response.data;
    } catch (error) {
      console.error('Error getting all applications:', error);
      throw error;
    }
  },

  // Get applications by user ID
  getApplicationsByUserId: async (userId) => {
    try {
      const response = await api.get(`/api/applications/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting user applications:', error);
      throw error;
    }
  },

  // Update application
  updateApplication: async (id, applicationData) => {
    try {
      const response = await api.put(`/api/applications/${id}`, applicationData);
      return response.data;
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  },

  // Update application step
  updateStep: async (id, step) => {
    try {
      const response = await api.patch(`/api/applications/${id}/step`, { step });
      return response.data;
    } catch (error) {
      console.error('Error updating application step:', error);
      throw error;
    }
  },

  // Submit application
  submitApplication: async (id) => {
    try {
      const response = await api.post(`/api/applications/${id}/submit`);
      return response.data;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    }
  },

  // Complete payment
  completePayment: async (id, paymentData) => {
    try {
      const response = await api.patch(`/api/applications/${id}/payment`, paymentData);
      return response.data;
    } catch (error) {
      console.error('Error completing payment:', error);
      throw error;
    }
  },

  // Delete application
  deleteApplication: async (id) => {
    try {
      await api.delete(`/api/applications/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting application:', error);
      throw error;
    }
  },

  // Check if application exists
  applicationExists: async (email, programName) => {
    try {
      const response = await api.get('/api/applications/exists', {
        params: { email, programName }
      });
      return response.data;
    } catch (error) {
      console.error('Error checking application existence:', error);
      throw error;
    }
  },

  // Get applications in progress
  getApplicationsInProgress: async () => {
    try {
      const response = await api.get('/api/applications/in-progress');
      return response.data;
    } catch (error) {
      console.error('Error getting applications in progress:', error);
      throw error;
    }
  },

  // Get submitted applications
  getSubmittedApplications: async () => {
    try {
      const response = await api.get('/api/applications/submitted');
      return response.data;
    } catch (error) {
      console.error('Error getting submitted applications:', error);
      throw error;
    }
  },

  // Get applications by status
  getApplicationsByStatus: async (status) => {
    try {
      const response = await api.get(`/api/applications/by-status/${status}`);
      return response.data;
    } catch (error) {
      console.error('Error getting applications by status:', error);
      throw error;
    }
  },

  // Get applications by step
  getApplicationsByStep: async (step) => {
    try {
      const response = await api.get(`/api/applications/by-step/${step}`);
      return response.data;
    } catch (error) {
      console.error('Error getting applications by step:', error);
      throw error;
    }
  },

  // Check if application exists
  applicationExists: async (applicationId) => {
    try {
      const response = await api.get(`/api/applications/exists/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error('Error checking if application exists:', error);
      throw error;
    }
  },

  // Check if user has application in progress
  userHasApplicationInProgress: async (userId) => {
    try {
      const response = await api.get(`/api/applications/user/${userId}/has-in-progress`);
      return response.data;
    } catch (error) {
      console.error('Error checking if user has application in progress:', error);
      throw error;
    }
  },

  // Get application statistics
  getApplicationStatistics: async () => {
    try {
      const response = await api.get('/api/applications/statistics');
      return response.data;
    } catch (error) {
      console.error('Error getting application statistics:', error);
      throw error;
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await api.get('/api/applications/health');
      return response.data;
    } catch (error) {
      console.error('Error checking application service health:', error);
      throw error;
    }
  },

  // Health check method to test backend connectivity
  healthCheck: async () => {
    try {
      const response = await api.get('/api/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw new Error('Backend is not accessible');
    }
  },

  // Get application statistics
  getApplicationStatistics: async () => {
    try {
      const response = await api.get('/api/applications/statistics');
      return response.data;
    } catch (error) {
      console.error('Error getting application statistics:', error);
      throw error;
    }
  },

  // Save application progress (auto-save)
  saveProgress: async (id, applicationData) => {
    try {
      const response = await api.patch(`/api/applications/${id}/progress`, applicationData);
      return response.data;
    } catch (error) {
      console.error('Error saving application progress:', error);
      throw error;
    }
  },

  // Save application progress (alias for saveProgress)
  saveApplicationProgress: async (id, applicationData) => {
    return this.saveProgress(id, applicationData);
  },

  // ===== NOUVELLES MÉTHODES POUR LES DOCUMENTS =====

  // Upload a document
  uploadDocument: async (applicationId, documentType, file) => {
    try {
      console.log('=== UPLOAD DOCUMENT START ===');
      console.log('Application ID:', applicationId);
      console.log('Document Type:', documentType);
      console.log('File:', file);
      console.log('File Name:', file.name);
      console.log('File Size:', file.size);
      console.log('File Type:', file.type);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('documentType', documentType);

      console.log('FormData created, sending request...');
      console.log('URL:', `${API_BASE_URL}/api/applications/${applicationId}/documents/upload`);

      const response = await api.post(`/api/applications/${applicationId}/documents/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 secondes pour l'upload
      });

      console.log('Response received:', response);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      return response.data;
    } catch (error) {
      console.error('=== UPLOAD DOCUMENT ERROR ===');
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Error response:', error.response);
      console.error('Error request:', error.request);
      console.error('Error config:', error.config);
      console.error('Full error:', error);
      
      // Retourner une erreur plus détaillée
      if (error.response) {
        // Le serveur a répondu avec un statut d'erreur
        throw new Error(`Server error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        // La requête a été faite mais pas de réponse
        throw new Error('No response from server. Please check if the backend is running.');
      } else {
        // Erreur lors de la configuration de la requête
        throw new Error(`Request error: ${error.message}`);
      }
    }
  },

  // Delete a document
  deleteDocument: async (applicationId, documentType) => {
    try {
      const response = await api.delete(`/api/applications/${applicationId}/documents/${documentType}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  },

  // Get document status (check if document exists)
  getDocumentStatus: async (applicationId, documentType) => {
    try {
      const application = await this.getApplicationById(applicationId);
      
      // Vérifier si le document existe en base
      const documentPath = this.getDocumentPathFromApplication(application, documentType);
      
      return {
        exists: !!documentPath,
        path: documentPath,
        documentType: documentType
      };
    } catch (error) {
      console.error('Error getting document status:', error);
      throw error;
    }
  },

  // Helper method to get document path from application
  getDocumentPathFromApplication: (application, documentType) => {
    switch (documentType) {
      case 'passport':
        return application.passportPath;
      case 'academic_certificate':
        return application.academicCertificatePath;
      case 'academic_transcript':
        return application.academicTranscriptPath;
      case 'language_certificate':
        return application.languageCertificatePath;
      case 'physical_examination':
        return application.physicalExaminationPath;
      case 'non_criminal_certificate':
        return application.nonCriminalCertificatePath;
      case 'bank_statement':
        return application.bankStatementPath;
      case 'photo':
        return application.photoPath;
      case 'resume':
        return application.resumePath;
      case 'award_certificates':
        return application.awardCertificatesPath;
      case 'parent_id':
        return application.parentIdPath;
      default:
        return null;
    }
  },

  // Get application notifications
  getApplicationNotifications: async () => {
    try {
      // Pour l'instant, retourner des notifications mockées
      // TODO: Implémenter l'API réelle
      return [
        {
          id: 1,
          type: 'INFO',
          message: 'Votre candidature est en cours de révision',
          createdAt: new Date().toISOString(),
          isRead: false
        }
      ];
    } catch (error) {
      console.error('Error getting application notifications:', error);
      return [];
    }
  },

  // Get application documents
  getApplicationDocuments: async () => {
    try {
      // Pour l'instant, retourner des documents mockés
      // TODO: Implémenter l'API réelle
      return [
        {
          id: 1,
          documentType: 'PASSPORT',
          fileName: 'passport.pdf',
          status: 'APPROVED',
          uploadDate: new Date().toISOString()
        }
      ];
    } catch (error) {
      console.error('Error getting application documents:', error);
      return [];
    }
  }
};
