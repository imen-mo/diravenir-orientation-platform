package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "application_status_history")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationStatusHistory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "application_id", nullable = false)
    private Long applicationId;
    
    @Column(name = "old_status")
    private String oldStatus;
    
    @Column(name = "new_status", nullable = false)
    private String newStatus;
    
    @Column(name = "changed_by", nullable = false)
    private String changedBy;
    
    @Column(name = "admin_notes", columnDefinition = "TEXT")
    private String adminNotes;
    
    @CreationTimestamp
    @Column(name = "changed_at", nullable = false, updatable = false)
    private LocalDateTime changedAt;
    
    // ===== RELATIONS =====
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", insertable = false, updatable = false)
    private Application application;
}
