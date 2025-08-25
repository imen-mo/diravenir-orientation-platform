package com.dira.diravenir1.impl;

import com.dira.diravenir1.Entities.Program;
import com.dira.diravenir1.Repository.ProgramRepository;
import com.dira.diravenir1.dto.ProgramDTO;
import com.dira.diravenir1.mapper.ProgramMapper;
import com.dira.diravenir1.service.ProgramService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Objects;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import com.dira.diravenir1.dto.PaginatedProgramsResponse;

@Service
public class ProgramServiceImpl implements ProgramService {

    @Autowired
    private ProgramRepository programRepository;

    @Autowired
    private ProgramMapper programMapper;

    @Override
    public ProgramDTO saveProgram(ProgramDTO programDTO) {
        Program program = programMapper.toEntity(programDTO);
        Program savedProgram = programRepository.save(program);
        return programMapper.toDTO(savedProgram);
    }

    @Override
    public List<ProgramDTO> getAllPrograms() {
        try {
            // Utiliser la méthode standard de JPA qui fonctionne toujours
            System.out.println("🔍 Récupération des programmes avec findAll()...");
            List<Program> programs = programRepository.findAll();
            System.out.println("✅ " + programs.size() + " programmes récupérés avec succès");
            
            List<ProgramDTO> dtos = programs.stream()
                    .map(programMapper::toDTO)
                    .collect(Collectors.toList());
            
            System.out.println("✅ " + dtos.size() + " DTOs créés avec succès");
            return dtos;
            
        } catch (Exception e) {
            System.err.println("❌ Erreur lors de la récupération des programmes: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Erreur lors de la récupération des programmes", e);
        }
    }

    @Override
    public ProgramDTO getProgramById(Long id) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Program not found with id: " + id));
        return programMapper.toDTO(program);
    }

    @Override
    public void deleteProgram(Long id) {
        if (!programRepository.existsById(id)) {
            throw new EntityNotFoundException("Program not found with id: " + id);
        }
        programRepository.deleteById(id);
    }

    @Override
    public ProgramDTO updateProgram(Long id, ProgramDTO programDTO) {
        Program existingProgram = programRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Program not found with id: " + id));
        
        programDTO.setId(id);
        Program updatedProgram = programMapper.toEntity(programDTO);
        Program savedProgram = programRepository.save(updatedProgram);
        return programMapper.toDTO(savedProgram);
    }

    @Override
    public List<ProgramDTO> getProgramsByStatus(Program.ProgramStatus status) {
        List<Program> programs = programRepository.findByStatus(status);
        return programs.stream()
                .map(programMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProgramDTO> searchPrograms(String searchTerm) {
        List<Program> programs = programRepository.searchPrograms(searchTerm);
        return programs.stream()
                .map(programMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProgramDTO> getProgramsByFilters(String program, String universities, Program.ProgramStatus status) {
        List<Program> programs = programRepository.findByFilters(program, universities, status);
        return programs.stream()
                .map(programMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProgramDTO> getProgramsByDestination(Long destinationId) {
        List<Program> programs = programRepository.findByDestinationId(destinationId);
        return programs.stream()
                .map(programMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProgramDTO> getProgramsByUniversity(Long universityId) {
        List<Program> programs = programRepository.findByUniversiteId(universityId);
        return programs.stream()
                .map(programMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProgramDTO> getProgramsByAdvancedFilters(String searchTerm, String country, String category, 
                                                        Program.ProgramStatus status, String sortBy, int page, int size) {
            List<Program> programs = programRepository.findByAdvancedFilters(searchTerm, country, category, status);
        return programs.stream()
                .map(programMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PaginatedProgramsResponse getProgramsByAdvancedFiltersPaginated(String searchTerm, String country, String category, 
                                                                         Program.ProgramStatus status, String sortBy, int page, int size) {
        // Créer le tri global
        Sort sort = createSort(sortBy);
        
        // Créer la pagination avec le tri global
        Pageable pageable = PageRequest.of(page, size, sort);
        
        // Appeler le repository avec pagination ET tri global
        Page<Program> programPage = programRepository.findByAdvancedFiltersWithPagination(
            searchTerm, country, category, status, pageable);
        
        // Convertir en DTOs (le tri est déjà appliqué par Spring Data)
        List<ProgramDTO> programDTOs = programPage.getContent().stream()
                .map(programMapper::toDTO)
                .collect(Collectors.toList());
        
        // Créer la réponse paginée
        return new PaginatedProgramsResponse(
            programDTOs,
            page + 1, // Spring Data utilise 0-based indexing
            programPage.getTotalPages(),
            programPage.getTotalElements(),
            size
        );
    }
    
    private Sort createSort(String sortBy) {
        switch (sortBy) {
            case "name":
                return Sort.by(Sort.Direction.ASC, "program")
                        .and(Sort.by(Sort.Direction.ASC, "universities")); // Tri secondaire
            case "university":
                return Sort.by(Sort.Direction.ASC, "universities")
                        .and(Sort.by(Sort.Direction.ASC, "program")); // Tri secondaire
            case "category":
                return Sort.by(Sort.Direction.ASC, "category")
                        .and(Sort.by(Sort.Direction.ASC, "program")); // Tri secondaire
            case "country":
                return Sort.by(Sort.Direction.ASC, "destination.nom")
                        .and(Sort.by(Sort.Direction.ASC, "program")); // Tri secondaire
            case "fees":
                // Pour les frais, on trie d'abord par type de frais, puis par programme
                return Sort.by(Sort.Direction.ASC, "tuitionFees")
                        .and(Sort.by(Sort.Direction.ASC, "program"));
            case "popular":
            default:
                // Tri par popularité (ID décroissant) puis par nom pour la cohérence
                return Sort.by(Sort.Direction.DESC, "id")
                        .and(Sort.by(Sort.Direction.ASC, "program"));
        }
    }

    @Override
    public long getTotalFilteredPrograms(String searchTerm, String country, String category, Program.ProgramStatus status) {
        return programRepository.countByAdvancedFilters(searchTerm, country, category, status);
    }

    @Override
    public Map<String, List<String>> getAvailableFilters() {
        Map<String, List<String>> filters = new HashMap<>();
        
        // Récupérer tous les pays disponibles
        List<String> countries = programRepository.findAll().stream()
                .map(p -> p.getDestination() != null ? p.getDestination().getNom() : null)
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.toList());
        
        // Récupérer toutes les catégories disponibles
        List<String> categories = programRepository.findAll().stream()
                .map(Program::getCategory)
                .filter(Objects::nonNull)
                .distinct()
                .collect(Collectors.toList());
        
        filters.put("countries", countries);
        filters.put("categories", categories);
        
        return filters;
    }
} 