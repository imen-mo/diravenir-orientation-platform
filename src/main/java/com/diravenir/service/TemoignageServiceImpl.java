package com.diravenir.service;

import com.diravenir.dto.TemoignageDTO;
import com.diravenir.Entities.Temoignage;
import com.diravenir.repository.TemoignageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TemoignageServiceImpl implements TemoignageService {

    @Autowired
    private TemoignageRepository temoignageRepository;

    @Override
    public TemoignageDTO createTemoignage(TemoignageDTO dto) {
        Temoignage temoignage = new Temoignage();
        temoignage.setId(dto.getId());
        temoignage.setNom(dto.getNom());
        temoignage.setProgramme(dto.getProgramme());
        temoignage.setTexte(dto.getTexte());
        temoignage.setEtoiles(dto.getEtoiles());
        
        Temoignage savedTemoignage = temoignageRepository.save(temoignage);
        
        return toDTO(savedTemoignage);
    }

    @Override
    public List<TemoignageDTO> getAllTemoignages() {
        List<Temoignage> temoignages = temoignageRepository.findAll();
        return temoignages.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TemoignageDTO getTemoignageById(Long id) {
        Temoignage temoignage = temoignageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Témoignage non trouvé avec l'id: " + id));
        return toDTO(temoignage);
    }

    @Override
    public void deleteTemoignage(Long id) {
        if (!temoignageRepository.existsById(id)) {
            throw new RuntimeException("Témoignage non trouvé avec l'id: " + id);
        }
        temoignageRepository.deleteById(id);
    }

    private TemoignageDTO toDTO(Temoignage temoignage) {
        TemoignageDTO dto = new TemoignageDTO();
        dto.setId(temoignage.getId());
        dto.setNom(temoignage.getNom());
        dto.setProgramme(temoignage.getProgramme());
        dto.setTexte(temoignage.getTexte());
        dto.setEtoiles(temoignage.getEtoiles());
        dto.setDateCreation(temoignage.getDateCreation());
        return dto;
    }
}
