package com.dira.diravenir1.mapper;

import com.dira.diravenir1.dto.UtilisateurDTO;
import com.dira.diravenir1.Entities.Utilisateur;
import org.springframework.stereotype.Component;

@Component
public class UtilisateurMapper {
    public UtilisateurDTO toDTO(Utilisateur utilisateur) {
        UtilisateurDTO dto = new UtilisateurDTO();
        dto.setId(utilisateur.getId());
        dto.setNom(utilisateur.getNom());
        dto.setPrenom(utilisateur.getPrenom());
        dto.setEmail(utilisateur.getEmail());
        dto.setMotDePasse(utilisateur.getMotDePasse());
        dto.setRole(utilisateur.getRole());
        return dto;
    }
    public Utilisateur toEntity(UtilisateurDTO dto) {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(dto.getId());
        utilisateur.setNom(dto.getNom());
        utilisateur.setPrenom(dto.getPrenom());
        utilisateur.setEmail(dto.getEmail());
        utilisateur.setMotDePasse(dto.getMotDePasse());
        utilisateur.setRole(dto.getRole());
        return utilisateur;
    }
} 