package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "filieres")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Filiere {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "nom", nullable = false)
    private String nom;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "domaine", nullable = false)
    private String domaine;
    
    @Column(name = "niveau")
    private String niveau;
    
    @Column(name = "duree")
    private String duree;
    
    @Column(name = "prerequis", columnDefinition = "TEXT")
    private String prerequis;
    
    @Column(name = "debouches", columnDefinition = "TEXT")
    private String debouches;
    
    @Column(name = "active")
    private Boolean active;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "cout")
    private String cout;
    
    @Column(name = "langue")
    private String langue;
}
