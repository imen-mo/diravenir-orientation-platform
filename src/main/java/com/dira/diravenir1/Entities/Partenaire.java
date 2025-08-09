package com.dira.diravenir1.Entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "partenaires")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Partenaire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String type;
    private String pays;
    private String ville;
    private String siteWeb;
    private String email;
    private String telephone;
    private String logoUrl;

    @Builder.Default
    private Boolean actif = true;

    private String datePartenariat;

    @Column(columnDefinition = "TEXT")
    private String specialites;

    @Builder.Default
    private Integer nombreEtudiants = 0;
}
