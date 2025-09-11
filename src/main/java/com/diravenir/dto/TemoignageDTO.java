package com.diravenir.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class TemoignageDTO {
    private Long id;
    private String nom;
    private String programme;
    private String texte;
    private int etoiles;
    private LocalDateTime dateCreation;
} 
