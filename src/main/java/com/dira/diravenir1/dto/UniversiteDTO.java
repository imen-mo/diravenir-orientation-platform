package com.dira.diravenir1.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UniversiteDTO {
    private Long id;
    private String nom;
    private String nomCourt;
    private String pays;
    private String ville;
    private String description;
    private String siteWeb;
    private String logoUrl;
} 