package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "orientation_notifications")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrientationNotification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "test_uuid", nullable = false)
    private String testUuid;
    
    @Column(name = "student_email", nullable = false)
    private String studentEmail;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "notification_type", nullable = false)
    private NotificationType notificationType;
    
    @Column(name = "sent_at")
    private LocalDateTime sentAt;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private NotificationStatus status;
    
    @Column(name = "error_message", columnDefinition = "TEXT")
    private String errorMessage;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    public enum NotificationType {
        RESULTS_READY,
        REMINDER,
        WELCOME
    }
    
    public enum NotificationStatus {
        PENDING,
        SENT,
        FAILED
    }
}
