package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.UtilisateurDTO;
import java.util.List;


import com.dira.diravenir1.payload.SignupRequest;

import java.util.List;


public interface UtilisateurService {
    List<UtilisateurDTO> getAll();
    UtilisateurDTO create(UtilisateurDTO utilisateurDTO);

    void createUser(SignupRequest request);
}