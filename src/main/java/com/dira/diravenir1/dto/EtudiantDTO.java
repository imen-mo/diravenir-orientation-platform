package com.dira.diravenir1.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class EtudiantDTO {
    private Long id;
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
    private Long administrateurId; // Pour associer à un administrateur
    private List<String> historiqueRecherche;
}
