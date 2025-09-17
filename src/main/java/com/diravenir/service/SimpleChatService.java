package com.diravenir.service;

import java.util.List;
import java.util.Map;

/**
 * Interface pour le service de chat simple
 */
public interface SimpleChatService {
    
    /**
     * Envoyer un message simple
     */
    Map<String, Object> sendMessage(String sessionId, String message, String senderId);
    
    /**
     * Obtenir l'historique des messages
     */
    List<Map<String, Object>> getMessageHistory(String sessionId);
    
    /**
     * Créer une nouvelle session de chat
     */
    String createChatSession(String userId, String conseillerType);
    
    /**
     * Fermer une session de chat
     */
    void closeChatSession(String sessionId);
}
