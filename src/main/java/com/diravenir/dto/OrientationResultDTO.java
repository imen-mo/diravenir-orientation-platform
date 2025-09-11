package com.diravenir.dto;

import com.diravenir.Entities.OrientationTest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrientationResultDTO {
    
    private Long id;
    private String userProfile;
    private Double topRecommendationScore;
    private String topRecommendationMajor;
    private String calculationMethod;
    private LocalDateTime calculatedAt;
    private OrientationTest orientationTest;
    private List<OrientationRecommendationDTO> recommendations;
}