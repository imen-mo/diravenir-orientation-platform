package com.dira.diravenir1.dto;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
public class CandidatureDTO {

    private Long id;
    private Date dateSoumission;
    private String statut;
    private String suivi;
    private String programme;
    private List<Integer> documentIds;
    private Long etudiantId;

}
