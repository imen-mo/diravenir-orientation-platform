package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.List;

@Entity
@Table(name = "orientation_questions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrientationQuestion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "question_number", nullable = false)
    private Integer questionNumber;
    
    @Column(name = "category", nullable = false)
    private String category;
    
    @Column(name = "question_text", nullable = false, length = 1000)
    private String questionText;
    
    @Column(name = "question_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private QuestionType questionType;
    
    @Column(name = "options", columnDefinition = "JSON")
    private String options;
    
    @Column(name = "is_required", nullable = false)
    private Boolean isRequired;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;
    
    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;
    
    @Column(name = "created_at", nullable = false)
    private java.time.LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private java.time.LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = java.time.LocalDateTime.now();
        if (isActive == null) {
            isActive = true;
        }
        if (isRequired == null) {
            isRequired = true;
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = java.time.LocalDateTime.now();
    }
    
    public enum QuestionType {
        SINGLE_CHOICE
    }
}
