package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.DestinationDTO;
import java.util.List;

public interface DestinationService {
    DestinationDTO createDestination(DestinationDTO dto);
    List<DestinationDTO> getAllDestinations();
    DestinationDTO getDestinationById(Long id);
    void deleteDestination(Long id);
} 