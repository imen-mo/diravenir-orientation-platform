package com.diravenir.service;

import com.diravenir.Entities.ChatMessage;
import com.diravenir.dto.ChatMessageDTO;
import com.diravenir.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ChatService {
    
    private final ChatMessageRepository chatMessageRepository;
    
    /**
     * Envoyer un message
     */
    public ChatMessageDTO sendMessage(ChatMessageDTO messageDTO) {
        try {
            // Générer un ID de conversation si non fourni
            if (messageDTO.getConversationId() == null) {
                messageDTO.setConversationId(generateConversationId(messageDTO.getSenderId(), messageDTO.getReceiverId()));
            }
            
            ChatMessage message = messageDTO.toEntity();
            message.setSentAt(LocalDateTime.now());
            message.setIsRead(false);
            
            ChatMessage savedMessage = chatMessageRepository.save(message);
            log.info("Message envoyé: {} -> {}", messageDTO.getSenderId(), messageDTO.getReceiverId());
            
            return ChatMessageDTO.fromEntity(savedMessage);
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi du message", e);
            throw new RuntimeException("Erreur lors de l'envoi du message", e);
        }
    }
    
    /**
     * Récupérer les messages d'une conversation
     */
    public List<ChatMessageDTO> getConversationMessages(String conversationId) {
        try {
            List<ChatMessage> messages = chatMessageRepository.findByConversationIdOrderBySentAtAsc(conversationId);
            return messages.stream()
                    .map(ChatMessageDTO::fromEntity)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des messages de la conversation: {}", conversationId, e);
            throw new RuntimeException("Erreur lors de la récupération des messages", e);
        }
    }
    
    /**
     * Récupérer les messages entre deux utilisateurs
     */
    public List<ChatMessageDTO> getMessagesBetweenUsers(String userId1, String userId2) {
        try {
            List<ChatMessage> messages = chatMessageRepository.findMessagesBetweenUsers(userId1, userId2);
            return messages.stream()
                    .map(ChatMessageDTO::fromEntity)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des messages entre utilisateurs: {} et {}", userId1, userId2, e);
            throw new RuntimeException("Erreur lors de la récupération des messages", e);
        }
    }
    
    /**
     * Marquer les messages comme lus
     */
    public void markMessagesAsRead(String receiverId, String conversationId) {
        try {
            chatMessageRepository.markMessagesAsRead(receiverId, conversationId);
            log.info("Messages marqués comme lus pour l'utilisateur: {} dans la conversation: {}", receiverId, conversationId);
        } catch (Exception e) {
            log.error("Erreur lors du marquage des messages comme lus", e);
            throw new RuntimeException("Erreur lors du marquage des messages", e);
        }
    }
    
    /**
     * Récupérer les messages non lus pour un utilisateur
     */
    public List<ChatMessageDTO> getUnreadMessages(String receiverId) {
        try {
            List<ChatMessage> messages = chatMessageRepository.findUnreadMessagesByReceiverId(receiverId);
            return messages.stream()
                    .map(ChatMessageDTO::fromEntity)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des messages non lus pour: {}", receiverId, e);
            throw new RuntimeException("Erreur lors de la récupération des messages non lus", e);
        }
    }
    
    /**
     * Compter les messages non lus pour un utilisateur
     */
    public Long countUnreadMessages(String receiverId) {
        try {
            return chatMessageRepository.countUnreadMessagesByReceiverId(receiverId);
        } catch (Exception e) {
            log.error("Erreur lors du comptage des messages non lus pour: {}", receiverId, e);
            throw new RuntimeException("Erreur lors du comptage des messages non lus", e);
        }
    }
    
    /**
     * Récupérer les dernières conversations d'un utilisateur
     */
    public List<ChatMessageDTO> getLastMessagesByUserId(String userId) {
        try {
            List<ChatMessage> messages = chatMessageRepository.findLastMessagesByUserId(userId);
            return messages.stream()
                    .map(ChatMessageDTO::fromEntity)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des dernières conversations pour: {}", userId, e);
            throw new RuntimeException("Erreur lors de la récupération des conversations", e);
        }
    }
    
    /**
     * Envoyer un message système
     */
    public ChatMessageDTO sendSystemMessage(String receiverId, String message) {
        try {
            ChatMessageDTO systemMessage = ChatMessageDTO.builder()
                    .senderId("SYSTEM")
                    .senderType(ChatMessage.SenderType.SYSTEM)
                    .receiverId(receiverId)
                    .receiverType(ChatMessage.SenderType.STUDENT)
                    .message(message)
                    .messageType(ChatMessage.MessageType.SYSTEM_MESSAGE)
                    .conversationId(generateConversationId("SYSTEM", receiverId))
                    .build();
            
            return sendMessage(systemMessage);
        } catch (Exception e) {
            log.error("Erreur lors de l'envoi du message système", e);
            throw new RuntimeException("Erreur lors de l'envoi du message système", e);
        }
    }
    
    /**
     * Supprimer un message
     */
    public void deleteMessage(Long messageId) {
        try {
            chatMessageRepository.deleteById(messageId);
            log.info("Message supprimé: {}", messageId);
        } catch (Exception e) {
            log.error("Erreur lors de la suppression du message: {}", messageId, e);
            throw new RuntimeException("Erreur lors de la suppression du message", e);
        }
    }
    
    /**
     * Générer un ID de conversation unique
     */
    private String generateConversationId(String userId1, String userId2) {
        // Trier les IDs pour assurer la cohérence
        String[] ids = {userId1, userId2};
        java.util.Arrays.sort(ids);
        return UUID.randomUUID().toString() + "_" + ids[0] + "_" + ids[1];
    }
    
    /**
     * Récupérer les statistiques de chat
     */
    public ChatStatistics getChatStatistics() {
        try {
            long totalMessages = chatMessageRepository.count();
            long unreadMessages = chatMessageRepository.countUnreadMessagesByReceiverId("ALL");
            
            return ChatStatistics.builder()
                    .totalMessages(totalMessages)
                    .unreadMessages(unreadMessages)
                    .build();
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des statistiques de chat", e);
            throw new RuntimeException("Erreur lors de la récupération des statistiques", e);
        }
    }
    
    @lombok.Data
    @lombok.Builder
    public static class ChatStatistics {
        private Long totalMessages;
        private Long unreadMessages;
    }
}
