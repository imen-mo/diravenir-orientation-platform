package com.dira.diravenir1.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartenaireDTO {
    private Long id;
    private String nom;
    private String description;
    private String type; // Université, École, Institution, Entreprise
    private String pays;
    private String ville;
    private String siteWeb;
    private String email;
    private String telephone;
    private String logoUrl;
    private Boolean actif;
    private String datePartenariat;
    private String specialites; // domaines de spécialité
    private Integer nombreEtudiants; // nombre d'étudiants envoyés
}

