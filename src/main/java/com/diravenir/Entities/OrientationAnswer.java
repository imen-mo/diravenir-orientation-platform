package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orientation_answers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrientationAnswer {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "orientation_test_id", nullable = false)
    private OrientationTest orientationTest;
    
    @Column(name = "question_number", nullable = false)
    private Integer questionNumber;
    
    @Column(name = "question_text", columnDefinition = "TEXT")
    private String questionText;
    
    @Column(name = "answer_value", nullable = false)
    private String answerValue;
    
    @Column(name = "answer_text", columnDefinition = "TEXT")
    private String answerText;
    
    @Column(name = "answered_at")
    private java.time.LocalDateTime answeredAt;
}