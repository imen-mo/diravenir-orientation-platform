package com.dira.diravenir1.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TemoignageDTO {
    private Long id;
    private String nom;
    private String programme;
    private String texte;
    private int etoiles;
} 