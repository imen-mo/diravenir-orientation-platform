package com.diravenir.service;

import com.diravenir.dto.ChatMessageDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class WebSocketChatService {
    
    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper;
    
    /**
     * Envoyer un message en temps réel à un utilisateur spécifique
     */
    public void sendMessageToUser(String userId, ChatMessageDTO message) {
        try {
            String destination = "/user/" + userId + "/queue/messages";
            messagingTemplate.convertAndSendToUser(userId, "/queue/messages", message);
            log.info("Message WebSocket envoyé à l'utilisateur: {} via {}", userId, destination);
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi du message WebSocket à l'utilisateur: {}", userId, e);
        }
    }
    
    /**
     * Envoyer un message en temps réel à tous les administrateurs
     */
    public void sendMessageToAdmins(ChatMessageDTO message) {
        try {
            messagingTemplate.convertAndSend("/topic/admin/messages", message);
            log.info("Message WebSocket envoyé à tous les administrateurs");
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi du message WebSocket aux administrateurs", e);
        }
    }
    
    /**
     * Envoyer un message en temps réel à tous les étudiants
     */
    public void sendMessageToStudents(ChatMessageDTO message) {
        try {
            messagingTemplate.convertAndSend("/topic/student/messages", message);
            log.info("Message WebSocket envoyé à tous les étudiants");
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi du message WebSocket aux étudiants", e);
        }
    }
    
    /**
     * Envoyer une notification de nouveau message
     */
    public void sendNotification(String userId, String notification) {
        try {
            messagingTemplate.convertAndSendToUser(userId, "/queue/notifications", notification);
            log.info("Notification WebSocket envoyée à l'utilisateur: {}", userId);
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi de la notification WebSocket à l'utilisateur: {}", userId, e);
        }
    }
    
    /**
     * Envoyer une notification de statut de lecture
     */
    public void sendReadStatus(String conversationId, String userId) {
        try {
            messagingTemplate.convertAndSend("/topic/conversation/" + conversationId + "/read-status", 
                Map.of("userId", userId, "timestamp", System.currentTimeMillis()));
            log.info("Statut de lecture WebSocket envoyé pour la conversation: {}", conversationId);
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi du statut de lecture WebSocket", e);
        }
    }
    
    /**
     * Envoyer une notification de présence utilisateur
     */
    public void sendUserPresence(String userId, boolean isOnline) {
        try {
            messagingTemplate.convertAndSend("/topic/presence", 
                Map.of("userId", userId, "online", isOnline, "timestamp", System.currentTimeMillis()));
            log.info("Statut de présence WebSocket envoyé pour l'utilisateur: {}", userId);
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi du statut de présence WebSocket", e);
        }
    }
    
    /**
     * Envoyer une notification de frappe
     */
    public void sendTypingIndicator(String conversationId, String userId, boolean isTyping) {
        try {
            messagingTemplate.convertAndSend("/topic/conversation/" + conversationId + "/typing", 
                Map.of("userId", userId, "typing", isTyping, "timestamp", System.currentTimeMillis()));
            log.info("Indicateur de frappe WebSocket envoyé pour la conversation: {}", conversationId);
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi de l'indicateur de frappe WebSocket", e);
        }
    }
    
    /**
     * Envoyer une notification de nouveau message non lu
     */
    public void sendUnreadCount(String userId, Long unreadCount) {
        try {
            messagingTemplate.convertAndSendToUser(userId, "/queue/unread-count", 
                Map.of("unreadCount", unreadCount));
            log.info("Compteur de messages non lus WebSocket envoyé à l'utilisateur: {}", userId);
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi du compteur de messages non lus WebSocket", e);
        }
    }
}
