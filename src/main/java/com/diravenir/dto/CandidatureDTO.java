package com.diravenir.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CandidatureDTO {
    
    private Long id;
    private String statut;
    private LocalDate dateSoumission;
    private Long programmeId;
    private Long etudiantId;
}
