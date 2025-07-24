package com.dira.diravenir1.mapper;

import com.dira.diravenir1.dto.AdministrateurDTO;
import com.dira.diravenir1.Entities.Administrateur;
import org.springframework.stereotype.Component;

@Component
public class AdministrateurMapper {
    public AdministrateurDTO toDTO(Administrateur admin) {
        AdministrateurDTO dto = new AdministrateurDTO();
        dto.setId(admin.getId());
        dto.setNom(admin.getNom());
        dto.setPrenom(admin.getPrenom());
        dto.setEmail(admin.getEmail());
        dto.setRole(admin.getRole());
        dto.setFonctions(admin.getFonctions());
        dto.setGereCompte(admin.getGereCompte());
        dto.setGereEtudiants(admin.getGereEtudiants());
        return dto;
    }
    public Administrateur toEntity(AdministrateurDTO dto) {
        Administrateur admin = new Administrateur();
        admin.setId(dto.getId());
        admin.setNom(dto.getNom());
        admin.setPrenom(dto.getPrenom());
        admin.setEmail(dto.getEmail());
        admin.setRole(dto.getRole());
        admin.setFonctions(dto.getFonctions());
        admin.setGereCompte(dto.getGereCompte());
        admin.setGereEtudiants(dto.getGereEtudiants());
        return admin;
    }
} 