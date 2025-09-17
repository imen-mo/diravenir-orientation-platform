// useTestNotification.js - Hook pour gérer les notifications après les tests

import { useState, useCallback } from 'react';
import notificationService from '../services/notificationService';

export const useTestNotification = () => {
  const [isSending, setIsSending] = useState(false);

  const sendTestCompletionNotification = useCallback(async (testData) => {
    try {
      setIsSending(true);
      
      // Récupérer les données utilisateur
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      
      if (!user) {
        throw new Error('Utilisateur non trouvé');
      }

      // Préparer les données de notification
      const notificationData = {
        userId: user.id,
        userEmail: user.email,
        userName: `${user.firstName} ${user.lastName}`,
        testId: testData.testId,
        testName: testData.testName || 'Test d\'orientation',
        score: testData.score,
        completedAt: new Date().toISOString(),
        recommendations: testData.recommendations || [],
        detailedResults: testData.detailedResults || {}
      };

      // Envoyer la notification et l'email
      const result = await notificationService.sendTestCompletionNotification(notificationData);
      
      // Envoyer une notification push si possible
      await notificationService.sendPushNotification(
        'Test terminé !',
        `Félicitations ! Vous avez obtenu ${testData.score}% au test d'orientation.`,
        {
          tag: 'test-completed',
          requireInteraction: true
        }
      );

      return result;
      
    } catch (error) {
      console.error('Erreur envoi notification test:', error);
      throw error;
    } finally {
      setIsSending(false);
    }
  }, []);

  const sendApplicationNotification = useCallback(async (applicationData) => {
    try {
      setIsSending(true);
      
      const result = await notificationService.sendApplicationNotification(applicationData);
      
      // Notification push
      await notificationService.sendPushNotification(
        'Candidature soumise',
        `Votre candidature pour "${applicationData.programName}" a été soumise avec succès.`
      );

      return result;
      
    } catch (error) {
      console.error('Erreur envoi notification candidature:', error);
      throw error;
    } finally {
      setIsSending(false);
    }
  }, []);

  const requestNotificationPermission = useCallback(async () => {
    try {
      const granted = await notificationService.requestNotificationPermission();
      return granted;
    } catch (error) {
      console.error('Erreur demande permission notification:', error);
      return false;
    }
  }, []);

  return {
    sendTestCompletionNotification,
    sendApplicationNotification,
    requestNotificationPermission,
    isSending
  };
};

export default useTestNotification;
