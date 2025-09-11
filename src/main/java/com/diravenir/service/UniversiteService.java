package com.diravenir.service;

import com.diravenir.dto.UniversiteDTO;
import java.util.List;

public interface UniversiteService {
    UniversiteDTO createUniversite(UniversiteDTO dto);
    List<UniversiteDTO> getAllUniversites();
    UniversiteDTO getUniversiteById(Long id);
    void deleteUniversite(Long id);
} 
