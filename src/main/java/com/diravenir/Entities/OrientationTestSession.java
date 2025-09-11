package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "orientation_test_sessions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrientationTestSession {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "test_uuid", nullable = false, unique = true)
    private String testUuid;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_info_id")
    private StudentInformation studentInfo;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private TestStatus status;
    
    @Column(name = "started_at")
    private LocalDateTime startedAt;
    
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
    
    @Column(name = "total_questions")
    private Integer totalQuestions;
    
    @Column(name = "completed_questions")
    private Integer completedQuestions;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum TestStatus {
        IN_PROGRESS,
        COMPLETED,
        ABANDONED
    }
}
