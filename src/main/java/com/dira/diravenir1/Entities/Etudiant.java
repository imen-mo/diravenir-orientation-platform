package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Etudiant extends Utilisateur {

    private String niveauEtude;

    private String specialite;

    private String pays;

    private String ville;

    private String adresse;

    private String situation;

    private String nationalite;

    private String genre;

    private String etablissement;

    private String anneeEtude;

    private String domaine;
    @OneToMany(mappedBy = "etudiant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Candidature> candidatures;

    public List<Candidature> getCandidature() {
        return candidatures;
    }

    // Setter
    public void setCandidature(List<Candidature> Candidature) {
        this.candidatures = candidatures;
    }


    // 💼 Historique de recherche (optionnel - liste de chaînes ou d’entités selon le diagramme)
    @ElementCollection
    private List<String> historiqueRecherche = new ArrayList<>();

    // 📄 Historique de candidatures (relation avec Candidature si tu en as une entité)
    @OneToMany(mappedBy = "etudiant", cascade = CascadeType.ALL)
    private List<Candidature> historiqueCandidature = new ArrayList<>();
    @ManyToOne
    @JoinColumn(name = "administrateur_id")
    private Administrateur administrateur; // Clé étrangère vers l'administrateur
}

