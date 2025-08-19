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
        dto.setMotDePasse(null); // Ne pas exposer le mot de passe
        dto.setRole(utilisateur.getRole());
        dto.setLanguePreferee(utilisateur.getLanguePreferee());
        
        // ======================
        // === NOUVEAUX CHAMPS ===
        // ======================
        dto.setPhotoProfil(utilisateur.getPhotoProfil());
        dto.setGoogleId(utilisateur.getGoogleId());
        dto.setProvider(utilisateur.getProvider());
        dto.setProviderId(utilisateur.getProviderId());
        dto.setDateCreation(utilisateur.getDateCreation());
        dto.setDerniereConnexion(utilisateur.getDerniereConnexion());
        dto.setCompteActif(utilisateur.isCompteActif());
        dto.setEmailVerifie(utilisateur.isEmailVerifie());
        
        // ======================
        // === STATUT ONLINE/OFFLINE ===
        // ======================
        dto.setStatutOnline(utilisateur.isStatutOnline());
        dto.setDerniereActivite(utilisateur.getDerniereActivite());
        dto.setSessionActive(utilisateur.isSessionActive());
        
        return dto;
    }
    
    public Utilisateur toEntity(UtilisateurDTO dto) {
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setId(dto.getId());
        utilisateur.setNom(dto.getNom());
        utilisateur.setPrenom(dto.getPrenom());
        utilisateur.setEmail(dto.getEmail());
        // Le mot de passe sera géré séparément avec encodage
        utilisateur.setRole(dto.getRole());
        utilisateur.setLanguePreferee(dto.getLanguePreferee());
        
        // ======================
        // === NOUVEAUX CHAMPS ===
        // ======================
        utilisateur.setPhotoProfil(dto.getPhotoProfil());
        utilisateur.setGoogleId(dto.getGoogleId());
        utilisateur.setProvider(dto.getProvider());
        utilisateur.setProviderId(dto.getProviderId());
        utilisateur.setDateCreation(dto.getDateCreation());
        utilisateur.setDerniereConnexion(dto.getDerniereConnexion());
        utilisateur.setCompteActif(dto.isCompteActif());
        utilisateur.setEmailVerifie(dto.isEmailVerifie());
        
        // ======================
        // === STATUT ONLINE/OFFLINE ===
        // ======================
        utilisateur.setStatutOnline(dto.isStatutOnline());
        utilisateur.setDerniereActivite(dto.getDerniereActivite());
        utilisateur.setSessionActive(dto.isSessionActive());
        
        return utilisateur;
    }
} 