package com.diravenir.mapper;

import com.diravenir.Entities.OrientationQuestion;
import com.diravenir.dto.OrientationQuestionDto;
import org.springframework.stereotype.Component;

@Component
public class OrientationQuestionMapper {
    
    public OrientationQuestionDto toDTO(OrientationQuestion question) {
        if (question == null) {
            return null;
        }
        
        OrientationQuestionDto dto = new OrientationQuestionDto();
        dto.setId(question.getId());
        dto.setQuestionNumber(question.getQuestionNumber());
        dto.setCategory(question.getCategory());
        dto.setQuestionText(question.getQuestionText());
        dto.setQuestionType(question.getQuestionType());
        dto.setOptions(question.getOptions());
        dto.setIsRequired(question.getIsRequired());
        dto.setIsActive(question.getIsActive());
        dto.setOrderIndex(question.getOrderIndex());
        dto.setCreatedAt(question.getCreatedAt());
        dto.setUpdatedAt(question.getUpdatedAt());
        
        return dto;
    }
    
    public OrientationQuestion toEntity(OrientationQuestionDto dto) {
        if (dto == null) {
            return null;
        }
        
        OrientationQuestion question = new OrientationQuestion();
        question.setId(dto.getId());
        question.setQuestionNumber(dto.getQuestionNumber());
        question.setCategory(dto.getCategory());
        question.setQuestionText(dto.getQuestionText());
        question.setQuestionType(dto.getQuestionType());
        question.setOptions(dto.getOptions());
        question.setIsRequired(dto.getIsRequired());
        question.setIsActive(dto.getIsActive());
        question.setOrderIndex(dto.getOrderIndex());
        question.setCreatedAt(dto.getCreatedAt());
        question.setUpdatedAt(dto.getUpdatedAt());
        
        return question;
    }
}
