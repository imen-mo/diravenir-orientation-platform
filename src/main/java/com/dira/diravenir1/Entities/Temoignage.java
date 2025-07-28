package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Getter
@Setter
public class Temoignage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String programme;
    private String texte;
    private int etoiles;

    @OneToMany(mappedBy = "temoignage", cascade = CascadeType.ALL)
    private List<Etudiant> etudiants;
} 