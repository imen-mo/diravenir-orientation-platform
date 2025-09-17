package com.diravenir.service;

import com.diravenir.dto.ChatMessageDTO;
import java.util.Map;

/**
 * Interface pour le service de chat WebSocket
 */
public interface WebSocketChatService {
    
    /**
     * Envoyer un message via WebSocket
     */
    void sendMessage(String destination, ChatMessageDTO message);
    
    /**
     * Envoyer un message à un utilisateur spécifique
     */
    void sendMessageToUser(String username, ChatMessageDTO message);
    
    /**
     * Envoyer une notification de connexion
     */
    void sendConnectionNotification(String sessionId, Map<String, Object> userInfo);
    
    /**
     * Envoyer une notification de déconnexion
     */
    void sendDisconnectionNotification(String sessionId);
}
