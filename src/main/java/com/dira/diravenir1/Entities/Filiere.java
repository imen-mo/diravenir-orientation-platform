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

    // Noms en plusieurs langues
    private String nomTurc;        // Bölüm (nom en turc)
    private String nomAnglais;     // programs (nom en anglais)
    private String nomArabe;       // التخصصات (nom en arabe)
    private Integer dureeAnnees;   // Years
    private String langueEnseignement; // Langue d'enseignement

    // Tarifs avec différents pourcentages de réduction
    private Double prix50;         // Prix avec 50% de réduction
    private Double prix60;         // Prix avec 60% de réduction
    private Double prix70;         // Prix avec 70% de réduction
    private Double prix80;         // Prix avec 80% de réduction
    private Double prix90;         // Prix avec 90% de réduction
    private Double prix100;        // Prix avec 100% de réduction (prix normal)

    @OneToMany(mappedBy = "filiere")
    private List<Etudiant> etudiants;

    @ManyToOne
    @JoinColumn(name = "destination_id")
    private Destination destination;

    @ManyToOne
    @JoinColumn(name = "partenaire_id")
    private Partenaire partenaire;

    @ManyToOne
    @JoinColumn(name = "universite_id")
    private Universite universite;
}
