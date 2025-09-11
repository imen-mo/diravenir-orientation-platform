package com.diravenir.mapper;

import com.diravenir.dto.UtilisateurDTO;
import com.diravenir.Entities.Utilisateur;
import org.springframework.stereotype.Component;

@Component
public class UtilisateurMapper {

    public UtilisateurDTO toDto(Utilisateur utilisateur) {
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
        
        // Champs OAuth2 - temporairement désactivés
        // dto.setOauth2Provider(utilisateur.getOauth2Provider());
        // dto.setOauth2ProviderId(utilisateur.getOauth2ProviderId());
        // dto.setOauth2Picture(utilisateur.getOauth2Picture());
        
        return dto;
    }

    public UtilisateurDTO toDTO(Utilisateur utilisateur) {
        return toDto(utilisateur);
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
        
        // Champs OAuth2 - temporairement désactivés
        // utilisateur.setOauth2Provider(dto.getOauth2Provider());
        // utilisateur.setOauth2ProviderId(dto.getOauth2ProviderId());
        // utilisateur.setOauth2Picture(dto.getOauth2Picture());
        
        return utilisateur;
    }
} 
