package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.TemoignageDTO;
import java.util.List;

public interface TemoignageService {
    TemoignageDTO createTemoignage(TemoignageDTO dto);
    List<TemoignageDTO> getAllTemoignages();
    TemoignageDTO getTemoignageById(Long id);
    void deleteTemoignage(Long id);
} 