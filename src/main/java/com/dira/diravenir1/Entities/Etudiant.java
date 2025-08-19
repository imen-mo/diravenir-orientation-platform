package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
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

    // ======================
    // === CHAMPS TEST D'ORIENTATION ===
    // ======================
    
    @Column(name = "nom_test", length = 100)
    private String nomTest;
    
    @Column(name = "email_test", length = 255)
    private String emailTest;
    
    @Column(name = "telephone_test", length = 20)
    private String telephoneTest;
    
    @Column(name = "date_test_orientation")
    private LocalDateTime dateTestOrientation;
    
    @Column(name = "statut_test_complete")
    private Boolean statutTestComplete = false;

    @OneToMany(mappedBy = "etudiant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Candidature> candidatures = new ArrayList<>();


    public List<Candidature> getCandidature() {
        return candidatures;
    }

    // Setter
    public void setCandidature(List<Candidature> Candidature) {
        this.candidatures = candidatures;
    }


    // 💼 Historique de recherche (optionnel - liste de chaînes ou d'entités selon le diagramme)

    @ElementCollection
    @CollectionTable(name = "etudiant_historique_recherche", joinColumns = @JoinColumn(name = "etudiant_id"))
    @Column(name = "recherche")
    private List<String> historiqueRecherche = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "administrateur_id")
    private Administrateur administrateur;

    @ManyToOne
    @JoinColumn(name = "temoignage_id")
    private Temoignage temoignage;

}
