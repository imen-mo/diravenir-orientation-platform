package com.dira.diravenir1.service;


import com.dira.diravenir1.dto.FiliereDTO;
import com.dira.diravenir1.Entities.Filiere;
import com.dira.diravenir1.Repository.FiliereRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class FiliereService {

    private final FiliereRepository filiereRepository;

    public FiliereDTO createFiliere(FiliereDTO dto) {
        Filiere filiere = Filiere.builder()
                .nom(dto.getNom())
                .description(dto.getDescription())
                .domaine(dto.getDomaine())
                .niveau(dto.getNiveau())
                .duree(dto.getDuree())
                .prerequis(dto.getPrerequis())
                .debouches(dto.getDebouches())
                .active(dto.getActive() != null ? dto.getActive() : true)
                .imageUrl(dto.getImageUrl())
                .cout(dto.getCout())
                .langue(dto.getLangue())
                .build();

        Filiere savedFiliere = filiereRepository.save(filiere);
        return convertToDTO(savedFiliere);
    }

    public List<FiliereDTO> getAllFilieres() {
        return filiereRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<FiliereDTO> getActiveFilieres() {
        return filiereRepository.findByActiveTrue()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public FiliereDTO getFiliereById(Long id) {
        Filiere filiere = filiereRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Filière non trouvée avec l'ID: " + id));
        return convertToDTO(filiere);
    }

    public FiliereDTO updateFiliere(Long id, FiliereDTO dto) {
        Filiere filiere = filiereRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Filière non trouvée avec l'ID: " + id));

        filiere.setNom(dto.getNom());
        filiere.setDescription(dto.getDescription());
        filiere.setDomaine(dto.getDomaine());
        filiere.setNiveau(dto.getNiveau());
        filiere.setDuree(dto.getDuree());
        filiere.setPrerequis(dto.getPrerequis());
        filiere.setDebouches(dto.getDebouches());
        filiere.setActive(dto.getActive());
        filiere.setImageUrl(dto.getImageUrl());
        filiere.setCout(dto.getCout());
        filiere.setLangue(dto.getLangue());

        Filiere updatedFiliere = filiereRepository.save(filiere);
        return convertToDTO(updatedFiliere);
    }

    public void deleteFiliere(Long id) {
        if (!filiereRepository.existsById(id)) {
            throw new RuntimeException("Filière non trouvée avec l'ID: " + id);
        }
        filiereRepository.deleteById(id);
    }

    public List<FiliereDTO> getFilieresByDomaine(String domaine) {
        return filiereRepository.findByDomaineContainingIgnoreCase(domaine)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<FiliereDTO> searchFilieres(String keyword) {
        return filiereRepository.findByNomContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Conversion Entity -> DTO
    private FiliereDTO convertToDTO(Filiere filiere) {
        return FiliereDTO.builder()
                .id(filiere.getId())
                .nom(filiere.getNom())
                .description(filiere.getDescription())
                .domaine(filiere.getDomaine())
                .niveau(filiere.getNiveau())
                .duree(filiere.getDuree())
                .prerequis(filiere.getPrerequis())
                .debouches(filiere.getDebouches())
                .active(filiere.getActive())
                .imageUrl(filiere.getImageUrl())
                .cout(filiere.getCout())
                .langue(filiere.getLangue())
                .build();
    }
}