package com.dira.diravenir1.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResultatTestDTO {
    private Long id;
    private double score;
    private String profilGénéré;
    private Long testId;
    private Long etudiantId;

    public void setProfil(Object profil) {
    }

    public Object getProfil() {
        return null;
    }
}
