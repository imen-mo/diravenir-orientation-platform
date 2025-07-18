package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.AdministrateurDTO;

import java.util.List;

public interface AdministrateurService {
    AdministrateurDTO createAdministrateur(AdministrateurDTO dto);
    List<AdministrateurDTO> getAllAdministrateurs();
    AdministrateurDTO getAdministrateurById(Long id);
    void deleteAdministrateur(Long id);
}
