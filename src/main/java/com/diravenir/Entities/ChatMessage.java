package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "chat_messages", indexes = {
    @Index(name = "idx_conversation_sent", columnList = "conversation_id, sent_at"),
    @Index(name = "idx_sender_receiver", columnList = "sender_id, receiver_id"),
    @Index(name = "idx_message_type", columnList = "message_type"),
    @Index(name = "idx_is_read", columnList = "is_read"),
    @Index(name = "idx_sent_at", columnList = "sent_at DESC")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "message_uuid", unique = true, nullable = false)
    private String messageUuid;
    
    @Column(name = "sender_id", nullable = false)
    private String senderId;
    
    @Column(name = "sender_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private SenderType senderType;
    
    @Column(name = "receiver_id", nullable = false)
    private String receiverId;
    
    @Column(name = "receiver_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private SenderType receiverType;
    
    @Column(name = "message", columnDefinition = "TEXT", nullable = false)
    private String message;
    
    @Column(name = "message_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private MessageType messageType;
    
    @Column(name = "is_read", nullable = false)
    @Builder.Default
    private Boolean isRead = false;
    
    @Column(name = "is_delivered", nullable = false)
    @Builder.Default
    private Boolean isDelivered = false;
    
    @Column(name = "is_edited", nullable = false)
    @Builder.Default
    private Boolean isEdited = false;
    
    @Column(name = "is_deleted", nullable = false)
    @Builder.Default
    private Boolean isDeleted = false;
    
    @Column(name = "sent_at", nullable = false)
    private LocalDateTime sentAt;
    
    @Column(name = "delivered_at")
    private LocalDateTime deliveredAt;
    
    @Column(name = "read_at")
    private LocalDateTime readAt;
    
    @Column(name = "edited_at")
    private LocalDateTime editedAt;
    
    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
    
    @Column(name = "conversation_id", nullable = false)
    private String conversationId;
    
    @Column(name = "reply_to_message_id")
    private Long replyToMessageId;
    
    @Column(name = "forwarded_from_message_id")
    private Long forwardedFromMessageId;
    
    @Column(name = "file_url")
    private String fileUrl;
    
    @Column(name = "file_name")
    private String fileName;
    
    @Column(name = "file_size")
    private Long fileSize;
    
    @Column(name = "file_type")
    private String fileType;
    
    @Column(name = "thumbnail_url")
    private String thumbnailUrl;
    
    @Column(name = "message_status", nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private MessageStatus messageStatus = MessageStatus.SENT;
    
    @Column(name = "encryption_key")
    private String encryptionKey;
    
    @Column(name = "metadata", columnDefinition = "JSON")
    private String metadata;
    
    @Column(name = "session_id")
    private String sessionId;
    
    @Column(name = "client_message_id")
    private String clientMessageId;
    
    // Propriétés pour la compatibilité avec les requêtes
    @Column(name = "conseiller_id")
    private String conseillerId;
    
    @Column(name = "user_id")
    private String userId;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;
    
    @PrePersist
    protected void onCreate() {
        if (messageUuid == null) {
            messageUuid = UUID.randomUUID().toString();
        }
        if (sentAt == null) {
            sentAt = LocalDateTime.now();
        }
        if (messageStatus == null) {
            messageStatus = MessageStatus.SENT;
        }
        // Synchroniser les valeurs pour la compatibilité
        if (createdAt == null) {
            createdAt = sentAt;
        }
        if (content == null) {
            content = message;
        }
        if (userId == null && senderType == SenderType.STUDENT) {
            userId = senderId;
        }
        if (conseillerId == null && senderType == SenderType.ADMIN) {
            conseillerId = senderId;
        }
    }
    
    public enum SenderType {
        STUDENT,
        ADMIN,
        SYSTEM,
        BOT
    }
    
    public enum MessageType {
        TEXT,
        FILE,
        IMAGE,
        VIDEO,
        AUDIO,
        DOCUMENT,
        LOCATION,
        CONTACT,
        SYSTEM_MESSAGE,
        TYPING_INDICATOR,
        READ_RECEIPT,
        DELIVERY_RECEIPT
    }
    
    public enum MessageStatus {
        SENDING,
        SENT,
        DELIVERED,
        READ,
        FAILED,
        EDITED,
        DELETED
    }
    
    // Méthodes utilitaires
    public void markAsDelivered() {
        this.isDelivered = true;
        this.deliveredAt = LocalDateTime.now();
        this.messageStatus = MessageStatus.DELIVERED;
    }
    
    public void markAsRead() {
        this.isRead = true;
        this.readAt = LocalDateTime.now();
        this.messageStatus = MessageStatus.READ;
    }
    
    public void markAsEdited() {
        this.isEdited = true;
        this.editedAt = LocalDateTime.now();
        this.messageStatus = MessageStatus.EDITED;
    }
    
    public void markAsDeleted() {
        this.isDeleted = true;
        this.deletedAt = LocalDateTime.now();
        this.messageStatus = MessageStatus.DELETED;
    }
    
    public boolean isMediaMessage() {
        return messageType == MessageType.IMAGE || 
               messageType == MessageType.VIDEO || 
               messageType == MessageType.AUDIO || 
               messageType == MessageType.FILE ||
               messageType == MessageType.DOCUMENT;
    }
    
    public boolean isSystemMessage() {
        return messageType == MessageType.SYSTEM_MESSAGE;
    }
} 
