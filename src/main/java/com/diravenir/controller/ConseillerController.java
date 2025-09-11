package com.diravenir.controller;

import com.diravenir.service.ConseillerService;
import com.diravenir.dto.ConseillerDTO;
import org.springframework.http.ResponseEntity;

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

    @GetMapping("/{id}")
    public ConseillerDTO getConseillerById(@PathVariable Long id) {
        return conseillerService.getById(id);
    }

    @PostMapping
    public ConseillerDTO createConseiller(@RequestBody ConseillerDTO conseillerDTO) {
        return conseillerService.create(conseillerDTO);
    }

    @PutMapping("/{id}")
    public ConseillerDTO updateConseiller(@PathVariable Long id, @RequestBody ConseillerDTO conseillerDTO) {
        return conseillerService.update(id, conseillerDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id) {
        conseillerService.deleteById(id);
        return ResponseEntity.ok().body("Conseiller supprimé avec succès");
    }

}
