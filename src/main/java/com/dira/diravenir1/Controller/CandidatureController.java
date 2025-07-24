package com.dira.diravenir1.Controller;

import com.dira.diravenir1.Entities.Candidature;
import com.dira.diravenir1.service.CandidatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidatures")
public class CandidatureController {

    @Autowired
    private CandidatureService candidatureService;

    @PostMapping
    public Candidature createCandidature(@RequestBody Candidature candidature) {
        return candidatureService.saveCandidature(candidature);
    }

    @GetMapping
    public List<Candidature> getAllCandidatures() {
        return candidatureService.getAllCandidatures();
    }

    @GetMapping("/{id}")
    public Candidature getCandidatureById(@PathVariable int id) {
        return candidatureService.getCandidatureById(id);
    }

    @PutMapping("/{id}")
    public Candidature updateCandidature(@PathVariable int id, @RequestBody Candidature candidature) {
        return candidatureService.updateCandidature(id, candidature);
    }

    @DeleteMapping("/{id}")
    public void deleteCandidature(@PathVariable int id) {
        candidatureService.deleteCandidature(id);
    }
}
