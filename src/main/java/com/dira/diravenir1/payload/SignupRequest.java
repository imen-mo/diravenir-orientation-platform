package com.dira.diravenir1.payload;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignupRequest {
    
    @NotBlank(message = "Le nom est requis")
    @Size(min = 2, max = 50, message = "Le nom doit contenir entre 2 et 50 caractères")
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ\\s'-]+$", message = "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes")
    private String nom;
    
    @NotBlank(message = "Le prénom est requis")
    @Size(min = 2, max = 50, message = "Le prénom doit contenir entre 2 et 50 caractères")
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ\\s'-]+$", message = "Le prénom ne peut contenir que des lettres, espaces, tirets et apostrophes")
    private String prenom;
    
    @NotBlank(message = "L'email est requis")
    @Email(message = "Format d'email invalide")
    @Size(max = 100, message = "L'email ne peut pas dépasser 100 caractères")
    private String email;
    
    @NotBlank(message = "Le mot de passe est requis")
    @Size(min = 8, max = 128, message = "Le mot de passe doit contenir entre 8 et 128 caractères")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&].*$",
        message = "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial"
    )
    private String motDePasse;
    
    @NotBlank(message = "La confirmation du mot de passe est requise")
    private String confirmationMotDePasse;
    
    private String languePreferee = "fr";
    
    // Méthodes utilitaires
    public boolean isPasswordConfirmed() {
        return motDePasse != null && motDePasse.equals(confirmationMotDePasse);
    }
    
    public boolean isStrongPassword() {
        if (motDePasse == null) return false;
        
        // Vérification des critères de sécurité
        boolean hasLower = motDePasse.matches(".*[a-z].*");
        boolean hasUpper = motDePasse.matches(".*[A-Z].*");
        boolean hasDigit = motDePasse.matches(".*\\d.*");
        boolean hasSpecial = motDePasse.matches(".*[@$!%*?&].*");
        boolean hasMinLength = motDePasse.length() >= 8;
        
        return hasLower && hasUpper && hasDigit && hasSpecial && hasMinLength;
    }
    
    public void normalizeData() {
        if (nom != null) nom = nom.trim();
        if (prenom != null) prenom = prenom.trim();
        if (email != null) email = email.trim().toLowerCase();
        if (languePreferee != null) languePreferee = languePreferee.trim().toLowerCase();
    }
}