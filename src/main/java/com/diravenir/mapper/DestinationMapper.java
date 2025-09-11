package com.diravenir.mapper;

import com.diravenir.Entities.Destination;
import com.diravenir.dto.DestinationDTO;
import org.springframework.stereotype.Component;

@Component
public class DestinationMapper {
    
    public DestinationDTO toDTO(Destination destination) {
        if (destination == null) {
            return null;
        }
        
        DestinationDTO dto = new DestinationDTO();
        dto.setId(destination.getId());
        dto.setNom(destination.getNom());
        dto.setDescription(destination.getDescription());
        dto.setImageUrl(destination.getImageUrl());
        
        return dto;
    }
    
    public Destination toEntity(DestinationDTO dto) {
        if (dto == null) {
            return null;
        }
        
        Destination destination = new Destination();
        destination.setId(dto.getId());
        destination.setNom(dto.getNom());
        destination.setDescription(dto.getDescription());
        destination.setImageUrl(dto.getImageUrl());
        
        return destination;
    }
}
