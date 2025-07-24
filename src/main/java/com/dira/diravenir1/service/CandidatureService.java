package com.dira.diravenir1.service;

import com.dira.diravenir1.Entities.Candidature;

import java.util.List;

public interface CandidatureService {

    Candidature saveCandidature(Candidature candidature);

    List<Candidature> getAllCandidatures();

    Candidature getCandidatureById(int id);

    void deleteCandidature(int id);

    Candidature updateCandidature(int id, Candidature candidature);
}
