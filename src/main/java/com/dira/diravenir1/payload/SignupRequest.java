package com.dira.diravenir1.payload;
import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Data
public class SignupRequest {
    @NotBlank @Email
    private String email;

    @NotBlank
    private String motDePasse;

    @NotBlank
    private String confirmPassword;

    @NotBlank
    private String nom;

    // Bonus : sécurité renforcée côté backend
    public boolean isPasswordConfirmed() {
        return motDePasse != null && motDePasse.equals(confirmPassword);
}
}