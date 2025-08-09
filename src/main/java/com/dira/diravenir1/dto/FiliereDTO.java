package com.dira.diravenir1.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FiliereDTO {
    private Long id;
    private String nom;
    private String description;
    private String domaine;
    private String niveau; // Licence, Master, Doctorat
    private String duree; // "3 ans", "2 ans"
    private String prerequis;
    private String debouches; // opportunités de carrière
    private Boolean active;
    private String imageUrl;
    private Double cout; // coût approximatif
    private String langue; // français, anglais, etc.
}