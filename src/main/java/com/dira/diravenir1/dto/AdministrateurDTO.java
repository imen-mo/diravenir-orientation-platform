package com.dira.diravenir1.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AdministrateurDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String role;
    private String fonctions;
    private Boolean gereCompte;
    private Boolean gereEtudiants;
}
