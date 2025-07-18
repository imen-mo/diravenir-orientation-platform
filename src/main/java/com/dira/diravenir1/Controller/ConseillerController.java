package com.dira.diravenir1.Controller;

import com.dira.diravenir1.service.ConseillerService;
import com.dira.diravenir1.dto.ConseillerDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conseillers")
@CrossOrigin(origins = "http://localhost:4200")
public class ConseillerController {

    @Autowired
    private ConseillerService conseillerService;

    @GetMapping
    public List<ConseillerDTO> getAllConseillers() {
        return conseillerService.getAll();
    }

    @PostMapping
    public ConseillerDTO createConseiller(@RequestBody ConseillerDTO conseillerDTO) {
        return conseillerService.create(conseillerDTO);
    }
}
