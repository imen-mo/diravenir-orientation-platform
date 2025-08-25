package com.dira.diravenir1.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrientationResponseDTO {
    
    private UserProfileDTO userProfile;
    private List<MajorRecommendationDTO> top3Recommendations;
    private List<MajorRecommendationDTO> allRecommendations;
    private String summary;
}
