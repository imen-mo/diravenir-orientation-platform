package com.diravenir.mapper;

import com.diravenir.Entities.Candidature;
import com.diravenir.dto.CandidatureDTO;
import org.springframework.stereotype.Component;

@Component
public class CandidatureMapper {

    public CandidatureDTO toDTO(Candidature candidature) {
        if (candidature == null) {
            return null;
        }

        return CandidatureDTO.builder()
            .id(candidature.getId())
            .statut(candidature.getStatut())
            .dateSoumission(candidature.getDateSoumission())
            .programmeId(candidature.getProgramme() != null ? candidature.getProgramme().getId() : null)
            .etudiantId(candidature.getEtudiant() != null ? candidature.getEtudiant().getId() : null)
            .build();
    }

    public Candidature toEntity(CandidatureDTO dto) {
        if (dto == null) {
            return null;
        }

        Candidature candidature = new Candidature();
        candidature.setId(dto.getId());
        candidature.setStatut(dto.getStatut());
        candidature.setDateSoumission(dto.getDateSoumission());
        
        // Note: Les relations programme et etudiant devront être définies séparément
        // car elles nécessitent des objets complets, pas seulement des IDs
        
        return candidature;
    }
}
