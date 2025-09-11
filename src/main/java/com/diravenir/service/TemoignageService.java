package com.diravenir.service;

import com.diravenir.dto.TemoignageDTO;
import java.util.List;

public interface TemoignageService {
    TemoignageDTO createTemoignage(TemoignageDTO dto);
    List<TemoignageDTO> getAllTemoignages();
    TemoignageDTO getTemoignageById(Long id);
    void deleteTemoignage(Long id);
} 
