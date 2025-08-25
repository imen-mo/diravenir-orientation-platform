package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.UtilisateurDTO;

import java.util.List;

public interface UtilisateurService {
    List<UtilisateurDTO> getAll();
    UtilisateurDTO create(UtilisateurDTO utilisateurDTO);
    UtilisateurDTO getById(Long id);
    UtilisateurDTO update(Long id, UtilisateurDTO utilisateurDTO);
    void delete(Long id);
    boolean existsByEmail(String email);
    UtilisateurDTO findByEmail(String email);
}