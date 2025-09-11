package com.diravenir.controller;

import com.diravenir.dto.ChatMessageDTO;
import com.diravenir.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ChatController {
    
    private final ChatService chatService;
    
    /**
     * Envoyer un message
     */
    @PostMapping("/send")
    public ResponseEntity<ChatMessageDTO> sendMessage(@RequestBody ChatMessageDTO messageDTO) {
        try {
            log.info("Réception d'un nouveau message de {} vers {}", messageDTO.getSenderId(), messageDTO.getReceiverId());
            ChatMessageDTO savedMessage = chatService.sendMessage(messageDTO);
            return ResponseEntity.ok(savedMessage);
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi du message", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Récupérer les messages d'une conversation
     */
    @GetMapping("/conversation/{conversationId}")
    public ResponseEntity<List<ChatMessageDTO>> getConversationMessages(@PathVariable String conversationId) {
        try {
            log.info("Récupération des messages pour la conversation: {}", conversationId);
            List<ChatMessageDTO> messages = chatService.getConversationMessages(conversationId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des messages de la conversation: {}", conversationId, e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Récupérer les messages entre deux utilisateurs
     */
    @GetMapping("/messages/{userId1}/{userId2}")
    public ResponseEntity<List<ChatMessageDTO>> getMessagesBetweenUsers(
            @PathVariable String userId1, 
            @PathVariable String userId2) {
        try {
            log.info("Récupération des messages entre {} et {}", userId1, userId2);
            List<ChatMessageDTO> messages = chatService.getMessagesBetweenUsers(userId1, userId2);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des messages entre utilisateurs", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Marquer les messages comme lus
     */
    @PostMapping("/read/{receiverId}/{conversationId}")
    public ResponseEntity<Void> markMessagesAsRead(
            @PathVariable String receiverId, 
            @PathVariable String conversationId) {
        try {
            log.info("Marquage des messages comme lus pour {} dans la conversation {}", receiverId, conversationId);
            chatService.markMessagesAsRead(receiverId, conversationId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Erreur lors du marquage des messages comme lus", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Récupérer les messages non lus pour un utilisateur
     */
    @GetMapping("/unread/{receiverId}")
    public ResponseEntity<List<ChatMessageDTO>> getUnreadMessages(@PathVariable String receiverId) {
        try {
            log.info("Récupération des messages non lus pour: {}", receiverId);
            List<ChatMessageDTO> messages = chatService.getUnreadMessages(receiverId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des messages non lus", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Compter les messages non lus pour un utilisateur
     */
    @GetMapping("/unread-count/{receiverId}")
    public ResponseEntity<Map<String, Long>> countUnreadMessages(@PathVariable String receiverId) {
        try {
            log.info("Comptage des messages non lus pour: {}", receiverId);
            Long count = chatService.countUnreadMessages(receiverId);
            return ResponseEntity.ok(Map.of("unreadCount", count));
        } catch (Exception e) {
            log.error("Erreur lors du comptage des messages non lus", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Récupérer les dernières conversations d'un utilisateur
     */
    @GetMapping("/conversations/{userId}")
    public ResponseEntity<List<ChatMessageDTO>> getLastMessagesByUserId(@PathVariable String userId) {
        try {
            log.info("Récupération des dernières conversations pour: {}", userId);
            List<ChatMessageDTO> messages = chatService.getLastMessagesByUserId(userId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des conversations", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Envoyer un message système
     */
    @PostMapping("/system-message")
    public ResponseEntity<ChatMessageDTO> sendSystemMessage(@RequestBody Map<String, String> request) {
        try {
            String receiverId = request.get("receiverId");
            String message = request.get("message");
            
            log.info("Envoi d'un message système à: {}", receiverId);
            ChatMessageDTO systemMessage = chatService.sendSystemMessage(receiverId, message);
            return ResponseEntity.ok(systemMessage);
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi du message système", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Supprimer un message
     */
    @DeleteMapping("/message/{messageId}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long messageId) {
        try {
            log.info("Suppression du message: {}", messageId);
            chatService.deleteMessage(messageId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Erreur lors de la suppression du message", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Récupérer les statistiques de chat
     */
    @GetMapping("/statistics")
    public ResponseEntity<ChatService.ChatStatistics> getChatStatistics() {
        try {
            log.info("Récupération des statistiques de chat");
            ChatService.ChatStatistics statistics = chatService.getChatStatistics();
            return ResponseEntity.ok(statistics);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des statistiques", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Endpoint de santé pour le chat
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of("status", "Chat service is running"));
    }
}
