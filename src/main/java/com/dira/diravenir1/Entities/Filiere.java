package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Filiere {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;

    private String domaine;

    @OneToMany(mappedBy = "filiere")
    private List<Etudiant> etudiants;
}
