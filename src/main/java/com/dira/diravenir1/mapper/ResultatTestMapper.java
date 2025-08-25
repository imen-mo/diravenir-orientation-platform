package com.dira.diravenir1.mapper;

import com.dira.diravenir1.Entities.ResultatTest;
import com.dira.diravenir1.dto.ResultatTestDTO;
import org.springframework.stereotype.Component;

@Component
public class ResultatTestMapper {

    public ResultatTestDTO toDTO(ResultatTest resultat) {
        if (resultat == null) {
            return null;
        }

        return ResultatTestDTO.builder()
            .id(resultat.getId())
            .score(resultat.getScore())
            .profilGénéré(resultat.getProfilGénéré())
            .testId(resultat.getTest() != null ? resultat.getTest().getId() : null)
            .etudiantId(resultat.getEtudiant() != null ? resultat.getEtudiant().getId() : null)
            .build();
    }

    public ResultatTest toEntity(ResultatTestDTO dto) {
        if (dto == null) {
            return null;
        }

        ResultatTest resultat = new ResultatTest();
        resultat.setId(dto.getId());
        resultat.setScore(dto.getScore());
        resultat.setProfilGénéré(dto.getProfilGénéré());
        
        // Note: Les relations test et etudiant devront être définies séparément
        // car elles nécessitent des objets complets, pas seulement des IDs
        
        return resultat;
    }
} 