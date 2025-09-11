import apiClient from './api.js';

// Service de chat pour communiquer avec le backend
export const chatService = {
  // Envoyer un message
  async sendMessage(messageData) {
    try {
      const response = await apiClient.post('/chat/send', messageData);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi du message:', error);
      throw error;
    }
  },

  // Récupérer les messages d'une conversation
  async getConversationMessages(conversationId, page = 0, size = 50) {
    try {
      const response = await apiClient.get(`/chat/conversation/${conversationId}`, {
        params: { page, size }
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des messages:', error);
      throw error;
    }
  },

  // Récupérer les messages entre deux utilisateurs
  async getMessagesBetweenUsers(userId1, userId2, page = 0, size = 50) {
    try {
      const response = await apiClient.get(`/chat/messages/${userId1}/${userId2}`, {
        params: { page, size }
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des messages:', error);
      throw error;
    }
  },

  // Marquer les messages comme lus
  async markMessagesAsRead(receiverId, conversationId) {
    try {
      const response = await apiClient.put(`/chat/read/${receiverId}/${conversationId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors du marquage des messages:', error);
      throw error;
    }
  },

  // Récupérer les messages non lus
  async getUnreadMessages(receiverId) {
    try {
      const response = await apiClient.get(`/chat/unread/${receiverId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des messages non lus:', error);
      throw error;
    }
  },

  // Récupérer le nombre de messages non lus
  async getUnreadCount(receiverId) {
    try {
      const response = await apiClient.get(`/chat/unread-count/${receiverId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération du nombre de messages non lus:', error);
      throw error;
    }
  },

  // Récupérer les conversations d'un utilisateur
  async getUserConversations(userId) {
    try {
      const response = await apiClient.get(`/chat/conversations/${userId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des conversations:', error);
      throw error;
    }
  },

  // Envoyer un message système
  async sendSystemMessage(messageData) {
    try {
      const response = await apiClient.post('/chat/system-message', messageData);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi du message système:', error);
      throw error;
    }
  },

  // Supprimer un message
  async deleteMessage(messageId) {
    try {
      const response = await apiClient.delete(`/chat/message/${messageId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la suppression du message:', error);
      throw error;
    }
  },

  // Modifier un message
  async editMessage(messageId, messageData) {
    try {
      const response = await apiClient.put(`/chat/message/${messageId}`, messageData);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la modification du message:', error);
      throw error;
    }
  },

  // Récupérer les statistiques du chat
  async getChatStatistics() {
    try {
      const response = await apiClient.get('/chat/statistics');
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des statistiques:', error);
      throw error;
    }
  },

  // Recherche avancée de messages
  async searchMessages(searchRequest) {
    try {
      const response = await apiClient.post('/chat/search/advanced', searchRequest);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la recherche de messages:', error);
      throw error;
    }
  },

  // Recherche avec tolérance aux fautes de frappe
  async searchWithTypoTolerance(userId, searchTerm) {
    try {
      const response = await apiClient.get(`/chat/search/typo-tolerant/${userId}`, {
        params: { term: searchTerm }
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la recherche avec tolérance:', error);
      throw error;
    }
  },

  // Recherche par mots-clés multiples
  async searchByMultipleKeywords(userId, keywords) {
    try {
      const response = await apiClient.post(`/chat/search/keywords/${userId}`, { keywords });
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la recherche par mots-clés:', error);
      throw error;
    }
  },

  // Recherche de messages média
  async searchMediaMessages(userId) {
    try {
      const response = await apiClient.get(`/chat/search/media/${userId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la recherche de messages média:', error);
      throw error;
    }
  },

  // Recherche de messages système
  async searchSystemMessages(userId) {
    try {
      const response = await apiClient.get(`/chat/search/system/${userId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la recherche de messages système:', error);
      throw error;
    }
  },

  // Recherche par période
  async searchByPeriod(userId, startDate, endDate) {
    try {
      const response = await apiClient.get(`/chat/search/period/${userId}`, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la recherche par période:', error);
      throw error;
    }
  },

  // Recherche par contenu
  async searchByContent(userId, content) {
    try {
      const response = await apiClient.get(`/chat/search/content/${userId}`, {
        params: { content }
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la recherche par contenu:', error);
      throw error;
    }
  },

  // Recherche par type de message
  async searchByMessageType(userId, messageType) {
    try {
      const response = await apiClient.get(`/chat/search/type/${userId}`, {
        params: { type: messageType }
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la recherche par type:', error);
      throw error;
    }
  },

  // Recherche de messages non lus
  async searchUnreadMessages(userId) {
    try {
      const response = await apiClient.get(`/chat/search/unread/${userId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la recherche de messages non lus:', error);
      throw error;
    }
  },

  // Recherche de messages modifiés
  async searchEditedMessages(userId) {
    try {
      const response = await apiClient.get(`/chat/search/edited/${userId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la recherche de messages modifiés:', error);
      throw error;
    }
  },

  // Recherche globale
  async searchGlobal(searchTerm) {
    try {
      const response = await apiClient.get('/chat/search/global', {
        params: { term: searchTerm }
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la recherche globale:', error);
      throw error;
    }
  },

  // Obtenir des suggestions de recherche
  async getSearchSuggestions(searchTerm) {
    try {
      const response = await apiClient.get('/chat/search/suggestions', {
        params: { term: searchTerm }
      });
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des suggestions:', error);
      throw error;
    }
  },

  // Obtenir les statistiques de recherche d'un utilisateur
  async getSearchStatistics(userId) {
    try {
      const response = await apiClient.get(`/chat/search/statistics/${userId}`);
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des statistiques de recherche:', error);
      throw error;
    }
  },

  // Vérifier la santé du service de recherche
  async checkSearchHealth() {
    try {
      const response = await apiClient.get('/chat/search/health');
      return response.data;
    } catch (error) {
      console.error('❌ Erreur lors de la vérification de la santé du service:', error);
      throw error;
    }
  }
};

export default chatService;
