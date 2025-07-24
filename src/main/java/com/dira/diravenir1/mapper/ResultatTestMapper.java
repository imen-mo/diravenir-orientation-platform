package com.dira.diravenir1.mapper;

import com.dira.diravenir1.dto.ResultatTestDTO;
import com.dira.diravenir1.Entities.ResultatTest;
import org.springframework.stereotype.Component;

@Component
public class ResultatTestMapper {
    public ResultatTestDTO toDTO(ResultatTest resultat) {
        ResultatTestDTO dto = new ResultatTestDTO();
        dto.setId(resultat.getId());
        dto.setScore(resultat.getScore());
        dto.setProfilGénéré(resultat.getProfilGénéré());
        dto.setTestId(resultat.getTest() != null ? resultat.getTest().getId() : null);
        dto.setEtudiantId(resultat.getEtudiant() != null ? resultat.getEtudiant().getId() : null);
        return dto;
    }
    public ResultatTest toEntity(ResultatTestDTO dto) {
        ResultatTest resultat = new ResultatTest();
        resultat.setId(dto.getId());
        resultat.setScore(dto.getScore());
        resultat.setProfilGénéré(dto.getProfilGénéré());
        // Les relations Test et Etudiant doivent être gérées dans le service
        return resultat;
    }
} 