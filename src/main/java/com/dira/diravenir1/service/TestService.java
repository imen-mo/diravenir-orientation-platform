package com.dira.diravenir1.Service;

import com.dira.diravenir1.dto.TestDTO;

import java.util.List;

public interface TestService {
    TestDTO createTest(TestDTO dto);
    List<TestDTO> getAllTests();
}
