package com.dira.diravenir1.impl;

import com.dira.diravenir1.Entities.Candidature;
import com.dira.diravenir1.Entities.Document;
import com.dira.diravenir1.Entities.Etudiant;
import com.dira.diravenir1.Repository.CandidatureRepository;
import com.dira.diravenir1.Repository.DocumentRepository;
import com.dira.diravenir1.Repository.EtudiantRepository;
import com.dira.diravenir1.dto.DocumentDTO;
import com.dira.diravenir1.service.DocumentService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private CandidatureRepository candidatureRepository;

    @Override
    public DocumentDTO save(DocumentDTO dto) {
        Document document = new Document();
        document.setNom(dto.getNom());
        document.setType(dto.getType());
        document.setChemin(dto.getUrl());

        if (dto.getEtudiantId() != null) {
            Etudiant etudiant = etudiantRepository.findById(dto.getEtudiantId())
                    .orElseThrow(() -> new EntityNotFoundException("Étudiant non trouvé avec l'id : " + dto.getEtudiantId()));
            document.setEtudiant(etudiant);
        }

        if (dto.getCandidatureId() != null) {
            Candidature candidature = candidatureRepository.findById(dto.getCandidatureId())
                    .orElseThrow(() -> new EntityNotFoundException("Candidature non trouvée avec l'id : " + dto.getCandidatureId()));
            document.setCandidature(candidature);
        }

        Document saved = documentRepository.save(document);
        dto.setId(saved.getId());
        return dto;
    }

    @Override
    public List<DocumentDTO> getAll() {
        return documentRepository.findAll().stream().map(doc -> {
            DocumentDTO dto = new DocumentDTO();
            dto.setId(doc.getId());
            dto.setNom(doc.getNom());
            dto.setType(doc.getType());
            dto.setUrl(doc.getChemin());
            dto.setEtudiantId(doc.getEtudiant() != null ? doc.getEtudiant().getId() : null);
            dto.setCandidatureId(doc.getCandidature() != null ? doc.getCandidature().getId() : null);
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public DocumentDTO getById(Long id) {
        Document doc = documentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Document non trouvé avec l'id : " + id));

        DocumentDTO dto = new DocumentDTO();
        dto.setId(doc.getId());
        dto.setNom(doc.getNom());
        dto.setType(doc.getType());
        dto.setUrl(doc.getChemin());
        dto.setEtudiantId(doc.getEtudiant() != null ? doc.getEtudiant().getId() : null);
        dto.setCandidatureId(doc.getCandidature() != null ? doc.getCandidature().getId() : null);
        return dto;
    }

    @Override
    public DocumentDTO update(Long id, DocumentDTO dto) {
        Document existing = documentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Document non trouvé avec l'id : " + id));

        existing.setNom(dto.getNom());
        existing.setType(dto.getType());
        existing.setChemin(dto.getUrl());

        if (dto.getEtudiantId() != null) {
            Etudiant etudiant = etudiantRepository.findById(dto.getEtudiantId())
                    .orElseThrow(() -> new EntityNotFoundException("Étudiant non trouvé avec l'id : " + dto.getEtudiantId()));
            existing.setEtudiant(etudiant);
        } else {
            existing.setEtudiant(null);
        }

        if (dto.getCandidatureId() != null) {
            Candidature candidature = candidatureRepository.findById(dto.getCandidatureId())
                    .orElseThrow(() -> new EntityNotFoundException("Candidature non trouvée avec l'id : " + dto.getCandidatureId()));
            existing.setCandidature(candidature);
        } else {
            existing.setCandidature(null);
        }

        Document updated = documentRepository.save(existing);

        DocumentDTO updatedDTO = new DocumentDTO();
        updatedDTO.setId(updated.getId());
        updatedDTO.setNom(updated.getNom());
        updatedDTO.setType(updated.getType());
        updatedDTO.setUrl(updated.getChemin());
        updatedDTO.setEtudiantId(updated.getEtudiant() != null ? updated.getEtudiant().getId() : null);
        updatedDTO.setCandidatureId(updated.getCandidature() != null ? updated.getCandidature().getId() : null);

        return updatedDTO;
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Document document = documentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Document à supprimer introuvable avec l'id : " + id));



        documentRepository.delete(document);
    }
}
