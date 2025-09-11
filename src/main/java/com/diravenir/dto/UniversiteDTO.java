package com.diravenir.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UniversiteDTO {
    private Long id;
    private String nom;
    private String nomEn;
    private String pays;
    private String ville;
    private String description;
    private String siteWeb;
    private String logoUrl;
} 
