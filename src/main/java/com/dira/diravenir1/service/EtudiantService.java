package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.EtudiantDTO;

import java.util.List;

public interface EtudiantService {
    EtudiantDTO createEtudiant(EtudiantDTO dto);
    EtudiantDTO updateEtudiant(Long id, EtudiantDTO dto);
    void deleteEtudiant(Long id);
    EtudiantDTO getEtudiantById(Long id);
    List<EtudiantDTO> getAllEtudiants();
}
