package com.diravenir.service;

import com.diravenir.dto.EtudiantDTO;
import com.diravenir.Entities.Etudiant;
import com.diravenir.repository.EtudiantRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class EtudiantServiceImpl implements EtudiantService {

    private final EtudiantRepository etudiantRepository;

    @Override
    public EtudiantDTO createEtudiant(EtudiantDTO dto) {
        log.info("Creating new student: {}", dto.getEmail());
        
        Etudiant etudiant = new Etudiant();
        etudiant.setNom(dto.getNom());
        etudiant.setPrenom(dto.getPrenom());
        etudiant.setEmail(dto.getEmail());
        etudiant.setTelephone(dto.getTelephone());
        etudiant.setDateNaissance(dto.getDateNaissance());
        etudiant.setLanguePreferee(dto.getLanguePreferee());
        etudiant.setPhotoProfil(dto.getPhotoProfil());
        etudiant.setNiveauEtude(dto.getNiveauEtude());
        etudiant.setSpecialite(dto.getSpecialite());
        etudiant.setPays(dto.getPays());
        etudiant.setVille(dto.getVille());
        etudiant.setAdresse(dto.getAdresse());
        etudiant.setSituation(dto.getSituation());
        etudiant.setNationalite(dto.getNationalite());
        etudiant.setGenre(dto.getGenre());
        etudiant.setEtablissement(dto.getEtablissement());
        etudiant.setAnneeEtude(dto.getAnneeEtude());
        etudiant.setDomaine(dto.getDomaine());
        
        etudiant = etudiantRepository.save(etudiant);
        log.info("Student created successfully with ID: {}", etudiant.getId());
        
        return convertToDTO(etudiant);
    }

    @Override
    public EtudiantDTO updateEtudiant(Long id, EtudiantDTO dto) {
        log.info("Updating student with ID: {}", id);
        
        Etudiant etudiant = etudiantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));
        
        etudiant.setNom(dto.getNom());
        etudiant.setPrenom(dto.getPrenom());
        etudiant.setEmail(dto.getEmail());
        etudiant.setTelephone(dto.getTelephone());
        etudiant.setDateNaissance(dto.getDateNaissance());
        etudiant.setLanguePreferee(dto.getLanguePreferee());
        etudiant.setPhotoProfil(dto.getPhotoProfil());
        etudiant.setNiveauEtude(dto.getNiveauEtude());
        etudiant.setSpecialite(dto.getSpecialite());
        etudiant.setPays(dto.getPays());
        etudiant.setVille(dto.getVille());
        etudiant.setAdresse(dto.getAdresse());
        etudiant.setSituation(dto.getSituation());
        etudiant.setNationalite(dto.getNationalite());
        etudiant.setGenre(dto.getGenre());
        etudiant.setEtablissement(dto.getEtablissement());
        etudiant.setAnneeEtude(dto.getAnneeEtude());
        etudiant.setDomaine(dto.getDomaine());
        
        etudiant = etudiantRepository.save(etudiant);
        log.info("Student updated successfully");
        
        return convertToDTO(etudiant);
    }

    @Override
    public void deleteEtudiant(Long id) {
        log.info("Deleting student with ID: {}", id);
        
        if (!etudiantRepository.existsById(id)) {
            throw new RuntimeException("Student not found with ID: " + id);
        }
        
        etudiantRepository.deleteById(id);
        log.info("Student deleted successfully");
    }

    @Override
    @Transactional(readOnly = true)
    public EtudiantDTO getEtudiantById(Long id) {
        log.info("Fetching student with ID: {}", id);
        
        Etudiant etudiant = etudiantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));
        
        return convertToDTO(etudiant);
    }

    @Override
    @Transactional(readOnly = true)
    public List<EtudiantDTO> getAllEtudiants() {
        log.info("Fetching all students");
        
        List<Etudiant> etudiants = etudiantRepository.findAll();
        
        return etudiants.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private EtudiantDTO convertToDTO(Etudiant etudiant) {
        return EtudiantDTO.builder()
                .id(etudiant.getId())
                .nom(etudiant.getNom())
                .prenom(etudiant.getPrenom())
                .email(etudiant.getEmail())
                .telephone(etudiant.getTelephone())
                .dateNaissance(etudiant.getDateNaissance())
                .languePreferee(etudiant.getLanguePreferee())
                .photoProfil(etudiant.getPhotoProfil())
                .dateCreation(etudiant.getDateCreation())
                .derniereConnexion(etudiant.getDerniereConnexion())
                .compteActif(etudiant.isCompteActif())
                .niveauEtude(etudiant.getNiveauEtude())
                .specialite(etudiant.getSpecialite())
                .pays(etudiant.getPays())
                .ville(etudiant.getVille())
                .adresse(etudiant.getAdresse())
                .situation(etudiant.getSituation())
                .nationalite(etudiant.getNationalite())
                .genre(etudiant.getGenre())
                .etablissement(etudiant.getEtablissement())
                .anneeEtude(etudiant.getAnneeEtude())
                .domaine(etudiant.getDomaine())
                .build();
    }
}
