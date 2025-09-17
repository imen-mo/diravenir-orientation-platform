package com.diravenir.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    
    @NotBlank(message = "L'email est requis")
    @Email(message = "Format d'email invalide")
    private String email;
    
    @NotBlank(message = "Le mot de passe est requis")
    @Size(min = 8, message = "Le mot de passe doit contenir au moins 8 caractères")
    private String password;
    
    @NotBlank(message = "La confirmation du mot de passe est requise")
    private String confirmPassword;
    
    private String firstName;
    
    private String lastName;
    
    private String phone;
    private String birthDate;
    @Builder.Default
    private Boolean rememberMe = false;
}