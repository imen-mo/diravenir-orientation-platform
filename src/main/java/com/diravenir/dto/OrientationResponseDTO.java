package com.diravenir.dto;

import com.diravenir.dto.OrientationResultDTO;
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
    
    private boolean success;
    private String message;
    private String testUuid;
    private OrientationResultDTO results;
    private List<OrientationResultDTO> resultsList;
    private List<MajorRecommendationDto> recommendations;
    private String error;
}
