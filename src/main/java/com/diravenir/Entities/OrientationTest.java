package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orientation_tests")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrientationTest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // Informations étudiant
    @Column(name = "student_email", nullable = false, unique = true)
    private String studentEmail;
    
    @Column(name = "student_name", nullable = false)
    private String studentName;
    
    @Column(name = "student_phone")
    private String studentPhone;
    
    // Informations du test
    @Column(name = "test_uuid", unique = true)
    private String testUuid;
    
    @Column(name = "test_started_at")
    private LocalDateTime testStartedAt;
    
    @Column(name = "test_completed_at")
    private LocalDateTime testCompletedAt;
    
    @Column(name = "test_status", nullable = false)
    @Enumerated(EnumType.STRING)
    private TestStatus testStatus;
    
    // Statistiques du test
    @Column(name = "total_questions", nullable = false)
    private Integer totalQuestions;
    
    @Column(name = "answered_questions", nullable = false)
    private Integer answeredQuestions;
    
    @Column(name = "test_duration_minutes")
    private Integer testDurationMinutes;
    
    // Données JSON
    @Column(name = "user_answers", columnDefinition = "JSON")
    private String userAnswers;
    
    @Column(name = "pillar_scores", columnDefinition = "JSON")
    private String pillarScores;
    
    @Column(name = "matching_scores", columnDefinition = "JSON")
    private String matchingScores;
    
    @Column(name = "top_recommendations", columnDefinition = "JSON")
    private String topRecommendations;
    
    // Métadonnées
    @Column(name = "ip_address")
    private String ipAddress;
    
    @Column(name = "user_agent")
    private String userAgent;
    
    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    // Relations
    @OneToMany(mappedBy = "orientationTest", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrientationAnswer> answers;
    
    @OneToOne(mappedBy = "orientationTest", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private OrientationResult result;
    
    // Relations avec Student
    @Column(name = "student_id")
    private Long studentId;
    
    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();
        
        if (createdAt == null) {
            createdAt = now;
        }
        if (testStatus == null) {
            testStatus = TestStatus.IN_PROGRESS;
        }
        if (totalQuestions == null) {
            totalQuestions = 14; // Nombre de questions d'orientation
        }
        if (answeredQuestions == null) {
            answeredQuestions = 0;
        }
        if (testUuid == null) {
            testUuid = java.util.UUID.randomUUID().toString();
        }
        // studentId peut être null pour les tests anonymes
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum TestStatus {
        IN_PROGRESS,
        COMPLETED,
        ABANDONED,
        EXPIRED
    }
}