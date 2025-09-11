package com.diravenir.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrientationProgressDto {
    
    private String testUuid;
    private Integer totalQuestions;
    private Integer answeredQuestions;
    private Integer currentQuestion;
    private String status; // IN_PROGRESS, COMPLETED, ABANDONED
    private LocalDateTime testDate;
    private LocalDateTime lastAnsweredAt;
    private Integer testDurationMinutes;
    private Map<String, Object> currentAnswers; // All answers so far
    private List<OrientationAnswerDto> answers;
    private Double progressPercentage;
}
