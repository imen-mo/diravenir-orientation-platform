package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.PersonalInfoDTO;

public interface PersonalInfoService {
    /**
     * Sauvegarde les informations personnelles d'un étudiant
     * @param personalInfo Les informations personnelles à sauvegarder
     * @return true si la sauvegarde a réussi, false sinon
     */
    boolean savePersonalInfo(PersonalInfoDTO personalInfo);
    
    /**
     * Récupère les informations personnelles d'un étudiant par email
     * @param email L'email de l'étudiant
     * @return Les informations personnelles ou null si non trouvé
     */
    PersonalInfoDTO getPersonalInfoByEmail(String email);
}
