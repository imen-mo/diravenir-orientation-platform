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
    private String niveau;
    private String duree;
    private String prerequis;
    private String debouches;
    private Boolean active;
    private String imageUrl;
    private String cout;
    private String langue;
}