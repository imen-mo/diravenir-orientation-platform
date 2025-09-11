package com.diravenir.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class SimpleChatService {

    // Stockage temporaire des conversations et messages
    private final Map<String, ChatConversation> conversations = new ConcurrentHashMap<>();
    private final Map<String, List<ChatMessage>> messages = new ConcurrentHashMap<>();

    /**
     * Créer une nouvelle conversation
     */
    public ChatConversation createConversation(String userId, String subject, String category, String priority) {
        try {
            String conversationId = "conv_" + System.currentTimeMillis();
            
            ChatConversation conversation = new ChatConversation();
            conversation.setId(conversationId);
            conversation.setUserId(userId);
            conversation.setSubject(subject);
            conversation.setCategory(category);
            conversation.setPriority(priority);
            conversation.setStatus("OPEN");
            conversation.setCreatedAt(LocalDateTime.now());
            conversation.setUpdatedAt(LocalDateTime.now());

            conversations.put(conversationId, conversation);
            messages.put(conversationId, new ArrayList<>());
            
            log.info("Nouvelle conversation créée: {}", conversationId);
            return conversation;
        } catch (Exception e) {
            log.error("Erreur lors de la création de la conversation", e);
            throw new RuntimeException("Impossible de créer la conversation", e);
        }
    }

    /**
     * Envoyer un message
     */
    public ChatMessage sendMessage(String conversationId, String senderId, String content, String messageType) {
        try {
            if (!conversations.containsKey(conversationId)) {
                throw new RuntimeException("Conversation non trouvée");
            }

            String messageId = "msg_" + System.currentTimeMillis();
            
            ChatMessage message = new ChatMessage();
            message.setId(messageId);
            message.setConversationId(conversationId);
            message.setSenderId(senderId);
            message.setSenderType(senderId.startsWith("admin") ? "ADMIN" : "USER");
            message.setMessageType(messageType);
            message.setContent(content);
            message.setCreatedAt(LocalDateTime.now());

            // Ajouter le message à la conversation
            messages.get(conversationId).add(message);
            
            // Mettre à jour la conversation
            ChatConversation conversation = conversations.get(conversationId);
            conversation.setLastMessageAt(LocalDateTime.now());
            conversation.setUpdatedAt(LocalDateTime.now());
            conversations.put(conversationId, conversation);

            log.info("Message envoyé dans la conversation {}: {}", conversationId, messageId);
            return message;
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi du message", e);
            throw new RuntimeException("Impossible d'envoyer le message", e);
        }
    }

    /**
     * Récupérer les conversations d'un utilisateur
     */
    public List<ChatConversation> getUserConversations(String userId) {
        try {
            return conversations.values().stream()
                    .filter(conv -> conv.getUserId().equals(userId))
                    .sorted((a, b) -> b.getUpdatedAt().compareTo(a.getUpdatedAt()))
                    .toList();
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des conversations", e);
            return new ArrayList<>();
        }
    }

    /**
     * Récupérer les messages d'une conversation
     */
    public List<ChatMessage> getConversationMessages(String conversationId) {
        try {
            return messages.getOrDefault(conversationId, new ArrayList<>());
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des messages", e);
            return new ArrayList<>();
        }
    }

    /**
     * Créer un rendez-vous
     */
    public Appointment createAppointment(String userId, String adminId, String type, 
                                       String date, String timeSlot, Integer duration, String notes) {
        try {
            String appointmentId = "apt_" + System.currentTimeMillis();
            
            Appointment appointment = new Appointment();
            appointment.setId(appointmentId);
            appointment.setUserId(userId);
            appointment.setAdminId(adminId);
            appointment.setAppointmentType(type);
            appointment.setRequestedDate(date);
            appointment.setRequestedTimeSlot(timeSlot);
            appointment.setDurationMinutes(duration);
            appointment.setNotes(notes);
            appointment.setStatus("REQUESTED");
            appointment.setCreatedAt(LocalDateTime.now());

            log.info("Rendez-vous créé: {}", appointmentId);
            return appointment;
        } catch (Exception e) {
            log.error("Erreur lors de la création du rendez-vous", e);
            throw new RuntimeException("Impossible de créer le rendez-vous", e);
        }
    }

    /**
     * Récupérer les statistiques
     */
    public ChatStatistics getChatStatistics() {
        try {
            long totalConversations = conversations.size();
            long totalMessages = messages.values().stream().mapToLong(List::size).sum();
            
            return new ChatStatistics(totalConversations, totalMessages);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des statistiques", e);
            return new ChatStatistics(0, 0);
        }
    }

    // Classes internes simplifiées
    public static class ChatConversation {
        private String id;
        private String userId;
        private String subject;
        private String category;
        private String priority;
        private String status;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
        private LocalDateTime lastMessageAt;

        // Getters et Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }
        public String getSubject() { return subject; }
        public void setSubject(String subject) { this.subject = subject; }
        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }
        public String getPriority() { return priority; }
        public void setPriority(String priority) { this.priority = priority; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
        public LocalDateTime getUpdatedAt() { return updatedAt; }
        public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
        public LocalDateTime getLastMessageAt() { return lastMessageAt; }
        public void setLastMessageAt(LocalDateTime lastMessageAt) { this.lastMessageAt = lastMessageAt; }
    }

    public static class ChatMessage {
        private String id;
        private String conversationId;
        private String senderId;
        private String senderType;
        private String messageType;
        private String content;
        private LocalDateTime createdAt;

        // Getters et Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getConversationId() { return conversationId; }
        public void setConversationId(String conversationId) { this.conversationId = conversationId; }
        public String getSenderId() { return senderId; }
        public void setSenderId(String senderId) { this.senderId = senderId; }
        public String getSenderType() { return senderType; }
        public void setSenderType(String senderType) { this.senderType = senderType; }
        public String getMessageType() { return messageType; }
        public void setMessageType(String messageType) { this.messageType = messageType; }
        public String getContent() { return content; }
        public void setContent(String content) { this.content = content; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }

    public static class Appointment {
        private String id;
        private String userId;
        private String adminId;
        private String appointmentType;
        private String requestedDate;
        private String requestedTimeSlot;
        private Integer durationMinutes;
        private String notes;
        private String status;
        private LocalDateTime createdAt;

        // Getters et Setters
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        public String getUserId() { return userId; }
        public void setUserId(String userId) { this.userId = userId; }
        public String getAdminId() { return adminId; }
        public void setAdminId(String adminId) { this.adminId = adminId; }
        public String getAppointmentType() { return appointmentType; }
        public void setAppointmentType(String appointmentType) { this.appointmentType = appointmentType; }
        public String getRequestedDate() { return requestedDate; }
        public void setRequestedDate(String requestedDate) { this.requestedDate = requestedDate; }
        public String getRequestedTimeSlot() { return requestedTimeSlot; }
        public void setRequestedTimeSlot(String requestedTimeSlot) { this.requestedTimeSlot = requestedTimeSlot; }
        public Integer getDurationMinutes() { return durationMinutes; }
        public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
        public String getNotes() { return notes; }
        public void setNotes(String notes) { this.notes = notes; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public LocalDateTime getCreatedAt() { return createdAt; }
        public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    }

    public static class ChatStatistics {
        private final long totalConversations;
        private final long totalMessages;

        public ChatStatistics(long totalConversations, long totalMessages) {
            this.totalConversations = totalConversations;
            this.totalMessages = totalMessages;
        }

        public long getTotalConversations() { return totalConversations; }
        public long getTotalMessages() { return totalMessages; }
    }
}
