package com.dira.diravenir1.impl;

import com.dira.diravenir1.dto.AdministrateurDTO;
import com.dira.diravenir1.Entities.Administrateur;
import com.dira.diravenir1.Repository.AdministrateurRepository;
import com.dira.diravenir1.service.AdministrateurService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdministrateurServiceImpl implements AdministrateurService {

    private final AdministrateurRepository administrateurRepository;

    @Override
    public AdministrateurDTO createAdministrateur(AdministrateurDTO dto) {
        Administrateur admin = Administrateur.builder()
                .nom(dto.getNom())
                .prenom(dto.getPrenom())
                .email(dto.getEmail())
                .role(dto.getRole())
                .fonctions(dto.getFonctions())
                .gereCompte(dto.getGereCompte())
                .gereEtudiants(dto.getGereEtudiants())
                .build();

        Administrateur saved = administrateurRepository.save(admin);
        dto.setId(saved.getId());
        return dto;
    }

    @Override
    public List<AdministrateurDTO> getAllAdministrateurs() {
        return administrateurRepository.findAll().stream()
                .map(admin -> AdministrateurDTO.builder()
                        .id(admin.getId())
                        .nom(admin.getNom())
                        .prenom(admin.getPrenom())
                        .email(admin.getEmail())
                        .role(admin.getRole())
                        .fonctions(admin.getFonctions())
                        .gereCompte(admin.getGereCompte())
                        .gereEtudiants(admin.getGereEtudiants())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public AdministrateurDTO getAdministrateurById(Long id) {
        return administrateurRepository.findById(id)
                .map(admin -> AdministrateurDTO.builder()
                        .id(admin.getId())
                        .nom(admin.getNom())
                        .prenom(admin.getPrenom())
                        .email(admin.getEmail())
                        .role(admin.getRole())
                        .fonctions(admin.getFonctions())
                        .gereCompte(admin.getGereCompte())
                        .gereEtudiants(admin.getGereEtudiants())
                        .build())
                .orElseThrow(() -> new RuntimeException("Administrateur introuvable"));
    }

    @Override
    public void deleteAdministrateur(Long id) {
        administrateurRepository.deleteById(id);
    }
}
