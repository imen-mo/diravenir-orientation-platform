package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Getter
@Setter
public class Universite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String nomCourt;        // Ex: "FINAL UNI", "NEAR EAST UNI"
    private String pays;
    private String ville;
    private String description;
    private String siteWeb;
    private String logoUrl;

    @OneToMany(mappedBy = "universite", cascade = CascadeType.ALL)
    private List<Program> programs;
} 