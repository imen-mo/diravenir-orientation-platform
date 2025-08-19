package com.dira.diravenir1.impl;

import com.dira.diravenir1.dto.PersonalInfoDTO;
import com.dira.diravenir1.Entities.Etudiant;
import com.dira.diravenir1.Repository.EtudiantRepository;
import com.dira.diravenir1.service.PersonalInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PersonalInfoServiceImpl implements PersonalInfoService {

    private final EtudiantRepository etudiantRepository;

    @Override
    @Transactional
    public boolean savePersonalInfo(PersonalInfoDTO personalInfo) {
        try {
            // Créer un nouvel étudiant avec les informations du test
            Etudiant etudiant = new Etudiant();
            etudiant.setNomTest(personalInfo.getNom());
            etudiant.setEmailTest(personalInfo.getEmail());
            etudiant.setTelephoneTest(personalInfo.getTelephone());
            etudiant.setDateTestOrientation(LocalDateTime.now());
            etudiant.setStatutTestComplete(true);
            
            // Sauvegarder l'étudiant
            etudiantRepository.save(etudiant);
            
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public PersonalInfoDTO getPersonalInfoByEmail(String email) {
        try {
            // Rechercher l'étudiant par email de test
            Optional<Etudiant> etudiantOpt = etudiantRepository.findByEmailTest(email);
            
            if (etudiantOpt.isPresent()) {
                Etudiant etudiant = etudiantOpt.get();
                return new PersonalInfoDTO(
                    etudiant.getNomTest(),
                    etudiant.getEmailTest(),
                    etudiant.getTelephoneTest()
                );
            }
            
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
