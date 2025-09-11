package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "chat_sessions", indexes = {
    @Index(name = "idx_user_session", columnList = "user_id, session_id"),
    @Index(name = "idx_conversation_session", columnList = "conversation_id"),
    @Index(name = "idx_last_activity", columnList = "last_activity DESC"),
    @Index(name = "idx_is_active", columnList = "is_active")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatSession {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "session_uuid", unique = true, nullable = false)
    private String sessionUuid;
    
    @Column(name = "user_id", nullable = false)
    private String userId;
    
    @Column(name = "user_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private ChatMessage.SenderType userType;
    
    @Column(name = "conversation_id", nullable = false)
    private String conversationId;
    
    @Column(name = "session_id", nullable = false)
    private String sessionId;
    
    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Boolean isActive = true;
    
    @Column(name = "is_online", nullable = false)
    @Builder.Default
    private Boolean isOnline = false;
    
    @Column(name = "last_activity", nullable = false)
    private LocalDateTime lastActivity;
    
    @Column(name = "connected_at")
    private LocalDateTime connectedAt;
    
    @Column(name = "disconnected_at")
    private LocalDateTime disconnectedAt;
    
    @Column(name = "device_info", columnDefinition = "JSON")
    private String deviceInfo;
    
    @Column(name = "ip_address")
    private String ipAddress;
    
    @Column(name = "user_agent")
    private String userAgent;
    
    @Column(name = "last_read_message_id")
    private Long lastReadMessageId;
    
    @Column(name = "typing_status", columnDefinition = "JSON")
    private String typingStatus;
    
    @Column(name = "preferences", columnDefinition = "JSON")
    private String preferences;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        if (sessionUuid == null) {
            sessionUuid = UUID.randomUUID().toString();
        }
        if (lastActivity == null) {
            lastActivity = LocalDateTime.now();
        }
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (updatedAt == null) {
            updatedAt = LocalDateTime.now();
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public void markAsOnline() {
        this.isOnline = true;
        this.isActive = true;
        this.lastActivity = LocalDateTime.now();
        if (this.connectedAt == null) {
            this.connectedAt = LocalDateTime.now();
        }
    }
    
    public void markAsOffline() {
        this.isOnline = false;
        this.isActive = false;
        this.lastActivity = LocalDateTime.now();
        this.disconnectedAt = LocalDateTime.now();
    }
    
    public void updateActivity() {
        this.lastActivity = LocalDateTime.now();
    }
    
    public boolean isSessionExpired(int timeoutMinutes) {
        return lastActivity.isBefore(LocalDateTime.now().minusMinutes(timeoutMinutes));
    }
}
