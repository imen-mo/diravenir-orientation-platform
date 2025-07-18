package com.dira.diravenir1.dto;

import com.dira.diravenir1.Entities.Role;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConseillerDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private Role role;

    private String specialite;
    private String bureau;
    private String telephoneBureau;
    private String disponibilite;
}
