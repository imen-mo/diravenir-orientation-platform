package com.diravenir.service.impl;

import com.diravenir.dto.ConseillerDTO;
import com.diravenir.Entities.Conseiller;
import com.diravenir.repository.ConseillerRepository;
import com.diravenir.service.ConseillerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ConseillerServiceImpl implements ConseillerService {

    @Autowired
    private ConseillerRepository conseillerRepository;

    @Override
    public List<ConseillerDTO> getAll() {
        return conseillerRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ConseillerDTO create(ConseillerDTO conseillerDTO) {
        Conseiller conseiller = convertToEntity(conseillerDTO);
        Conseiller savedConseiller = conseillerRepository.save(conseiller);
        return convertToDTO(savedConseiller);
    }

    @Override
    public ConseillerDTO getById(Long id) {
        Optional<Conseiller> conseiller = conseillerRepository.findById(id);
        return conseiller.map(this::convertToDTO).orElse(null);
    }

    @Override
    public ConseillerDTO update(Long id, ConseillerDTO conseillerDTO) {
        Optional<Conseiller> existingConseiller = conseillerRepository.findById(id);
        if (existingConseiller.isPresent()) {
            Conseiller conseiller = convertToEntity(conseillerDTO);
            conseiller.setId(id);
            Conseiller updatedConseiller = conseillerRepository.save(conseiller);
            return convertToDTO(updatedConseiller);
        }
        return null;
    }

    @Override
    public void deleteById(Long id) {
        conseillerRepository.deleteById(id);
    }

    private ConseillerDTO convertToDTO(Conseiller conseiller) {
        ConseillerDTO dto = new ConseillerDTO();
        dto.setId(conseiller.getId());
        dto.setNom(conseiller.getNom());
        dto.setPrenom(conseiller.getPrenom());
        dto.setEmail(conseiller.getEmail());
        dto.setRole(conseiller.getRole());
        dto.setSpecialite(conseiller.getSpecialite());
        dto.setBureau(conseiller.getBureau());
        dto.setTelephoneBureau(conseiller.getTelephoneBureau());
        dto.setDisponibilite(conseiller.getDisponibilite());
        return dto;
    }

    private Conseiller convertToEntity(ConseillerDTO dto) {
        Conseiller conseiller = new Conseiller();
        conseiller.setId(dto.getId());
        conseiller.setNom(dto.getNom());
        conseiller.setPrenom(dto.getPrenom());
        conseiller.setEmail(dto.getEmail());
        conseiller.setRole(dto.getRole());
        conseiller.setSpecialite(dto.getSpecialite());
        conseiller.setBureau(dto.getBureau());
        conseiller.setTelephoneBureau(dto.getTelephoneBureau());
        conseiller.setDisponibilite(dto.getDisponibilite());
        return conseiller;
    }
}
