package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Candidature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dateSoumission;

    private String statut;

    private String suivi;

    private String programme;

    @OneToMany(mappedBy = "candidature", cascade = CascadeType.ALL, orphanRemoval = true)
    @ToString.Exclude // Pour éviter récursion infinie dans toString
    @EqualsAndHashCode.Exclude // Pareil pour equals et hashCode
    private List<Document> documents = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "etudiant_id", nullable = false)
    private Etudiant etudiant;

    // Ajout d'un constructeur personnalisé sans 'id' ni 'documents' (optionnel, plus lisible)
    @Builder
    public Candidature(LocalDate dateSoumission, String statut, String suivi, String programme, Etudiant etudiant) {
        this.dateSoumission = String.valueOf(dateSoumission);
        this.statut = statut;
        this.suivi = suivi;
        this.programme = programme;
        this.etudiant = etudiant;
    }

    // Méthodes utilitaires pour gérer la relation bidirectionnelle avec Document
    public void addDocument(Document document) {
        documents.add(document);
        document.setCandidature(this);
    }

    public void removeDocument(Document document) {
        documents.remove(document);
        document.setCandidature(null);
    }
}
