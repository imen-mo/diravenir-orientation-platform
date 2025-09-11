package com.diravenir.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MajorRecommendationDto {
    private String majorCode;
    private String majorName;
    private Double matchingScore;
    private String matchingPercentage;
    private String category;
    private String description;
    private String reasoning;
    private String whyThisMajor;
    private Map<String, Double> pillarScores;
}
