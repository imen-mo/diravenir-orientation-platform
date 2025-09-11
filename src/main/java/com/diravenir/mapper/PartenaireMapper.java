package com.diravenir.mapper;

import com.diravenir.Entities.Partenaire;
import com.diravenir.dto.PartenaireDTO;
import org.springframework.stereotype.Component;

@Component
public class PartenaireMapper {
    
    public PartenaireDTO toDTO(Partenaire partenaire) {
        if (partenaire == null) {
            return null;
        }
        
        PartenaireDTO dto = new PartenaireDTO();
        dto.setId(partenaire.getId());
        dto.setNom(partenaire.getNom());
        dto.setType(partenaire.getType());
        dto.setDescription(partenaire.getDescription());
        dto.setPays(partenaire.getPays());
        dto.setVille(partenaire.getVille());
        dto.setSiteWeb(partenaire.getSiteWeb());
        dto.setEmail(partenaire.getEmail());
        dto.setTelephone(partenaire.getTelephone());
        dto.setLogoUrl(partenaire.getLogoUrl());
        dto.setActif(partenaire.getActif());
        dto.setDatePartenariat(partenaire.getDatePartenariat());
        dto.setSpecialites(partenaire.getSpecialites());
        dto.setNombreEtudiants(partenaire.getNombreEtudiants());
        
        return dto;
    }
    
    public Partenaire toEntity(PartenaireDTO dto) {
        if (dto == null) {
            return null;
        }
        
        Partenaire partenaire = new Partenaire();
        partenaire.setId(dto.getId());
        partenaire.setNom(dto.getNom());
        partenaire.setType(dto.getType());
        partenaire.setDescription(dto.getDescription());
        partenaire.setPays(dto.getPays());
        partenaire.setVille(dto.getVille());
        partenaire.setSiteWeb(dto.getSiteWeb());
        partenaire.setEmail(dto.getEmail());
        partenaire.setTelephone(dto.getTelephone());
        partenaire.setLogoUrl(dto.getLogoUrl());
        partenaire.setActif(dto.getActif());
        partenaire.setDatePartenariat(dto.getDatePartenariat());
        partenaire.setSpecialites(dto.getSpecialites());
        partenaire.setNombreEtudiants(dto.getNombreEtudiants());
        
        return partenaire;
    }
}
