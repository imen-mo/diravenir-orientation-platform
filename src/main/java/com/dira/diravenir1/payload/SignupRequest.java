package com.dira.diravenir1.payload;
import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;

@Data
public class SignupRequest {
    
    @NotBlank(message = "L'email est requis")
    @Email(message = "Format d'email invalide")
    private String email;

    @NotBlank(message = "Le mot de passe est requis")
    @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
    @Pattern(
        regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
        message = "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial"
    )
    private String password;

    @NotBlank(message = "La confirmation du mot de passe est requise")
    private String confirmPassword;

    @NotBlank(message = "Le nom est requis")
    @Size(min = 2, max = 50, message = "Le nom doit contenir entre 2 et 50 caractères")
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ\\s'-]+$", message = "Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes")
    private String nom;

    @NotBlank(message = "Le prénom est requis")
    @Size(min = 2, max = 50, message = "Le prénom doit contenir entre 2 et 50 caractères")
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ\\s'-]+$", message = "Le prénom ne peut contenir que des lettres, espaces, tirets et apostrophes")
    private String prenom;

    @NotBlank(message = "Le token reCAPTCHA est requis")
    private String recaptchaToken;

    // Validation de sécurité côté backend
    public boolean isPasswordConfirmed() {
        return password != null && password.equals(confirmPassword);
    }

    public boolean isStrongPassword() {
        if (password == null || password.length() < 8) {
            return false;
        }
        
        boolean hasUpperCase = password.matches(".*[A-Z].*");
        boolean hasLowerCase = password.matches(".*[a-z].*");
        boolean hasDigit = password.matches(".*\\d.*");
        boolean hasSpecialChar = password.matches(".*[@$!%*?&].*");
        
        return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
    }

    // Normalisation des données
    public void normalizeData() {
        if (email != null) {
            email = email.trim().toLowerCase();
        }
        if (nom != null) {
            nom = nom.trim();
        }
        if (prenom != null) {
            prenom = prenom.trim();
        }
    }
}