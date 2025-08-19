package com.dira.diravenir1.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdministrateurDTO {
    
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private String role;
    private String fonctions;
    private Boolean gereCompte;
    private Boolean gereEtudiants;
    
    // Constructeur de copie depuis l'entité
    public AdministrateurDTO(Long id, String nom, String prenom, String email, String role) {
        this.id = id;
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.role = role;
    }
}
