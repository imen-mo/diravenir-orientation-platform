package com.dira.diravenir1.mapper;

import com.dira.diravenir1.dto.FiliereDTO;
import com.dira.diravenir1.Entities.Filiere;
import org.springframework.stereotype.Component;

@Component
public class FiliereMapper {
    public FiliereDTO toDTO(Filiere filiere) {
        FiliereDTO dto = new FiliereDTO();
        dto.setId(filiere.getId());
        dto.setNom(filiere.getNom());
        dto.setDomaine(filiere.getDomaine());
        return dto;
    }
    public Filiere toEntity(FiliereDTO dto) {
        Filiere filiere = new Filiere();
        filiere.setId(dto.getId());
        filiere.setNom(dto.getNom());
        filiere.setDomaine(dto.getDomaine());
        return filiere;
    }
} 