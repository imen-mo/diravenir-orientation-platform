package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "etudiant")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)  // Pour Lombok, prend en compte l'héritage
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

<<<<<<< HEAD
    @OneToMany(mappedBy = "etudiant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Candidature> candidatures = new ArrayList<>();

=======
    public List<Candidature> getCandidature() {
        return candidatures;
    }

    // Setter
    public void setCandidature(List<Candidature> Candidature) {
        this.candidatures = candidatures;
    }


    // 💼 Historique de recherche (optionnel - liste de chaînes ou d’entités selon le diagramme)
>>>>>>> d86042f8070b78afa979b2736cbba471d0f52c00
    @ElementCollection
    @CollectionTable(name = "etudiant_historique_recherche", joinColumns = @JoinColumn(name = "etudiant_id"))
    @Column(name = "recherche")
    private List<String> historiqueRecherche = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "administrateur_id")
    private Administrateur administrateur;


}
