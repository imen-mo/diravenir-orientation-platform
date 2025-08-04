package com.dira.diravenir1.impl;

import com.dira.diravenir1.Entities.Destination;
import com.dira.diravenir1.Repository.DestinationRepository;
import com.dira.diravenir1.dto.DestinationDTO;
import com.dira.diravenir1.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DestinationServiceImpl implements DestinationService {
    @Autowired
    private DestinationRepository destinationRepository;

    private DestinationDTO toDTO(Destination d) {
        DestinationDTO dto = new DestinationDTO();
        dto.setId(d.getId());
        dto.setNom(d.getNom());
        dto.setDescription(d.getDescription());
        dto.setImageUrl(d.getImageUrl());
        return dto;
    }

    private Destination toEntity(DestinationDTO dto) {
        Destination d = new Destination();
        d.setId(dto.getId());
        d.setNom(dto.getNom());
        d.setDescription(dto.getDescription());
        d.setImageUrl(dto.getImageUrl());
        return d;
    }

    @Override
    public DestinationDTO createDestination(DestinationDTO dto) {
        Destination saved = destinationRepository.save(toEntity(dto));
        return toDTO(saved);
    }

    @Override
    public List<DestinationDTO> getAllDestinations() {
        return destinationRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public DestinationDTO getDestinationById(Long id) {
        return destinationRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Override
    public void deleteDestination(Long id) {
        destinationRepository.deleteById(id);
    }
} 

