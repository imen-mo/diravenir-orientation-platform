package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@MappedSuperclass
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String motDePasse;

    @Enumerated(EnumType.STRING)
    private Role role;  // <--- ici, Role au lieu de String

    private String nom;
    private String prenom;
    private LocalDate dateNaissance;
    private String email;
    private String telephone;
    private String languePreferee;
    @ManyToOne
    @JoinColumn(name = "filiere_id")
    private Filiere filiere;

}
