package com.diravenir.service.impl;

import com.diravenir.Entities.Candidature;
import com.diravenir.repository.CandidatureRepository;
import com.diravenir.service.CandidatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CandidatureServiceImpl implements CandidatureService {

    @Autowired
    private CandidatureRepository candidatureRepository;

    @Override
    public Candidature saveCandidature(Candidature candidature) {
        return candidatureRepository.save(candidature);
    }

    @Override
    public List<Candidature> getAllCandidatures() {
        return candidatureRepository.findAll();
    }

    @Override
    public Candidature getCandidatureById(int id) {
        Optional<Candidature> candidature = candidatureRepository.findById((long) id);
        return candidature.orElse(null);
    }

    @Override
    public void deleteCandidature(int id) {
        candidatureRepository.deleteById((long) id);
    }

    @Override
    public Candidature updateCandidature(int id, Candidature candidature) {
        Optional<Candidature> existingCandidature = candidatureRepository.findById((long) id);
        if (existingCandidature.isPresent()) {
            candidature.setId((long) id);
            return candidatureRepository.save(candidature);
        }
        return null;
    }
}
