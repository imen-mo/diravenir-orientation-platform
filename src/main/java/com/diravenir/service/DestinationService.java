package com.diravenir.service;

import com.diravenir.Entities.Destination;
import com.diravenir.dto.DestinationDTO;
import java.util.List;

public interface DestinationService {
    List<DestinationDTO> getAllDestinations();
    DestinationDTO getDestinationById(Long id);
    DestinationDTO getDestinationByName(String nom);
} 
