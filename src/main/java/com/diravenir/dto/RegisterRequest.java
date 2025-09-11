package com.diravenir.dto;

import com.diravenir.Entities.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String nom;
    private String prenom;
    private String email;
    private String password;
    private String telephone; // Optionnel
    private String languePreferee; // Optionnel
    private String photoProfil; // Optionnel
    private Role role; // Optionnel - sera ETUDIANT par défaut
}