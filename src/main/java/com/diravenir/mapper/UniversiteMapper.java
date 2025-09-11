package com.diravenir.mapper;

import com.diravenir.Entities.Universite;
import com.diravenir.dto.UniversiteDTO;
import org.springframework.stereotype.Component;

@Component
public class UniversiteMapper {
    
    public UniversiteDTO toDTO(Universite universite) {
        if (universite == null) {
            return null;
        }
        
        UniversiteDTO dto = new UniversiteDTO();
        dto.setId(universite.getId());
        dto.setNom(universite.getNom());
        dto.setNomEn(universite.getNomEn());
        dto.setPays(universite.getPays());
        dto.setVille(universite.getVille());
        dto.setDescription(universite.getDescription());
        dto.setSiteWeb(universite.getSiteWeb());
        dto.setLogoUrl(universite.getLogoUrl());
        
        return dto;
    }
    
    public Universite toEntity(UniversiteDTO dto) {
        if (dto == null) {
            return null;
        }
        
        Universite universite = new Universite();
        universite.setId(dto.getId());
        universite.setNom(dto.getNom());
        universite.setNomEn(dto.getNomEn());
        universite.setPays(dto.getPays());
        universite.setVille(dto.getVille());
        universite.setDescription(dto.getDescription());
        universite.setSiteWeb(dto.getSiteWeb());
        universite.setLogoUrl(dto.getLogoUrl());
        
        return universite;
    }
}
