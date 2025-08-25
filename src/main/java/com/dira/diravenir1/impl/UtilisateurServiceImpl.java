package com.dira.diravenir1.impl;

import com.dira.diravenir1.dto.UtilisateurDTO;
import com.dira.diravenir1.Entities.Utilisateur;
import com.dira.diravenir1.Repository.UtilisateurRepository;
import com.dira.diravenir1.service.UtilisateurService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UtilisateurServiceImpl implements UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public List<UtilisateurDTO> getAll() {
        return utilisateurRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UtilisateurDTO create(UtilisateurDTO dto) {
        Utilisateur utilisateur = convertToEntity(dto);
        Utilisateur saved = utilisateurRepository.save(utilisateur);
        return convertToDTO(saved);
    }

    @Override
    public UtilisateurDTO getById(Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        return convertToDTO(utilisateur);
    }

    @Override
    public UtilisateurDTO update(Long id, UtilisateurDTO dto) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        
        // Mettre à jour les champs
        utilisateur.setNom(dto.getNom());
        utilisateur.setPrenom(dto.getPrenom());
        utilisateur.setEmail(dto.getEmail());
        utilisateur.setLanguePreferee(dto.getLanguePreferee());
        utilisateur.setPhotoProfil(dto.getPhotoProfil());
        utilisateur.setRole(dto.getRole());
        
        Utilisateur saved = utilisateurRepository.save(utilisateur);
        return convertToDTO(saved);
    }

    @Override
    public void delete(Long id) {
        if (!utilisateurRepository.existsById(id)) {
            throw new RuntimeException("Utilisateur non trouvé");
        }
        utilisateurRepository.deleteById(id);
    }

    @Override
    public boolean existsByEmail(String email) {
        return utilisateurRepository.findByEmail(email).isPresent();
    }

    @Override
    public UtilisateurDTO findByEmail(String email) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElse(null);
        return utilisateur != null ? convertToDTO(utilisateur) : null;
    }

    // Méthodes utilitaires
    private UtilisateurDTO convertToDTO(Utilisateur utilisateur) {
        UtilisateurDTO dto = new UtilisateurDTO();
        dto.setId(utilisateur.getId());
        dto.setNom(utilisateur.getNom());
        dto.setPrenom(utilisateur.getPrenom());
        dto.setEmail(utilisateur.getEmail());
        dto.setLanguePreferee(utilisateur.getLanguePreferee());
        dto.setPhotoProfil(utilisateur.getPhotoProfil());
        dto.setDateCreation(utilisateur.getDateCreation());
        dto.setDerniereConnexion(utilisateur.getDerniereConnexion());
        dto.setCompteActif(utilisateur.isCompteActif());
        dto.setRole(utilisateur.getRole());
        return dto;
    }

    private Utilisateur convertToEntity(UtilisateurDTO dto) {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(dto.getId());
        utilisateur.setNom(dto.getNom());
        utilisateur.setPrenom(dto.getPrenom());
        utilisateur.setEmail(dto.getEmail());
        utilisateur.setLanguePreferee(dto.getLanguePreferee());
        utilisateur.setPhotoProfil(dto.getPhotoProfil());
        utilisateur.setDateCreation(dto.getDateCreation());
        utilisateur.setDerniereConnexion(dto.getDerniereConnexion());
        utilisateur.setCompteActif(dto.isCompteActif());
        utilisateur.setRole(dto.getRole());
        return utilisateur;
    }
}

