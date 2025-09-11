package com.diravenir.service;

import com.diravenir.Entities.Destination;
import com.diravenir.dto.DestinationDTO;
import com.diravenir.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DestinationServiceImpl implements DestinationService {

    @Autowired
    private DestinationRepository destinationRepository;

    @Override
    public List<DestinationDTO> getAllDestinations() {
        List<Destination> destinations = destinationRepository.findByActiveTrue();
        return destinations.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public DestinationDTO getDestinationById(Long id) {
        Destination destination = destinationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Destination non trouvée avec l'id: " + id));
        return convertToDTO(destination);
    }

    @Override
    public DestinationDTO getDestinationByName(String nom) {
        List<Destination> destinations = destinationRepository.findByNomContainingIgnoreCase(nom);
        return destinations.isEmpty() ? 
                null : convertToDTO(destinations.get(0));
    }
    
    private DestinationDTO convertToDTO(Destination destination) {
        return DestinationDTO.builder()
                .id(destination.getId())
                .nom(destination.getNom())
                .pays(destination.getPays())
                .ville(destination.getVille())
                .description(destination.getDescription())
                .codePays(destination.getCodePays())
                .devise(destination.getDevise())
                .langueOfficielle(destination.getLangueOfficielle())
                .capitale(destination.getCapitale())
                .population(destination.getPopulation())
                .superficie(destination.getSuperficie())
                .climat(destination.getClimat())
                .drapeau(destination.getDrapeau())
                .monnaie(destination.getMonnaie())
                .coutVieMoyen(destination.getCoutVieMoyen())
                .securite(destination.getSecurite())
                .imageUrl(destination.getImageUrl())
                .active(destination.getActive())
                .createdAt(destination.getCreatedAt())
                .updatedAt(destination.getUpdatedAt())
                .build();
    }
}
