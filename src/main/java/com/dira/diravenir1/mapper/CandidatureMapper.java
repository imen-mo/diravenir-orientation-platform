package com.dira.diravenir1.mapper;

import com.dira.diravenir1.dto.CandidatureDTO;
import com.dira.diravenir1.Entities.Candidature;
import org.springframework.stereotype.Component;

@Component
public class CandidatureMapper {
    public CandidatureDTO toDTO(Candidature candidature) {
        CandidatureDTO dto = new CandidatureDTO();
        dto.setId(candidature.getId());
        dto.setStatut(candidature.getStatut());
        dto.setDateSoumission(candidature.getDateSoumission());
        dto.setProgramme(candidature.getProgramme());
        return dto;
    }
    public Candidature toEntity(CandidatureDTO dto) {
        Candidature candidature = new Candidature();
        candidature.setId(dto.getId());
        candidature.setStatut(dto.getStatut());
        candidature.setDateSoumission(dto.getDateSoumission());
        candidature.setProgramme(dto.getProgramme());
        // Ajoute les autres champs nécessaires
        return candidature;
    }
} 