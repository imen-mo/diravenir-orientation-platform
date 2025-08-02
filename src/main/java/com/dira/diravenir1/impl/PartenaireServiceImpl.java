package com.dira.diravenir1.impl;

import com.dira.diravenir1.Entities.Partenaire;
import com.dira.diravenir1.Repository.PartenaireRepository;
import com.dira.diravenir1.dto.PartenaireDTO;
import com.dira.diravenir1.service.PartenaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PartenaireServiceImpl implements PartenaireService {
    @Autowired
    private PartenaireRepository partenaireRepository;

    private PartenaireDTO toDTO(Partenaire p) {
        PartenaireDTO dto = new PartenaireDTO();
        dto.setId(p.getId());
        dto.setNom(p.getNom());
        dto.setDescription(p.getDescription());
        dto.setLogoUrl(p.getLogoUrl());
        dto.setSiteWeb(p.getSiteWeb());
        return dto;
    }

    private Partenaire toEntity(PartenaireDTO dto) {
        Partenaire p = new Partenaire();
        p.setId(dto.getId());
        p.setNom(dto.getNom());
        p.setDescription(dto.getDescription());
        p.setLogoUrl(dto.getLogoUrl());
        p.setSiteWeb(dto.getSiteWeb());
        return p;
    }

    @Override
    public PartenaireDTO createPartenaire(PartenaireDTO dto) {
        Partenaire saved = partenaireRepository.save(toEntity(dto));
        return toDTO(saved);
    }

    @Override
    public List<PartenaireDTO> getAllPartenaires() {
        return partenaireRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public PartenaireDTO getPartenaireById(Long id) {
        return partenaireRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Override
    public void deletePartenaire(Long id) {
        partenaireRepository.deleteById(id);
    }
} 

