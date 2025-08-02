package com.dira.diravenir1.impl;

import com.dira.diravenir1.Entities.Temoignage;
import com.dira.diravenir1.Repository.TemoignageRepository;
import com.dira.diravenir1.dto.TemoignageDTO;
import com.dira.diravenir1.service.TemoignageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TemoignageServiceImpl implements TemoignageService {
    @Autowired
    private TemoignageRepository temoignageRepository;

    private TemoignageDTO toDTO(Temoignage t) {
        TemoignageDTO dto = new TemoignageDTO();
        dto.setId(t.getId());
        dto.setNom(t.getNom());
        dto.setProgramme(t.getProgramme());
        dto.setTexte(t.getTexte());
        dto.setEtoiles(t.getEtoiles());
        return dto;
    }

    private Temoignage toEntity(TemoignageDTO dto) {
        Temoignage t = new Temoignage();
        t.setId(dto.getId());
        t.setNom(dto.getNom());
        t.setProgramme(dto.getProgramme());
        t.setTexte(dto.getTexte());
        t.setEtoiles(dto.getEtoiles());
        return t;
    }

    @Override
    public TemoignageDTO createTemoignage(TemoignageDTO dto) {
        Temoignage saved = temoignageRepository.save(toEntity(dto));
        return toDTO(saved);
    }

    @Override
    public List<TemoignageDTO> getAllTemoignages() {
        return temoignageRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public TemoignageDTO getTemoignageById(Long id) {
        return temoignageRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Override
    public void deleteTemoignage(Long id) {
        temoignageRepository.deleteById(id);
    }
} 

