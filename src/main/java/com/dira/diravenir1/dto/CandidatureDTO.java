package com.dira.diravenir1.dto;


import lombok.Data;

@Data
public class CandidatureDTO {
    private Long id;
    private String statut;
    private String dateSoumission;
    private String programme;
    private Long etudiantId;}