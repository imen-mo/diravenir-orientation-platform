package com.diravenir.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrientationAnswerDto {
    
    private Long id;
    private String testUuid;
    private Integer questionNumber;
    private String questionText;
    private String selectedAnswer;
    private Map<String, Object> answerData; // For complex answers like sliders
    private LocalDateTime answeredAt;
    private Integer timeSpentSeconds;
    private LocalDateTime createdAt;
}
