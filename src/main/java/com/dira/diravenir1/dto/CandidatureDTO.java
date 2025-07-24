package com.dira.diravenir1.dto;


<<<<<<< HEAD
import lombok.Data;

@Data
public class CandidatureDTO {
    private Long id;
    private String statut;
    private String dateSoumission;
    private String programme;
    private Long etudiantId;}
=======

import java.util.Date;
import java.util.List;

public class CandidatureDTO {

    private int id;
    private Date dateSoumission;
    private String statut;
    private String suivi;
    private List<Integer> documentIds;
    private int etudiantId;

    // Getters et Setters
}
>>>>>>> d86042f8070b78afa979b2736cbba471d0f52c00
