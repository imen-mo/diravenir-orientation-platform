package com.dira.diravenir1.mapper;

import com.dira.diravenir1.dto.TestDTO;
import com.dira.diravenir1.Entities.Test;
import org.springframework.stereotype.Component;

@Component
public class TestMapper {
    public TestDTO toDTO(Test test) {
        TestDTO dto = new TestDTO();
        dto.setId(test.getId());
        dto.setType(test.getType());
        dto.setDatePassage(test.getDatePassage());
        dto.setResultat(test.getResultat());
        return dto;
    }
    public Test toEntity(TestDTO dto) {
        Test test = new Test();
        test.setId(dto.getId());
        test.setType(dto.getType());
        test.setDatePassage(dto.getDatePassage());
        test.setResultat(dto.getResultat());
        return test;
    }
} 