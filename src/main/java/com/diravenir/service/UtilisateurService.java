package com.diravenir.service;

import com.diravenir.dto.UtilisateurDTO;

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
