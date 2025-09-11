import { applicationService } from './applicationService';
import { programService } from './api';

class NotificationService {
    constructor() {
    this.notifications = [];
    this.listeners = [];
    this.lastCheck = null;
    this.checkInterval = null;
  }

  // ===== GESTION DES NOTIFICATIONS =====

  /**
   * Ajouter une nouvelle notification
   */
  addNotification(notification) {
    const newNotification = {
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
      ...notification
    };

    this.notifications.unshift(newNotification);
    
    // Limiter à 100 notifications
    if (this.notifications.length > 100) {
      this.notifications = this.notifications.slice(0, 100);
    }

    // Notifier les listeners
    this.notifyListeners();
    
    // Sauvegarder en localStorage
    this.saveToLocalStorage();
    
    return newNotification;
  }

  /**
   * Marquer une notification comme lue
   */
  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      this.notifyListeners();
      this.saveToLocalStorage();
    }
  }

  /**
   * Marquer toutes les notifications comme lues
   */
  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    this.notifyListeners();
    this.saveToLocalStorage();
  }

  /**
   * Supprimer une notification
   */
  removeNotification(notificationId) {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.notifyListeners();
    this.saveToLocalStorage();
  }

  /**
   * Supprimer toutes les notifications
   */
  clearAllNotifications() {
    this.notifications = [];
    this.notifyListeners();
    this.saveToLocalStorage();
  }

  // ===== GÉNÉRATION AUTOMATIQUE DES NOTIFICATIONS =====

  /**
   * Générer des notifications basées sur les données du système
   */
  async generateSystemNotifications(userId) {
    try {
      // Récupérer les applications de l'utilisateur
      let applications = [];
      try {
        applications = await applicationService.getApplicationsByUserId(userId);
        } catch (error) {
        console.log('⚠️ API applications non accessible, utilisation des données locales');
        // Utiliser des données de démonstration
        applications = [
          {
            id: 1,
            programName: 'Master en Intelligence Artificielle',
            status: 'IN_PROGRESS',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];
      }
      
      // Récupérer les programmes sauvegardés
      const savedPrograms = JSON.parse(localStorage.getItem('savedPrograms') || '[]');
      
      // Générer les notifications
      const notifications = [];

      // 1. Notifications des applications
      applications.forEach(app => {
        // Application créée
        if (app.createdAt && this.isRecent(app.createdAt, 24)) {
          notifications.push({
            type: 'success',
            title: 'Nouvelle candidature créée',
            message: `Votre candidature pour "${app.programName || 'Programme'}" a été créée avec succès.`,
            category: 'application',
            action: 'Voir la candidature',
            data: { applicationId: app.id, action: 'view' },
            priority: 'medium'
          });
        }

        // Changement de statut
        if (app.updatedAt && this.isRecent(app.updatedAt, 2)) {
          notifications.push({
            type: 'info',
            title: 'Statut de candidature mis à jour',
            message: `Le statut de votre candidature "${app.programName || 'Programme'}" est maintenant "${this.getStatusLabel(app.status)}".`,
            category: 'application',
            action: 'Voir les détails',
            data: { applicationId: app.id, action: 'view' },
            priority: 'high'
          });
        }

        // Échéances approchantes
        if (app.deadline) {
          const daysUntilDeadline = this.getDaysUntilDeadline(app.deadline);
          if (daysUntilDeadline <= 7 && daysUntilDeadline > 0) {
            notifications.push({
              type: 'warning',
              title: 'Échéance approchante',
              message: `L'échéance pour "${app.programName || 'Programme'}" est dans ${daysUntilDeadline} jour(s).`,
              category: 'deadline',
              action: 'Finaliser la candidature',
              data: { applicationId: app.id, action: 'complete' },
              priority: 'high'
            });
          }
        }
      });

      // 2. Notifications des programmes sauvegardés
      savedPrograms.forEach(program => {
        // Nouveau programme sauvegardé
        if (program.savedAt && this.isRecent(program.savedAt, 24)) {
          notifications.push({
            type: 'info',
            title: 'Programme sauvegardé',
            message: `"${program.name || 'Programme'}" a été ajouté à vos favoris.`,
            category: 'program',
            action: 'Voir le programme',
            data: { programId: program.id, action: 'view' },
            priority: 'low'
          });
        }
      });

      // 3. Notifications système
      notifications.push({
        type: 'system',
        title: 'Bienvenue sur votre dashboard',
        message: 'Votre tableau de bord personnel est maintenant actif. Suivez vos candidatures et programmes en temps réel.',
        category: 'system',
        action: 'Explorer',
        data: { action: 'explore' },
        priority: 'low'
      });

      // Ajouter toutes les notifications
      notifications.forEach(notification => {
        this.addNotification(notification);
      });

      return notifications;
    } catch (error) {
      console.error('Erreur lors de la génération des notifications:', error);
      return [];
    }
  }

  /**
   * Générer des notifications pour les actions utilisateur
   */
  generateActionNotification(action, data) {
    const notifications = {
      'application_created': {
        type: 'success',
        title: 'Candidature créée',
        message: `Votre candidature pour "${data.programName}" a été créée avec succès.`,
        category: 'application',
        action: 'Continuer',
        data: { applicationId: data.id, action: 'continue' },
        priority: 'medium'
      },
      'application_updated': {
        type: 'info',
        title: 'Candidature mise à jour',
        message: `Votre candidature pour "${data.programName}" a été mise à jour.`,
        category: 'application',
        action: 'Voir les changements',
        data: { applicationId: data.id, action: 'view' },
        priority: 'medium'
      },
      'application_submitted': {
        type: 'success',
        title: 'Candidature soumise',
        message: `Votre candidature pour "${data.programName}" a été soumise avec succès !`,
        category: 'application',
        action: 'Suivre le statut',
        data: { applicationId: data.id, action: 'track' },
        priority: 'high'
      },
      'program_saved': {
        type: 'info',
        title: 'Programme sauvegardé',
        message: `"${data.programName}" a été ajouté à vos favoris.`,
        category: 'program',
        action: 'Voir le programme',
        data: { programId: data.id, action: 'view' },
        priority: 'low'
      },
      'program_removed': {
        type: 'warning',
        title: 'Programme retiré',
        message: `"${data.programName}" a été retiré de vos favoris.`,
        category: 'program',
        action: 'Restaurer',
        data: { programId: data.id, action: 'restore' },
        priority: 'low'
      },
      'document_uploaded': {
        type: 'success',
        title: 'Document uploadé',
        message: `Le document "${data.documentName}" a été uploadé avec succès.`,
        category: 'document',
        action: 'Vérifier',
        data: { documentId: data.id, action: 'verify' },
        priority: 'medium'
      },
      'payment_completed': {
        type: 'success',
        title: 'Paiement effectué',
        message: `Votre paiement de ${data.amount} MAD a été traité avec succès.`,
        category: 'payment',
        action: 'Voir le reçu',
        data: { paymentId: data.id, action: 'receipt' },
        priority: 'high'
      },
      'status_changed': {
        type: 'info',
        title: 'Statut mis à jour',
        message: `Le statut de votre candidature est maintenant "${data.newStatus}".`,
        category: 'application',
        action: 'Voir les détails',
        data: { applicationId: data.id, action: 'view' },
        priority: 'high'
      }
    };

    const notification = notifications[action];
    if (notification) {
      return this.addNotification(notification);
    }
  }

  // ===== UTILITAIRES =====

  /**
   * Vérifier si une date est récente
   */
  isRecent(date, hours) {
    const dateObj = new Date(date);
    const now = new Date();
    const diffHours = (now - dateObj) / (1000 * 60 * 60);
    return diffHours <= hours;
  }

  /**
   * Calculer les jours jusqu'à l'échéance
   */
  getDaysUntilDeadline(deadline) {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  /**
   * Obtenir le label d'un statut
   */
  getStatusLabel(status) {
    const labels = {
      'DRAFT': 'Brouillon',
      'IN_PROGRESS': 'En cours',
      'READY_FOR_SUBMISSION': 'Prêt à soumettre',
      'SUBMITTED': 'Soumise',
      'UNDER_REVIEW': 'En révision',
      'APPROVED': 'Approuvée',
      'REJECTED': 'Rejetée',
      'COMPLETED': 'Terminée'
    };
    return labels[status] || status;
  }

  // ===== GESTION DES LISTENERS =====

  /**
   * Ajouter un listener pour les changements
   */
  addListener(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  /**
   * Notifier tous les listeners
   */
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.notifications);
      } catch (error) {
        console.error('Erreur dans le listener de notification:', error);
      }
    });
  }

  // ===== PERSISTANCE =====

  /**
   * Sauvegarder en localStorage
   */
  saveToLocalStorage() {
    try {
      localStorage.setItem('notifications', JSON.stringify(this.notifications));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des notifications:', error);
    }
  }

  /**
   * Charger depuis localStorage
   */
  loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem('notifications');
      if (stored) {
        this.notifications = JSON.parse(stored);
        this.notifications.forEach(n => {
          n.timestamp = new Date(n.timestamp);
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement des notifications:', error);
      this.notifications = [];
    }
  }

  // ===== STATISTIQUES =====

  /**
   * Obtenir les statistiques des notifications
   */
  getNotificationStats() {
    const total = this.notifications.length;
    const unread = this.notifications.filter(n => !n.read).length;
    const byCategory = this.notifications.reduce((acc, n) => {
      acc[n.category] = (acc[n.category] || 0) + 1;
      return acc;
    }, {});
    const byPriority = this.notifications.reduce((acc, n) => {
      acc[n.priority] = (acc[n.priority] || 0) + 1;
      return acc;
    }, {});

        return {
      total,
      unread,
      byCategory,
      byPriority,
      lastNotification: this.notifications[0]?.timestamp || null
    };
  }

  /**
   * Obtenir les notifications par catégorie
   */
  getNotificationsByCategory(category) {
    return this.notifications.filter(n => n.category === category);
  }

  /**
   * Obtenir les notifications par priorité
   */
  getNotificationsByPriority(priority) {
    return this.notifications.filter(n => n.priority === priority);
  }

  /**
   * Obtenir les notifications non lues
   */
  getUnreadNotifications() {
    return this.notifications.filter(n => !n.read);
  }

  // ===== INITIALISATION =====

  /**
   * Initialiser le service
   */
  init() {
    this.loadFromLocalStorage();
    
    // Démarrer la surveillance automatique
    this.startAutoCheck();
    
    console.log('🔔 Service de notifications initialisé');
  }

  /**
   * Démarrer la vérification automatique
   */
  startAutoCheck() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    
    // Vérifier toutes les 5 minutes
    this.checkInterval = setInterval(() => {
      this.cleanupOldNotifications();
    }, 5 * 60 * 1000);
  }

  /**
   * Nettoyer les anciennes notifications
   */
  cleanupOldNotifications() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    this.notifications = this.notifications.filter(n => 
      new Date(n.timestamp) > thirtyDaysAgo
    );
    
    this.saveToLocalStorage();
    this.notifyListeners();
  }

  /**
   * Arrêter le service
   */
  destroy() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
    this.listeners = [];
  }
}

// Instance singleton
const notificationService = new NotificationService();

export default notificationService;
