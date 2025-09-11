// Service API pour la connexion avec le backend
const API_BASE_URL = 'http://localhost:8080/api';

// ===== SERVICE UTILISATEURS =====
export const userService = {
  // Récupérer tous les utilisateurs
  async getAllUsers() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      throw error;
    }
  },

  // Créer un nouvel utilisateur
  async createUser(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      throw error;
    }
  },

  // Mettre à jour un utilisateur
  async updateUser(userId, userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
      throw error;
    }
  },

  // Supprimer un utilisateur
  async deleteUser(userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      throw error;
    }
  }
};

// ===== SERVICE CANDIDATURES =====
export const applicationService = {
  // Récupérer toutes les candidatures
  async getAllApplications() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/applications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des candidatures:', error);
      throw error;
    }
  },

  // Mettre à jour le statut d'une candidature
  async updateApplicationStatus(applicationId, status) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
      throw error;
    }
  },

  // Récupérer une candidature par ID
  async getApplicationById(applicationId) {
    try {
      const response = await fetch(`${API_BASE_URL}/applications/${applicationId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération de la candidature:', error);
      throw error;
    }
  }
};

// ===== SERVICE PROGRAMMES =====
export const programService = {
  // Récupérer tous les programmes
  async getAllPrograms() {
    try {
      const response = await fetch(`${API_BASE_URL}/programs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des programmes:', error);
      throw error;
    }
  },

  // Créer un nouveau programme
  async createProgram(programData) {
    try {
      const response = await fetch(`${API_BASE_URL}/programs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(programData),
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la création du programme:', error);
      throw error;
    }
  },

  // Mettre à jour un programme
  async updateProgram(programId, programData) {
    try {
      const response = await fetch(`${API_BASE_URL}/programs/${programId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(programData),
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du programme:', error);
      throw error;
    }
  },

  // Supprimer un programme
  async deleteProgram(programId) {
    try {
      const response = await fetch(`${API_BASE_URL}/programs/${programId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression du programme:', error);
      throw error;
    }
  }
};

// ===== SERVICE TESTS =====
export const testService = {
  // Récupérer tous les tests
  async getAllTests() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/tests`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des tests:', error);
      throw error;
    }
  },

  // Récupérer un test par ID
  async getTestById(testId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/tests/${testId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération du test:', error);
      throw error;
    }
  }
};

// ===== SERVICE STATISTIQUES =====
export const statisticsService = {
  // Récupérer les statistiques du dashboard
  async getDashboardStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/statistics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  },

  // Récupérer les données pour les charts
  async getChartsData() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/charts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des données des charts:', error);
      throw error;
    }
  }
};

// ===== UTILITAIRES =====
export const apiUtils = {
  // Gestion des erreurs API
  handleApiError(error) {
    if (error.message.includes('404')) {
      return 'Ressource non trouvée';
    } else if (error.message.includes('500')) {
      return 'Erreur serveur interne';
    } else if (error.message.includes('400')) {
      return 'Données invalides';
    } else {
      return 'Erreur de connexion';
    }
  },

  // Formatage des données utilisateur
  formatUserData(user) {
    return {
      id: user.id,
      firstName: user.firstName || user.prenom,
      lastName: user.lastName || user.nom,
      email: user.email,
      role: user.role || 'student',
      status: user.status || 'active',
      createdAt: user.createdAt || user.dateCreation,
      lastLogin: user.lastLogin || user.derniereConnexion
    };
  },

  // Formatage des données de candidature
  formatApplicationData(application) {
    return {
      id: application.id,
      studentName: application.studentName || `${application.student?.firstName} ${application.student?.lastName}`,
      studentEmail: application.studentEmail || application.student?.email,
      programName: application.programName || application.program?.name,
      status: application.status || 'pending',
      submittedAt: application.submittedAt || application.dateSoumission,
      testScore: application.testScore || application.scoreTest,
      motivation: application.motivation || application.lettreMotivation
    };
  },

  // Formatage des données de programme
  formatProgramData(program) {
    return {
      id: program.id,
      name: program.name || program.nom,
      description: program.description || program.description,
      category: program.category || program.categorie,
      duration: program.duration || program.duree,
      price: program.price || program.prix,
      location: program.location || program.lieu,
      requirements: program.requirements || program.prerequis,
      status: program.status || 'active',
      studentsCount: program.studentsCount || program.nombreEtudiants,
      createdAt: program.createdAt || program.dateCreation
    };
  }
};

// ===== SERVICE NOTIFICATIONS =====
export const notificationService = {
  // Récupérer toutes les notifications
  async getNotifications() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/notifications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des notifications:', error);
      throw error;
    }
  },

  // Récupérer les statistiques
  async getStatistics() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/notifications/statistics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  },

  // Marquer une notification comme lue
  async markAsRead(notificationId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/notifications/${notificationId}/read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors du marquage de la notification:', error);
      throw error;
    }
  },

  // Supprimer une notification
  async deleteNotification(notificationId) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/notifications/${notificationId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la suppression de la notification:', error);
      throw error;
    }
  },

  // Marquer toutes les notifications comme lues
  async markAllAsRead() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/notifications/mark-all-read`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors du marquage de toutes les notifications:', error);
      throw error;
    }
  }
};
