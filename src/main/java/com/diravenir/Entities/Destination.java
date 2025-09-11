package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "destinations")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Destination {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String nom;
    
    @Column(nullable = false)
    private String pays;
    
    @Column
    private String ville;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column
    private String codePays;
    
    @Column
    private String devise;
    
    @Column
    private String langueOfficielle;
    
    @Column
    private String capitale;
    
    @Column
    private Long population;
    
    @Column
    private Double superficie;
    
    @Column
    private String climat;
    
    @Column
    private String drapeau;
    
    @Column
    private String monnaie;
    
    @Column
    private java.math.BigDecimal coutVieMoyen;
    
    @Column
    private String securite;
    
    @Column
    private String imageUrl;
    
    @Column
    @Builder.Default
    private Boolean active = true;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Universite> universites;
    
    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Program> programs;
}