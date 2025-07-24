package com.dira.diravenir1.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EtudiantDTO {
    private Long id;
    private String nom;
    private String prenom;
    private LocalDate dateNaissance;
    private String email;
    private String telephone;
    private String languePreferee;
    private String motDePasse;

    private String niveauEtude;
    private String specialite;
    private String pays;
    private String ville;
    private String adresse;
    private String situation;
    private String nationalite;
    private String genre;
    private String etablissement;
    private String anneeEtude;
    private String domaine;

    private List<Long> candidaturesIds;

    private Long administrateurId;
    private List<String> historiqueRecherche;

}
