package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;
    
    @Column(nullable = false)
    private String pays;
    
    @Column(nullable = false)
    private String ville;
    
    private String description;
    private BigDecimal coutVieMoyen;
    private String climat;
    private String securite;
    private String imageUrl;

    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL)
    private List<Program> programs;
} 