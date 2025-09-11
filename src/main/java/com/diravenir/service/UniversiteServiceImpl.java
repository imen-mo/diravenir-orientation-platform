package com.diravenir.service;

import com.diravenir.dto.UniversiteDTO;
import com.diravenir.Entities.Universite;
import com.diravenir.repository.UniversiteRepository;
import com.diravenir.mapper.UniversiteMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UniversiteServiceImpl implements UniversiteService {

    @Autowired
    private UniversiteRepository universiteRepository;

    @Autowired
    private UniversiteMapper universiteMapper;

    @Override
    public UniversiteDTO createUniversite(UniversiteDTO dto) {
        Universite universite = universiteMapper.toEntity(dto);
        Universite savedUniversite = universiteRepository.save(universite);
        return universiteMapper.toDTO(savedUniversite);
    }

    @Override
    public List<UniversiteDTO> getAllUniversites() {
        List<Universite> universites = universiteRepository.findAll();
        return universites.stream()
                .map(universiteMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UniversiteDTO getUniversiteById(Long id) {
        Universite universite = universiteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Université non trouvée avec l'id: " + id));
        return universiteMapper.toDTO(universite);
    }

    @Override
    public void deleteUniversite(Long id) {
        if (!universiteRepository.existsById(id)) {
            throw new RuntimeException("Université non trouvée avec l'id: " + id);
        }
        universiteRepository.deleteById(id);
    }
}
