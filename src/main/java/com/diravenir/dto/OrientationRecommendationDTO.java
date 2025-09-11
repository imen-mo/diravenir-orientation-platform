package com.diravenir.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrientationRecommendationDTO {
    
    private Long id;
    private String majorName;
    private Double matchingScore;
    private Integer rankPosition;
    private String reasoning;
}
