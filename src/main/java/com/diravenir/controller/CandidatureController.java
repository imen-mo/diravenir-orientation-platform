package com.diravenir.controller;

import com.diravenir.Entities.Candidature;
import com.diravenir.service.CandidatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidatures")
@CrossOrigin(origins = "*")
public class CandidatureController {

    @Autowired
    private CandidatureService candidatureService;

    @PostMapping
    public ResponseEntity<Candidature> createCandidature(@RequestBody Candidature candidature) {
        try {
            Candidature created = candidatureService.saveCandidature(candidature);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Candidature>> getAllCandidatures() {
        try {
            List<Candidature> candidatures = candidatureService.getAllCandidatures();
            return ResponseEntity.ok(candidatures);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Candidature> getCandidatureById(@PathVariable Long id) {
        try {
            Candidature candidature = candidatureService.getCandidatureById(id.intValue());
            return ResponseEntity.ok(candidature);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Candidature> updateCandidature(@PathVariable Long id, @RequestBody Candidature candidature) {
        try {
            Candidature updated = candidatureService.updateCandidature(id.intValue(), candidature);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidature(@PathVariable Long id) {
        try {
            candidatureService.deleteCandidature(id.intValue());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
