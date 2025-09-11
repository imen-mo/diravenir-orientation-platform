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
public class OrientationTestDto {
    
    private String testUuid;
    private Long studentId;
    private LocalDateTime testDate;
    private LocalDateTime completionDate;
    private String status;
    private Integer totalQuestions;
    private Integer answeredQuestions;
    private Map<String, Object> userAnswers;
    private Map<String, Integer> pillarScores;
    private Map<String, Object> topRecommendations;
    private Map<String, Double> matchingScores;
    private Integer testDurationMinutes;
    private String ipAddress;
    private String userAgent;
}
