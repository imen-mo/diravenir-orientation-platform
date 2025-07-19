package com.dira.diravenir1.Controller;

import com.dira.diravenir1.Service.TestService;
import com.dira.diravenir1.dto.TestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tests")
public class TestController {

    @Autowired
    private TestService service;

    @PostMapping
    public TestDTO create(@RequestBody TestDTO dto) {
        return service.createTest(dto);
    }

    @GetMapping
    public List<TestDTO> list() {
        return service.getAllTests();
    }
}
