package com.diravenir.dto;

import com.diravenir.Entities.Role;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdministrateurDTO {
    
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String password;
    private Role role;
    private String telephone;
    private String languePreferee;
    private String photoProfil;
    private LocalDateTime dateCreation;
    private LocalDateTime derniereConnexion;
    private boolean compteActif;
    private String fonctions;
    
    @Builder.Default
    private Boolean gereCompte = false;
    
    @Builder.Default
    private Boolean gereEtudiants = false;
}
