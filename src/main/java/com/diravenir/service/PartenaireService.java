
package com.diravenir.service;

import com.diravenir.dto.PartenaireDTO;
import com.diravenir.Entities.Partenaire;
import com.diravenir.repository.PartenaireRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PartenaireService {

    private final PartenaireRepository partenaireRepository;

    public PartenaireDTO createPartenaire(PartenaireDTO dto) {
        Partenaire partenaire = Partenaire.builder()
                .nom(dto.getNom())
                .description(dto.getDescription())
                .type(dto.getType())
                .pays(dto.getPays())
                .ville(dto.getVille())
                .siteWeb(dto.getSiteWeb())
                .email(dto.getEmail())
                .telephone(dto.getTelephone())
                .logoUrl(dto.getLogoUrl())
                .actif(dto.getActif() != null ? dto.getActif() : true)
                .datePartenariat(dto.getDatePartenariat())
                .specialites(dto.getSpecialites())
                .nombreEtudiants(dto.getNombreEtudiants() != null ? dto.getNombreEtudiants() : 0)
                .build();

        Partenaire savedPartenaire = partenaireRepository.save(partenaire);
        return convertToDTO(savedPartenaire);
    }

    public List<PartenaireDTO> getAllPartenaires() {
        return partenaireRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PartenaireDTO> getActivePartenaires() {
        return partenaireRepository.findByActifTrue()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PartenaireDTO getPartenaireById(Long id) {
        Partenaire partenaire = partenaireRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partenaire non trouvé avec l'ID: " + id));
        return convertToDTO(partenaire);
    }

    public PartenaireDTO updatePartenaire(Long id, PartenaireDTO dto) {
        Partenaire partenaire = partenaireRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Partenaire non trouvé avec l'ID: " + id));

        partenaire.setNom(dto.getNom());
        partenaire.setDescription(dto.getDescription());
        partenaire.setType(dto.getType());
        partenaire.setPays(dto.getPays());
        partenaire.setVille(dto.getVille());
        partenaire.setSiteWeb(dto.getSiteWeb());
        partenaire.setEmail(dto.getEmail());
        partenaire.setTelephone(dto.getTelephone());
        partenaire.setLogoUrl(dto.getLogoUrl());
        partenaire.setActif(dto.getActif());
        partenaire.setDatePartenariat(dto.getDatePartenariat());
        partenaire.setSpecialites(dto.getSpecialites());
        partenaire.setNombreEtudiants(dto.getNombreEtudiants());

        Partenaire updatedPartenaire = partenaireRepository.save(partenaire);
        return convertToDTO(updatedPartenaire);
    }

    public void deletePartenaire(Long id) {
        if (!partenaireRepository.existsById(id)) {
            throw new RuntimeException("Partenaire non trouvé avec l'ID: " + id);
        }
        partenaireRepository.deleteById(id);
    }

    public List<PartenaireDTO> getPartenairesByPays(String pays) {
        return partenaireRepository.findByPaysContainingIgnoreCase(pays)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PartenaireDTO> getPartenairesByType(String type) {
        return partenaireRepository.findByTypeContainingIgnoreCase(type)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PartenaireDTO> searchPartenaires(String keyword) {
        return partenaireRepository.findByNomContainingIgnoreCaseOrDescriptionContainingIgnoreCase(keyword, keyword)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Conversion Entity -> DTO
    private PartenaireDTO convertToDTO(Partenaire partenaire) {
        return PartenaireDTO.builder()
                .id(partenaire.getId())
                .nom(partenaire.getNom())
                .description(partenaire.getDescription())
                .type(partenaire.getType())
                .pays(partenaire.getPays())
                .ville(partenaire.getVille())
                .siteWeb(partenaire.getSiteWeb())
                .email(partenaire.getEmail())
                .telephone(partenaire.getTelephone())
                .logoUrl(partenaire.getLogoUrl())
                .actif(partenaire.getActif())
                .datePartenariat(partenaire.getDatePartenariat())
                .specialites(partenaire.getSpecialites())
                .nombreEtudiants(partenaire.getNombreEtudiants())
                .build();
    }
}
