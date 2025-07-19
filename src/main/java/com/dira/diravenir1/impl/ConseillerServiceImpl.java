package com.dira.diravenir1.impl;
import org.springframework.stereotype.Service;

import com.dira.diravenir1.Entities.Conseiller;
import com.dira.diravenir1.Repository.ConseillerRepository;
import com.dira.diravenir1.service.ConseillerService;
import com.dira.diravenir1.dto.ConseillerDTO;

import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConseillerServiceImpl implements ConseillerService {

    @Autowired
    private ConseillerRepository conseillerRepository;

    @Override
    public List<ConseillerDTO> getAll() {
        return conseillerRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public ConseillerDTO create(ConseillerDTO dto) {
        Conseiller conseiller = new Conseiller();
        conseiller.setNom(dto.getNom());
        conseiller.setPrenom(dto.getPrenom());
        conseiller.setEmail(dto.getEmail());
        conseiller.setMotDePasse(dto.getMotDePasse());
        conseiller.setRole(dto.getRole());         // ✅ Correct
// si `role` est String dans la classe Utilisateur
        conseiller.setSpecialite(dto.getSpecialite());
        conseiller.setBureau(dto.getBureau());
        conseiller.setTelephoneBureau(dto.getTelephoneBureau());
        conseiller.setDisponibilite(dto.getDisponibilite());

        conseiller = conseillerRepository.save(conseiller);
        dto.setId(conseiller.getId());
        return dto;
    }

    private ConseillerDTO mapToDTO(Conseiller conseiller) {
        return new ConseillerDTO(
                conseiller.getId(),
                conseiller.getNom(),
                conseiller.getPrenom(),
                conseiller.getEmail(),
                conseiller.getMotDePasse(),
                conseiller.getRole(),
                conseiller.getSpecialite(),
                conseiller.getBureau(),
                conseiller.getTelephoneBureau(),
                conseiller.getDisponibilite()
        );
    }
}
