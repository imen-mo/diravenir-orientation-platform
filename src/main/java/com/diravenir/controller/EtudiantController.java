package com.diravenir.controller;

import com.diravenir.dto.EtudiantDTO;
import com.diravenir.service.EtudiantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/etudiants")
@RequiredArgsConstructor
public class EtudiantController {

    private final EtudiantService etudiantService;

    @PostMapping
    public ResponseEntity<EtudiantDTO> create(@RequestBody EtudiantDTO dto) {
        return ResponseEntity.ok(etudiantService.createEtudiant(dto));
    }

    @GetMapping
    public ResponseEntity<List<EtudiantDTO>> getAll() {
        return ResponseEntity.ok(etudiantService.getAllEtudiants());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EtudiantDTO> getById(@PathVariable Long id) {
        return ResponseEntity.ok(etudiantService.getEtudiantById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EtudiantDTO> update(@PathVariable Long id, @RequestBody EtudiantDTO dto) {
        return ResponseEntity.ok(etudiantService.updateEtudiant(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        etudiantService.deleteEtudiant(id);
        return ResponseEntity.ok().build();
    }
}
