package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.PartenaireDTO;
import java.util.List;

public interface PartenaireService {
    PartenaireDTO createPartenaire(PartenaireDTO dto);
    List<PartenaireDTO> getAllPartenaires();
    PartenaireDTO getPartenaireById(Long id);
    void deletePartenaire(Long id);
} 