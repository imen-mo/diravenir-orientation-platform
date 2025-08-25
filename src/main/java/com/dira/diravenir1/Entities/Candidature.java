package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "candidatures")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Candidature {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "statut", nullable = false)
    private String statut;
    
    @Column(name = "date_soumission", nullable = false)
    private LocalDate dateSoumission;
    
    // Suivi de la candidature
    @Column(columnDefinition = "TEXT")
    private String suivi;
    
    // Documents associés
    @OneToMany(mappedBy = "candidature", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Document> documents = new ArrayList<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "programme_id")
    private Program programme;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "etudiant_id")
    private Etudiant etudiant;
    
    // Méthodes utilitaires
    public void addDocument(Document document) {
        if (documents == null) {
            documents = new ArrayList<>();
        }
        documents.add(document);
        document.setCandidature(this);
    }
    
    public void removeDocument(Document document) {
        if (documents != null) {
            documents.remove(document);
            document.setCandidature(null);
        }
    }
}
