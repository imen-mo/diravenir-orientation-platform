package com.diravenir.service.impl;

import com.diravenir.dto.DocumentDTO;
import com.diravenir.Entities.Document;
import com.diravenir.repository.DocumentRepository;
import com.diravenir.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DocumentServiceImpl implements DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    @Override
    public DocumentDTO save(DocumentDTO documentDTO) {
        Document document = convertToEntity(documentDTO);
        Document savedDocument = documentRepository.save(document);
        return convertToDTO(savedDocument);
    }

    @Override
    public List<DocumentDTO> getAll() {
        return documentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DocumentDTO getById(Long id) {
        Optional<Document> document = documentRepository.findById(id);
        return document.map(this::convertToDTO).orElse(null);
    }

    @Override
    public void delete(Long id) {
        documentRepository.deleteById(id);
    }

    @Override
    public DocumentDTO update(Long id, DocumentDTO dto) {
        Optional<Document> existingDocument = documentRepository.findById(id);
        if (existingDocument.isPresent()) {
            Document document = convertToEntity(dto);
            document.setId(id);
            Document updatedDocument = documentRepository.save(document);
            return convertToDTO(updatedDocument);
        }
        return null;
    }

    private DocumentDTO convertToDTO(Document document) {
        DocumentDTO dto = new DocumentDTO();
        dto.setId(document.getId());
        dto.setNom(document.getNom());
        dto.setType(document.getType());
        dto.setUrl(document.getChemin()); // Utiliser setUrl au lieu de setChemin
        if (document.getEtudiant() != null) {
            dto.setEtudiantId(document.getEtudiant().getId());
        }
        if (document.getCandidature() != null) {
            dto.setCandidatureId(document.getCandidature().getId());
        }
        return dto;
    }

    private Document convertToEntity(DocumentDTO dto) {
        Document document = new Document();
        document.setId(dto.getId());
        document.setNom(dto.getNom());
        document.setType(dto.getType());
        document.setChemin(dto.getUrl()); // Utiliser getUrl au lieu de getChemin
        // Note: Les relations avec Etudiant et Candidature devraient être gérées séparément
        return document;
    }
}
