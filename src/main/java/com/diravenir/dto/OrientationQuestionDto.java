package com.diravenir.dto;

import com.diravenir.Entities.OrientationQuestion;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrientationQuestionDto {
    
    private Long id;
    private Integer questionNumber;
    private String category;
    private String questionText;
    private OrientationQuestion.QuestionType questionType;
    private String options;
    private Boolean isRequired;
    private Boolean isActive;
    private Integer orderIndex;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public static OrientationQuestionDto fromEntity(OrientationQuestion entity) {
        OrientationQuestionDto dto = new OrientationQuestionDto();
        dto.setId(entity.getId());
        dto.setQuestionNumber(entity.getQuestionNumber());
        dto.setCategory(entity.getCategory());
        dto.setQuestionText(entity.getQuestionText());
        dto.setQuestionType(entity.getQuestionType());
        dto.setOptions(entity.getOptions());
        dto.setIsRequired(entity.getIsRequired());
        dto.setIsActive(entity.getIsActive());
        dto.setOrderIndex(entity.getOrderIndex());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUpdatedAt(entity.getUpdatedAt());
        return dto;
    }
}
