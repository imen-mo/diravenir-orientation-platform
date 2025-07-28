package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.UniversiteDTO;
import java.util.List;

public interface UniversiteService {
    UniversiteDTO createUniversite(UniversiteDTO dto);
    List<UniversiteDTO> getAllUniversites();
    UniversiteDTO getUniversiteById(Long id);
    void deleteUniversite(Long id);
} 