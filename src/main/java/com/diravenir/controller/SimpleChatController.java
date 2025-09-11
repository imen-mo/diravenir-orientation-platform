package com.diravenir.controller;

import com.diravenir.service.SimpleChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/simple-chat")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class SimpleChatController {

    private final SimpleChatService chatService;

    /**
     * Créer une nouvelle conversation
     */
    @PostMapping("/conversations")
    public ResponseEntity<SimpleChatService.ChatConversation> createConversation(@RequestBody Map<String, Object> request) {
        try {
            String userId = request.get("userId").toString();
            String subject = request.get("subject").toString();
            String category = request.get("category").toString();
            String priority = request.get("priority").toString();

            SimpleChatService.ChatConversation conversation = chatService.createConversation(userId, subject, category, priority);
            return ResponseEntity.ok(conversation);
        } catch (Exception e) {
            log.error("Erreur lors de la création de la conversation", e);
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Envoyer un message
     */
    @PostMapping("/messages")
    public ResponseEntity<SimpleChatService.ChatMessage> sendMessage(@RequestBody Map<String, Object> request) {
        try {
            String conversationId = request.get("conversationId").toString();
            String senderId = request.get("senderId").toString();
            String content = request.get("content").toString();
            String messageType = request.get("messageType").toString();

            SimpleChatService.ChatMessage message = chatService.sendMessage(conversationId, senderId, content, messageType);
            return ResponseEntity.ok(message);
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi du message", e);
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Récupérer les conversations d'un utilisateur
     */
    @GetMapping("/conversations/user/{userId}")
    public ResponseEntity<List<SimpleChatService.ChatConversation>> getUserConversations(@PathVariable String userId) {
        try {
            List<SimpleChatService.ChatConversation> conversations = chatService.getUserConversations(userId);
            return ResponseEntity.ok(conversations);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des conversations", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Récupérer les messages d'une conversation
     */
    @GetMapping("/conversations/{conversationId}/messages")
    public ResponseEntity<List<SimpleChatService.ChatMessage>> getConversationMessages(@PathVariable String conversationId) {
        try {
            List<SimpleChatService.ChatMessage> messages = chatService.getConversationMessages(conversationId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des messages", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Créer une demande de rendez-vous
     */
    @PostMapping("/appointments")
    public ResponseEntity<SimpleChatService.Appointment> createAppointmentRequest(@RequestBody Map<String, Object> request) {
        try {
            String userId = request.get("userId").toString();
            String adminId = request.get("adminId").toString();
            String type = request.get("type").toString();
            String date = request.get("date").toString();
            String timeSlot = request.get("timeSlot").toString();
            Integer duration = Integer.parseInt(request.get("duration").toString());
            String notes = request.get("notes").toString();

            SimpleChatService.Appointment appointment = chatService.createAppointment(userId, adminId, type, date, timeSlot, duration, notes);
            return ResponseEntity.ok(appointment);
        } catch (Exception e) {
            log.error("Erreur lors de la création de la demande de rendez-vous", e);
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Récupérer les statistiques du chat
     */
    @GetMapping("/statistics")
    public ResponseEntity<SimpleChatService.ChatStatistics> getChatStatistics() {
        try {
            SimpleChatService.ChatStatistics statistics = chatService.getChatStatistics();
            return ResponseEntity.ok(statistics);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des statistiques", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Endpoint de santé du chat
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of(
            "status", "OK",
            "service", "Simple Chat Service",
            "timestamp", java.time.LocalDateTime.now().toString(),
            "message", "Système de chat simplifié opérationnel"
        ));
    }
}
