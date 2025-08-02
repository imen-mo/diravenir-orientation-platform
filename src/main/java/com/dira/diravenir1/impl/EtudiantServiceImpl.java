package com.dira.diravenir1.impl;

import com.dira.diravenir1.Entities.Administrateur;
import com.dira.diravenir1.Entities.Etudiant;
import com.dira.diravenir1.Repository.AdministrateurRepository;
import com.dira.diravenir1.Repository.EtudiantRepository;
import com.dira.diravenir1.dto.EtudiantDTO;
import com.dira.diravenir1.service.EtudiantService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EtudiantServiceImpl implements EtudiantService {

    private final EtudiantRepository etudiantRepository;
    private final AdministrateurRepository administrateurRepository;

    private EtudiantDTO toDto(Etudiant e) {
        EtudiantDTO dto = new EtudiantDTO();
        dto.setId(e.getId());
        dto.setNiveauEtude(e.getNiveauEtude());
        dto.setSpecialite(e.getSpecialite());
        dto.setPays(e.getPays());
        dto.setVille(e.getVille());
        dto.setAdresse(e.getAdresse());
        dto.setSituation(e.getSituation());
        dto.setNationalite(e.getNationalite());
        dto.setGenre(e.getGenre());
        dto.setEtablissement(e.getEtablissement());
        dto.setAnneeEtude(e.getAnneeEtude());
        dto.setDomaine(e.getDomaine());
        dto.setHistoriqueRecherche(e.getHistoriqueRecherche());
        if (e.getAdministrateur() != null) {
            dto.setAdministrateurId(e.getAdministrateur().getId());
        }
        return dto;
    }

    private Etudiant fromDto(EtudiantDTO dto) {
        Etudiant e = new Etudiant();
        e.setId(dto.getId());
        e.setNiveauEtude(dto.getNiveauEtude());
        e.setSpecialite(dto.getSpecialite());
        e.setPays(dto.getPays());
        e.setVille(dto.getVille());
        e.setAdresse(dto.getAdresse());
        e.setSituation(dto.getSituation());
        e.setNationalite(dto.getNationalite());
        e.setGenre(dto.getGenre());
        e.setEtablissement(dto.getEtablissement());
        e.setAnneeEtude(dto.getAnneeEtude());
        e.setDomaine(dto.getDomaine());
        e.setHistoriqueRecherche(dto.getHistoriqueRecherche());
        if (dto.getAdministrateurId() != null) {
            Administrateur admin = administrateurRepository.findById(dto.getAdministrateurId())
                    .orElse(null);
            e.setAdministrateur(admin);
        }
        return e;
    }

    @Override
    public EtudiantDTO createEtudiant(EtudiantDTO dto) {
        Etudiant e = fromDto(dto);
        return toDto(etudiantRepository.save(e));
    }

    @Override
    public List<EtudiantDTO> getAllEtudiants() {
        return etudiantRepository.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public EtudiantDTO getEtudiantById(Long id) {
        return etudiantRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new RuntimeException("Etudiant non trouvÃ©"));
    }

    @Override
    @Transactional
    public EtudiantDTO updateEtudiant(Long id, EtudiantDTO dto) {
        Etudiant existingEtudiant = etudiantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Etudiant non trouvÃ©"));

        // Met Ã  jour les champs simples
        existingEtudiant.setNiveauEtude(dto.getNiveauEtude());
        existingEtudiant.setSpecialite(dto.getSpecialite());
        existingEtudiant.setPays(dto.getPays());
        existingEtudiant.setVille(dto.getVille());
        existingEtudiant.setAdresse(dto.getAdresse());
        existingEtudiant.setSituation(dto.getSituation());
        existingEtudiant.setNationalite(dto.getNationalite());
        existingEtudiant.setGenre(dto.getGenre());
        existingEtudiant.setEtablissement(dto.getEtablissement());
        existingEtudiant.setAnneeEtude(dto.getAnneeEtude());
        existingEtudiant.setDomaine(dto.getDomaine());
        existingEtudiant.setHistoriqueRecherche(dto.getHistoriqueRecherche());

        // Mise Ã  jour de lâ€™administrateur si prÃ©sent
        if (dto.getAdministrateurId() != null) {
            Administrateur admin = administrateurRepository.findById(dto.getAdministrateurId())
                    .orElse(null);
            existingEtudiant.setAdministrateur(admin);
        } else {
            existingEtudiant.setAdministrateur(null);
        }

        // Mise Ã  jour des candidatures â€”
        // Attention : ici on suppose que DTO ne contient pas la liste des candidatures,
        // sinon il faudrait gÃ©rer la collection de candidatures explicitement
        // (Ã  adapter si tu as un DTO avec candidatures)
        // Sinon ne rien faire sur candidatures ici

        // Sauvegarde et retourne le DTO mis Ã  jour
        return toDto(etudiantRepository.save(existingEtudiant));
    }

    @Override
    public void deleteEtudiant(Long id) {
        etudiantRepository.deleteById(id);
    }
}


