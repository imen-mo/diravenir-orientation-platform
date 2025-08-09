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

    @Column(nullable = false)
    private String nom;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String domaine;
    private String niveau;
    private String duree;

    @Column(columnDefinition = "TEXT")
    private String prerequis;

    @Column(columnDefinition = "TEXT")
    private String debouches;

    @Builder.Default
    private Boolean active = true;

    private String imageUrl;
    private Double cout;
    private String langue;
}
