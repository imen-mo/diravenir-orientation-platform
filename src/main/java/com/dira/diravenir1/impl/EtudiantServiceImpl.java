package com.dira.diravenir1.impl;

import com.dira.diravenir1.dto.EtudiantDTO;
import com.dira.diravenir1.Entities.Candidature;
import com.dira.diravenir1.Entities.Etudiant;
import com.dira.diravenir1.Repository.EtudiantRepository;
import com.dira.diravenir1.service.EtudiantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EtudiantServiceImpl implements EtudiantService {

    private final EtudiantRepository etudiantRepository;

    @Override
    public EtudiantDTO createEtudiant(EtudiantDTO dto) {
        Etudiant etudiant = fromDTO(dto);
        return toDTO(etudiantRepository.save(etudiant));
    }

    @Override
    public EtudiantDTO updateEtudiant(Long id, EtudiantDTO dto) {
        Optional<Etudiant> optionalEtudiant = etudiantRepository.findById(id);
        if (optionalEtudiant.isPresent()) {
            Etudiant etudiant = fromDTO(dto);
            etudiant.setId(id);
            return toDTO(etudiantRepository.save(etudiant));
        }
        return null;
    }

    @Override
    public void deleteEtudiant(Long id) {
        etudiantRepository.deleteById(id);
    }

    @Override
    public EtudiantDTO getEtudiantById(Long id) {
        return etudiantRepository.findById(id).map(this::toDTO).orElse(null);
    }

    @Override
    public List<EtudiantDTO> getAllEtudiants() {
        return etudiantRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    private EtudiantDTO toDTO(Etudiant e) {
        EtudiantDTO dto = new EtudiantDTO();
        dto.setId(e.getId());
        dto.setNom(e.getNom());
        dto.setPrenom(e.getPrenom());
        dto.setDateNaissance(e.getDateNaissance());
        dto.setEmail(e.getEmail());
        dto.setTelephone(e.getTelephone());
        dto.setLanguePreferee(e.getLanguePreferee());
        dto.setNiveauEtude(e.getNiveauEtude());
        dto.setDomaine(e.getDomaine());
        dto.setVille(e.getVille());
        dto.setCandidaturesIds(e.getCandidatures().stream().map(Candidature::getId).collect(Collectors.toList()));
        return dto;
    }

    private Etudiant fromDTO(EtudiantDTO dto) {
        Etudiant e = new Etudiant();
        e.setId(dto.getId());
        e.setNom(dto.getNom());
        e.setPrenom(dto.getPrenom());
        e.setDateNaissance(dto.getDateNaissance());
        e.setEmail(dto.getEmail());
        e.setTelephone(dto.getTelephone());
        e.setLanguePreferee(dto.getLanguePreferee());
        e.setNiveauEtude(dto.getNiveauEtude());
        e.setDomaine(dto.getDomaine());
        e.setVille(dto.getVille());
        return e;
    }
}
