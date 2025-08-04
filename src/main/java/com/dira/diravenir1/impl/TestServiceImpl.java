package com.dira.diravenir1.impl;

import com.dira.diravenir1.Entities.Test;
import com.dira.diravenir1.Repository.TestRepository;
import com.dira.diravenir1.service.TestService;
import com.dira.diravenir1.dto.TestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TestServiceImpl implements TestService {

    @Autowired
    private TestRepository testRepository;

    @Override
    public TestDTO createTest(TestDTO dto) {
        Test test = new Test();
        test.setType(dto.getType());
        test.setDatePassage(dto.getDatePassage()); // âœ… CORRECTION ICI (anciennement getClass)
        test.setResultat(dto.getResultat());
        Test saved = testRepository.save(test);
        dto.setId(saved.getId());
        return dto;
    }

    @Override
    public List<TestDTO> getAllTests() {
        return testRepository.findAll().stream().map(t -> {
            TestDTO dto = new TestDTO();
            dto.setId(t.getId());
            dto.setType(t.getType());
            dto.setDatePassage(t.getDatePassage());
            dto.setResultat(t.getResultat());
            return dto;
        }).collect(Collectors.toList());
    }
}


