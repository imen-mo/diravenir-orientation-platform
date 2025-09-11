package com.diravenir.dto;


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
    
    @Builder.Default
    private Boolean actif = true;
    
    private String datePartenariat;
    private String specialites; // domaines de spécialité
    
    @Builder.Default
    private Integer nombreEtudiants = 0; // nombre d'étudiants envoyés
}

