package com.dira.diravenir1.service;

import com.dira.diravenir1.Entities.Filiere;
import com.dira.diravenir1.Repository.FiliereRepository;
import com.dira.diravenir1.dto.FiliereDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FiliereService {

    private final FiliereRepository filiereRepository;

    @Transactional
    public FiliereDTO createFiliere(FiliereDTO dto) {
        try {
            Filiere filiere = Filiere.builder()
                .nom(dto.getNom())
                .description(dto.getDescription())
                .domaine(dto.getDomaine())
                .niveau(dto.getNiveau())
                .duree(dto.getDuree())
                .prerequis(dto.getPrerequis())
                .debouches(dto.getDebouches())
                .active(dto.getActive())
                .imageUrl(dto.getImageUrl())
                .cout(dto.getCout())
                .langue(dto.getLangue())
                .build();

            Filiere savedFiliere = filiereRepository.save(filiere);
            return convertToDTO(savedFiliere);
            
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la création de la filière: " + e.getMessage(), e);
        }
    }

    @Transactional
    public FiliereDTO updateFiliere(Long id, FiliereDTO dto) {
        try {
            Optional<Filiere> existingFiliere = filiereRepository.findById(id);
            if (existingFiliere.isEmpty()) {
                throw new RuntimeException("Filière non trouvée avec l'ID: " + id);
            }

            Filiere filiere = existingFiliere.get();
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
            
        } catch (Exception e) {
            throw new RuntimeException("Erreur lors de la mise à jour de la filière: " + e.getMessage(), e);
        }
    }

    public FiliereDTO getFiliereById(Long id) {
        Optional<Filiere> filiere = filiereRepository.findById(id);
        if (filiere.isPresent()) {
            return convertToDTO(filiere.get());
        }
        throw new RuntimeException("Filière non trouvée avec l'ID: " + id);
    }

    public List<FiliereDTO> getAllFilieres() {
        List<Filiere> filieres = filiereRepository.findAll();
        return filieres.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public List<FiliereDTO> getFilieresByDomaine(String domaine) {
        List<Filiere> filieres = filiereRepository.findByDomaine(domaine);
        return filieres.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    public List<FiliereDTO> getActiveFilieres() {
        List<Filiere> filieres = filiereRepository.findByActiveTrue();
        return filieres.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Transactional
    public void deleteFiliere(Long id) {
        if (!filiereRepository.existsById(id)) {
            throw new RuntimeException("Filière non trouvée avec l'ID: " + id);
        }
        filiereRepository.deleteById(id);
    }

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