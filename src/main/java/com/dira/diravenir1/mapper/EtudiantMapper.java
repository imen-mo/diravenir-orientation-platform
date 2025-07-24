package com.dira.diravenir1.mapper;

import com.dira.diravenir1.dto.EtudiantDTO;
import com.dira.diravenir1.Entities.Etudiant;
import org.springframework.stereotype.Component;

@Component
public class EtudiantMapper {
    public EtudiantDTO toDTO(Etudiant etudiant) {
        EtudiantDTO dto = new EtudiantDTO();
        dto.setId(etudiant.getId());
        dto.setNom(etudiant.getNom());
        dto.setPrenom(etudiant.getPrenom());
        dto.setEmail(etudiant.getEmail());
        dto.setMotDePasse(etudiant.getMotDePasse());
        dto.setNiveauEtude(etudiant.getNiveauEtude());
        dto.setSpecialite(etudiant.getSpecialite());
        dto.setPays(etudiant.getPays());
        dto.setVille(etudiant.getVille());
        dto.setAdresse(etudiant.getAdresse());
        dto.setSituation(etudiant.getSituation());
        dto.setNationalite(etudiant.getNationalite());
        dto.setGenre(etudiant.getGenre());
        dto.setEtablissement(etudiant.getEtablissement());
        dto.setAnneeEtude(etudiant.getAnneeEtude());
        dto.setDomaine(etudiant.getDomaine());
        // Ajoute les autres champs nécessaires
        return dto;
    }
    public Etudiant toEntity(EtudiantDTO dto) {
        Etudiant etudiant = new Etudiant();
        etudiant.setId(dto.getId());
        etudiant.setNom(dto.getNom());
        etudiant.setPrenom(dto.getPrenom());
        etudiant.setEmail(dto.getEmail());
        etudiant.setMotDePasse(dto.getMotDePasse());
        etudiant.setNiveauEtude(dto.getNiveauEtude());
        etudiant.setSpecialite(dto.getSpecialite());
        etudiant.setPays(dto.getPays());
        etudiant.setVille(dto.getVille());
        etudiant.setAdresse(dto.getAdresse());
        etudiant.setSituation(dto.getSituation());
        etudiant.setNationalite(dto.getNationalite());
        etudiant.setGenre(dto.getGenre());
        etudiant.setEtablissement(dto.getEtablissement());
        etudiant.setAnneeEtude(dto.getAnneeEtude());
        etudiant.setDomaine(dto.getDomaine());
        // Ajoute les autres champs nécessaires
        return etudiant;
    }
} 