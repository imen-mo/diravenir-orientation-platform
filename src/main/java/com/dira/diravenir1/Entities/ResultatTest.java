package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "resultats_test")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultatTest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "score", nullable = false)
    private Integer score;
    
    @Column(name = "profil_genere", columnDefinition = "TEXT")
    private String profilGénéré;
    
    // Propriété profil pour compatibilité
    @Column(name = "profil", columnDefinition = "TEXT")
    private String profil;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_id")
    private Test test;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "etudiant_id")
    private Etudiant etudiant;
}
