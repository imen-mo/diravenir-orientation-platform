package com.diravenir.service;

import com.diravenir.dto.AdministrateurDTO;
import com.diravenir.Entities.Administrateur;
import com.diravenir.repository.AdministrateurRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdministrateurService {

    private final AdministrateurRepository administrateurRepository;

    public List<AdministrateurDTO> getAllAdministrateurs() {
        return administrateurRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AdministrateurDTO createAdministrateur(AdministrateurDTO dto) {
        Administrateur administrateur = convertToEntity(dto);
        administrateur = administrateurRepository.save(administrateur);
        return convertToDTO(administrateur);
    }

    public AdministrateurDTO updateAdministrateur(AdministrateurDTO dto) {
        Administrateur administrateur = administrateurRepository.findById(dto.getId())
                .orElseThrow(() -> new RuntimeException("Administrateur not found"));
        
        // Update fields
        administrateur.setNom(dto.getNom());
        administrateur.setPrenom(dto.getPrenom());
        administrateur.setEmail(dto.getEmail());
        administrateur.setPassword(dto.getPassword());
        administrateur.setRole(dto.getRole());
        administrateur.setTelephone(dto.getTelephone());
        administrateur.setLanguePreferee(dto.getLanguePreferee());
        administrateur.setPhotoProfil(dto.getPhotoProfil());
        administrateur.setCompteActif(dto.isCompteActif());
        administrateur.setFonctions(dto.getFonctions());
        administrateur.setGereCompte(dto.getGereCompte());
        administrateur.setGereEtudiants(dto.getGereEtudiants());
        
        administrateur = administrateurRepository.save(administrateur);
        return convertToDTO(administrateur);
    }

    public void deleteAdministrateur(Long id) {
        administrateurRepository.deleteById(id);
    }

    private AdministrateurDTO convertToDTO(Administrateur administrateur) {
        return AdministrateurDTO.builder()
                .id(administrateur.getId())
                .nom(administrateur.getNom())
                .prenom(administrateur.getPrenom())
                .email(administrateur.getEmail())
                .password(administrateur.getPassword())
                .role(administrateur.getRole())
                .telephone(administrateur.getTelephone())
                .languePreferee(administrateur.getLanguePreferee())
                .photoProfil(administrateur.getPhotoProfil())
                .dateCreation(administrateur.getDateCreation())
                .derniereConnexion(administrateur.getDerniereConnexion())
                .compteActif(administrateur.isCompteActif())
                .fonctions(administrateur.getFonctions())
                .gereCompte(administrateur.getGereCompte())
                .gereEtudiants(administrateur.getGereEtudiants())
                .build();
    }

    private Administrateur convertToEntity(AdministrateurDTO dto) {
        Administrateur administrateur = new Administrateur();
        administrateur.setNom(dto.getNom());
        administrateur.setPrenom(dto.getPrenom());
        administrateur.setEmail(dto.getEmail());
        administrateur.setPassword(dto.getPassword());
        administrateur.setRole(dto.getRole());
        administrateur.setTelephone(dto.getTelephone());
        administrateur.setLanguePreferee(dto.getLanguePreferee());
        administrateur.setPhotoProfil(dto.getPhotoProfil());
        administrateur.setCompteActif(dto.isCompteActif());
        administrateur.setFonctions(dto.getFonctions());
        administrateur.setGereCompte(dto.getGereCompte());
        administrateur.setGereEtudiants(dto.getGereEtudiants());
        return administrateur;
    }
}
