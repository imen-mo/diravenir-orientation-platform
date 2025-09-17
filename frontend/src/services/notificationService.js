// NotificationService.js - Service pour les notifications et emails

import apiService from './api';

class NotificationService {
  
  // Envoyer une notification après la completion d'un test
  async sendTestCompletionNotification(testData) {
    try {
      const notificationData = {
        type: 'TEST_COMPLETED',
        title: 'Test d\'orientation terminé',
        message: `Félicitations ! Vous avez terminé le test "${testData.testName}" avec un score de ${testData.score}%.`,
        userId: testData.userId,
        testId: testData.testId,
        score: testData.score,
        completedAt: new Date().toISOString()
      };

      // Envoyer la notification
      const notificationResponse = await apiService.createNotification(notificationData);
      
      // Envoyer l'email avec les résultats
      const emailResponse = await this.sendTestResultsEmail(testData);
      
      return {
        success: true,
        notification: notificationResponse,
        email: emailResponse
      };
      
    } catch (error) {
      console.error('Erreur envoi notification test:', error);
      throw error;
    }
  }

  // Envoyer un email avec les résultats du test
  async sendTestResultsEmail(testData) {
    try {
      const emailData = {
        to: testData.userEmail,
        subject: `Résultats de votre test d'orientation - ${testData.testName}`,
        template: 'test-results',
        data: {
          userName: testData.userName,
          testName: testData.testName,
          score: testData.score,
          completedAt: testData.completedAt,
          recommendations: testData.recommendations || [],
          detailedResults: testData.detailedResults || {}
        }
      };

      const response = await apiService.sendEmail(emailData);
      return response;
      
    } catch (error) {
      console.error('Erreur envoi email résultats:', error);
      throw error;
    }
  }

  // Envoyer une notification de candidature
  async sendApplicationNotification(applicationData) {
    try {
      const notificationData = {
        type: 'APPLICATION_SUBMITTED',
        title: 'Candidature soumise',
        message: `Votre candidature pour "${applicationData.programName}" a été soumise avec succès.`,
        userId: applicationData.userId,
        applicationId: applicationData.applicationId,
        submittedAt: new Date().toISOString()
      };

      const response = await apiService.createNotification(notificationData);
      return response;
      
    } catch (error) {
      console.error('Erreur envoi notification candidature:', error);
      throw error;
    }
  }

  // Récupérer les notifications de l'utilisateur
  async getUserNotifications(userId) {
    try {
      const response = await apiService.getUserNotifications(userId);
      return response;
      } catch (error) {
      console.error('Erreur récupération notifications:', error);
      throw error;
    }
  }

  // Marquer une notification comme lue
  async markNotificationAsRead(notificationId) {
    try {
      const response = await apiService.markNotificationAsRead(notificationId);
      return response;
    } catch (error) {
      console.error('Erreur marquage notification:', error);
      throw error;
    }
  }

  // Envoyer une notification push (pour les navigateurs qui le supportent)
  async sendPushNotification(title, message, options = {}) {
    try {
      if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification(title, {
          body: message,
          icon: '/logo_diravenir.png',
          badge: '/logo_diravenir.png',
          ...options
        });

        // Fermer automatiquement après 5 secondes
        setTimeout(() => {
          notification.close();
        }, 5000);

        return notification;
      }
    } catch (error) {
      console.error('Erreur notification push:', error);
    }
  }

  // Demander la permission pour les notifications push
  async requestNotificationPermission() {
    try {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      }
      return false;
    } catch (error) {
      console.error('Erreur demande permission notification:', error);
      return false;
    }
  }
}

export default new NotificationService();