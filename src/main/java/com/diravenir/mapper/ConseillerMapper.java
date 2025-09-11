package com.diravenir.mapper;

import com.diravenir.dto.ConseillerDTO;
import com.diravenir.Entities.Conseiller;
import org.springframework.stereotype.Component;

@Component
public class ConseillerMapper {
    public ConseillerDTO toDTO(Conseiller conseiller) {
        ConseillerDTO dto = new ConseillerDTO();
        dto.setId(conseiller.getId());
        dto.setNom(conseiller.getNom());
        dto.setPrenom(conseiller.getPrenom());
        dto.setEmail(conseiller.getEmail());
        dto.setMotDePasse(conseiller.getPassword());
        dto.setRole(conseiller.getRole());
        dto.setSpecialite(conseiller.getSpecialite());
        dto.setBureau(conseiller.getBureau());
        dto.setTelephoneBureau(conseiller.getTelephoneBureau());
        dto.setDisponibilite(conseiller.getDisponibilite());
        return dto;
    }
    public Conseiller toEntity(ConseillerDTO dto) {
        Conseiller conseiller = new Conseiller();
        conseiller.setId(dto.getId());
        conseiller.setNom(dto.getNom());
        conseiller.setPrenom(dto.getPrenom());
        conseiller.setEmail(dto.getEmail());
        conseiller.setPassword(dto.getMotDePasse());
        conseiller.setRole(dto.getRole());
        conseiller.setSpecialite(dto.getSpecialite());
        conseiller.setBureau(dto.getBureau());
        conseiller.setTelephoneBureau(dto.getTelephoneBureau());
        conseiller.setDisponibilite(dto.getDisponibilite());
        return conseiller;
    }
} 
