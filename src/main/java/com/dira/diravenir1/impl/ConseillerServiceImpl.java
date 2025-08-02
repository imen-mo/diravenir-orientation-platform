package com.dira.diravenir1.impl;
import com.dira.diravenir1.exception.ResourceNotFoundException;

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
        return conseillerRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ConseillerDTO create(ConseillerDTO dto) {
        Conseiller conseiller = new Conseiller();
        conseiller.setNom(dto.getNom());
        conseiller.setPrenom(dto.getPrenom());
        conseiller.setEmail(dto.getEmail());
        conseiller.setPassword(dto.getMotDePasse());
        conseiller.setRole(dto.getRole());
        conseiller.setSpecialite(dto.getSpecialite());
        conseiller.setBureau(dto.getBureau());
        conseiller.setTelephoneBureau(dto.getTelephoneBureau());
        conseiller.setDisponibilite(dto.getDisponibilite());

        conseiller = conseillerRepository.save(conseiller);
        dto.setId(conseiller.getId());
        return dto;
    }

    @Override
    public ConseillerDTO getById(Long id) {
        Conseiller conseiller = conseillerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conseiller non trouvÃ© avec l'id : " + id));
        return mapToDTO(conseiller);
    }

    private ConseillerDTO mapToDTO(Conseiller conseiller) {
        return new ConseillerDTO(
                conseiller.getId(),
                conseiller.getNom(),
                conseiller.getPrenom(),
                conseiller.getEmail(),
                conseiller.getPassword(),
                conseiller.getRole(),
                conseiller.getSpecialite(),
                conseiller.getBureau(),
                conseiller.getTelephoneBureau(),
                conseiller.getDisponibilite()
        );
    }
    @Override
    public ConseillerDTO update(Long id, ConseillerDTO dto) {
        Conseiller existing = conseillerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conseiller non trouvÃ© avec l'id : " + id));

        existing.setNom(dto.getNom());
        existing.setPrenom(dto.getPrenom());
        existing.setEmail(dto.getEmail());
        existing.setPassword(dto.getMotDePasse());
        existing.setRole(dto.getRole());
        existing.setSpecialite(dto.getSpecialite());
        existing.setBureau(dto.getBureau());
        existing.setTelephoneBureau(dto.getTelephoneBureau());
        existing.setDisponibilite(dto.getDisponibilite());

        existing = conseillerRepository.save(existing);
        return mapToDTO(existing);
    }
    @Override
    public void deleteById(Long id) {
        Conseiller conseiller = conseillerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Conseiller non trouvÃ© avec l'id " + id));

        conseillerRepository.delete(conseiller);
    }



}


