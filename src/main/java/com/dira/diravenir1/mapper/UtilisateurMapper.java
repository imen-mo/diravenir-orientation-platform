package com.dira.diravenir1.mapper;

import com.dira.diravenir1.dto.UtilisateurDTO;
import com.dira.diravenir1.Entities.Utilisateur;
import org.springframework.stereotype.Component;

@Component
public class UtilisateurMapper {

    public UtilisateurDTO toDTO(Utilisateur utilisateur) {
        if (utilisateur == null) {
            return null;
        }

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

    public Utilisateur toEntity(UtilisateurDTO dto) {
        if (dto == null) {
            return null;
        }

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