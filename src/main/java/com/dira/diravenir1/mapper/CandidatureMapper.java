package com.dira.diravenir1.mapper;

import com.dira.diravenir1.dto.CandidatureDTO;
import com.dira.diravenir1.Entities.Candidature;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public class CandidatureMapper {

    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public CandidatureDTO toDTO(Candidature candidature) {
        CandidatureDTO dto = new CandidatureDTO();
        dto.setId(candidature.getId());
        dto.setStatut(candidature.getStatut());

        // ✅ Convertir LocalDate -> String avec sécurité null
        if (candidature.getDateSoumission() != null) {
            dto.setDateSoumission(candidature.getDateSoumission().format(String.valueOf(formatter)));
        } else {
            dto.setDateSoumission(null);
        }

        dto.setProgramme(candidature.getProgramme());
        return dto;
    }

    public Candidature toEntity(CandidatureDTO dto) {
        Candidature candidature = new Candidature();
        candidature.setId(dto.getId());
        candidature.setStatut(dto.getStatut());

        // ✅ Convertir String -> LocalDate avec sécurité null
        if (dto.getDateSoumission() != null && !dto.getDateSoumission().isEmpty()) {
            candidature.setDateSoumission(String.valueOf(LocalDate.parse(dto.getDateSoumission(), formatter)));
        } else {
            candidature.setDateSoumission(null);
        }

        candidature.setProgramme(dto.getProgramme());
        return candidature;
    }
}
