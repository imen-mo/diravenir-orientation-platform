package com.diravenir.controller;

import com.diravenir.dto.ChatMessageDTO;
import com.diravenir.service.ChatService;
import com.diravenir.service.WebSocketChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
public class WebSocketChatController {
    
    private final ChatService chatService;
    private final WebSocketChatService webSocketChatService;
    
    /**
     * Gérer l'envoi de messages via WebSocket
     */
    @MessageMapping("/chat.sendMessage")
    @SendToUser("/queue/messages")
    public ChatMessageDTO sendMessage(@Payload ChatMessageDTO chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        try {
            log.info("Message WebSocket reçu de {} vers {}", chatMessage.getSenderId(), chatMessage.getReceiverId());
            
            // Sauvegarder le message dans la base de données
            ChatMessageDTO savedMessage = chatService.sendMessage(chatMessage);
            
            // Envoyer le message au destinataire spécifique
            webSocketChatService.sendMessageToUser(chatMessage.getReceiverId(), savedMessage);
            
            // Envoyer une notification de nouveau message non lu
            Long unreadCount = chatService.countUnreadMessages(chatMessage.getReceiverId());
            webSocketChatService.sendUnreadCount(chatMessage.getReceiverId(), unreadCount);
            
            return savedMessage;
        } catch (Exception e) {
            log.error("Erreur lors du traitement du message WebSocket", e);
            throw new RuntimeException("Erreur lors du traitement du message", e);
        }
    }
    
    /**
     * Gérer la connexion d'un utilisateur au chat
     */
    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public Map<String, Object> addUser(@Payload Map<String, String> userInfo, SimpMessageHeaderAccessor headerAccessor) {
        try {
            String userId = userInfo.get("userId");
            String userType = userInfo.get("userType");
            
            // Ajouter l'utilisateur à la session WebSocket
            headerAccessor.getSessionAttributes().put("userId", userId);
            headerAccessor.getSessionAttributes().put("userType", userType);
            
            log.info("Utilisateur connecté au chat: {} (Type: {})", userId, userType);
            
            // Envoyer le statut de présence
            webSocketChatService.sendUserPresence(userId, true);
            
            return Map.of(
                "type", "JOIN",
                "userId", userId,
                "userType", userType,
                "timestamp", System.currentTimeMillis()
            );
        } catch (Exception e) {
            log.error("Erreur lors de l'ajout de l'utilisateur au chat", e);
            throw new RuntimeException("Erreur lors de l'ajout de l'utilisateur", e);
        }
    }
    
    /**
     * Gérer la déconnexion d'un utilisateur
     */
    @MessageMapping("/chat.removeUser")
    @SendTo("/topic/public")
    public Map<String, Object> removeUser(@Payload Map<String, String> userInfo) {
        try {
            String userId = userInfo.get("userId");
            String userType = userInfo.get("userType");
            
            log.info("Utilisateur déconnecté du chat: {} (Type: {})", userId, userType);
            
            // Envoyer le statut de présence
            webSocketChatService.sendUserPresence(userId, false);
            
            return Map.of(
                "type", "LEAVE",
                "userId", userId,
                "userType", userType,
                "timestamp", System.currentTimeMillis()
            );
        } catch (Exception e) {
            log.error("Erreur lors de la suppression de l'utilisateur du chat", e);
            throw new RuntimeException("Erreur lors de la suppression de l'utilisateur", e);
        }
    }
    
    /**
     * Gérer l'indicateur de frappe
     */
    @MessageMapping("/chat.typing")
    @SendTo("/topic/typing")
    public Map<String, Object> typing(@Payload Map<String, Object> typingInfo) {
        try {
            String userId = (String) typingInfo.get("userId");
            String conversationId = (String) typingInfo.get("conversationId");
            Boolean isTyping = (Boolean) typingInfo.get("isTyping");
            
            log.info("Indicateur de frappe: {} - Conversation: {} - Frappe: {}", userId, conversationId, isTyping);
            
            // Envoyer l'indicateur de frappe à tous les participants de la conversation
            webSocketChatService.sendTypingIndicator(conversationId, userId, isTyping);
            
            return Map.of(
                "userId", userId,
                "conversationId", conversationId,
                "isTyping", isTyping,
                "timestamp", System.currentTimeMillis()
            );
        } catch (Exception e) {
            log.error("Erreur lors du traitement de l'indicateur de frappe", e);
            throw new RuntimeException("Erreur lors du traitement de l'indicateur de frappe", e);
        }
    }
    
    /**
     * Gérer le marquage des messages comme lus
     */
    @MessageMapping("/chat.markAsRead")
    @SendToUser("/queue/read-status")
    public Map<String, Object> markAsRead(@Payload Map<String, String> readInfo) {
        try {
            String userId = readInfo.get("userId");
            String conversationId = readInfo.get("conversationId");
            
            log.info("Marquage des messages comme lus: {} - Conversation: {}", userId, conversationId);
            
            // Marquer les messages comme lus dans la base de données
            chatService.markMessagesAsRead(userId, conversationId);
            
            // Envoyer le statut de lecture à tous les participants
            webSocketChatService.sendReadStatus(conversationId, userId);
            
            return Map.of(
                "userId", userId,
                "conversationId", conversationId,
                "timestamp", System.currentTimeMillis()
            );
        } catch (Exception e) {
            log.error("Erreur lors du marquage des messages comme lus", e);
            throw new RuntimeException("Erreur lors du marquage des messages", e);
        }
    }
    
    /**
     * Gérer les messages système
     */
    @MessageMapping("/chat.systemMessage")
    @SendTo("/topic/system")
    public Map<String, Object> systemMessage(@Payload Map<String, String> systemInfo) {
        try {
            String receiverId = systemInfo.get("receiverId");
            String message = systemInfo.get("message");
            
            log.info("Message système envoyé à: {}", receiverId);
            
            // Envoyer le message système
            ChatMessageDTO systemMessage = chatService.sendSystemMessage(receiverId, message);
            
            return Map.of(
                "type", "SYSTEM",
                "receiverId", receiverId,
                "message", message,
                "timestamp", System.currentTimeMillis()
            );
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi du message système", e);
            throw new RuntimeException("Erreur lors de l'envoi du message système", e);
        }
    }
}
