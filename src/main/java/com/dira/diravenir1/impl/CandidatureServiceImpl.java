package com.dira.diravenir1.impl;

import com.dira.diravenir1.Entities.Candidature;
import com.dira.diravenir1.Entities.Document;       // <-- Import ajouté
import com.dira.diravenir1.Repository.CandidatureRepository;
import com.dira.diravenir1.service.CandidatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;

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
        return candidatureRepository.findById((long) id)
                .orElseThrow(() -> new RuntimeException("Candidature non trouvée avec l'id : " + id));
    }

    @Override
    public void deleteCandidature(int id) {
        Long longId = (long) id;
        if (!candidatureRepository.existsById(longId)) {
            throw new RuntimeException("Impossible de supprimer, aucune candidature avec l'id : " + id);
        }
        candidatureRepository.deleteById(longId);
    }

    @Override
    public Candidature updateCandidature(int id, Candidature newData) {
        Candidature existing = candidatureRepository.findById((long) id)
                .orElseThrow(() -> new RuntimeException("Candidature non trouvée avec l'id : " + id));

        existing.setDateSoumission(newData.getDateSoumission());
        existing.setStatut(newData.getStatut());
        existing.setSuivi(newData.getSuivi());
        existing.setEtudiant(newData.getEtudiant());

        // Dissocier proprement les documents existants
        Iterator<Document> iterator = existing.getDocuments().iterator();
        while (iterator.hasNext()) {
            Document doc = iterator.next();
            doc.setCandidature(null);
            // getCandidatures() doit exister dans Document
            iterator.remove();
        }

        // Associer les nouveaux documents
        if (newData.getDocuments() != null) {
            for (Document doc : newData.getDocuments()) {
                existing.addDocument(doc);
            }
        }

        return candidatureRepository.save(existing);
    }
}
