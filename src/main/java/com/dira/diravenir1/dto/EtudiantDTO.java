package com.dira.diravenir1.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class EtudiantDTO {
    private Long id;
    private String nom;
    private String prenom;
    private LocalDate dateNaissance;
    private String email;
    private String telephone;
    private String languePreferee;

    private String niveauEtude;
    private String domaine;
    private String ville;

    private List<Long> candidaturesIds;
}
