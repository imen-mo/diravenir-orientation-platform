package com.dira.diravenir1.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultatTestDTO {
    
    private Long id;
    private Integer score;
    private String profilGénéré;
    private String profil; // Propriété profil pour compatibilité
    private Long testId;
    private Long etudiantId;
}
