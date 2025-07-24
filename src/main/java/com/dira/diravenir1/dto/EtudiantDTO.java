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
<<<<<<< HEAD
    private String nom;
    private String prenom;
    private LocalDate dateNaissance;
    private String email;
    private String telephone;
    private String languePreferee;
    private String motDePasse;
=======
>>>>>>> d86042f8070b78afa979b2736cbba471d0f52c00
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
<<<<<<< HEAD
    private List<Long> candidaturesIds;
=======
    private Long administrateurId; // Pour associer à un administrateur
    private List<String> historiqueRecherche;
>>>>>>> d86042f8070b78afa979b2736cbba471d0f52c00
}
