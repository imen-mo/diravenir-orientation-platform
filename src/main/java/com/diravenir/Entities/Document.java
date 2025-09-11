package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Document {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String nom;
    
    @Column(nullable = false)
    private String type;
    
    @Column(nullable = false)
    private String cheminFichier;
    
    @Column
    private Long tailleFichier;
    
    @Column
    private String typeMime;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column
    @Builder.Default
    private Boolean estPublic = false;
    
    @Column
    private String motDePasse;
    
    @Column
    private LocalDateTime dateExpiration;
    
    @Column
    @Builder.Default
    private Integer nombreTelechargements = 0;
    
    @Column
    private String tags;
    
    @Column
    private String categorie;
    
    @Column
    private String version;
    
    @Column
    @Builder.Default
    private Boolean active = true;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @Column(name = "created_by")
    private Long createdBy;
    
    @Column(name = "updated_by")
    private Long updatedBy;
    
    @Column
    private String chemin;
    
    @ManyToOne
    @JoinColumn(name = "etudiant_id")
    private com.diravenir.Entities.Etudiant etudiant;
    
    @ManyToOne
    @JoinColumn(name = "candidature_id")
    private com.diravenir.Entities.Candidature candidature;
}