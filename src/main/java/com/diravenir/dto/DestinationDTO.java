package com.diravenir.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DestinationDTO {
    private Long id;
    private String nom;
    private String pays;
    private String ville;
    private String description;
    private String codePays;
    private String devise;
    private String langueOfficielle;
    private String capitale;
    private Long population;
    private Double superficie;
    private String climat;
    private String drapeau;
    private String monnaie;
    private BigDecimal coutVieMoyen;
    private String securite;
    private String imageUrl;
    private Boolean active;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}