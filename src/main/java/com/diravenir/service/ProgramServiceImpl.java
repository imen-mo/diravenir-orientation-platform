package com.diravenir.service;

import com.diravenir.dto.ProgramDTO;
import com.diravenir.dto.ProgramDetailDTO;
import com.diravenir.dto.PaginatedProgramsResponse;
import com.diravenir.Entities.Program;
import com.diravenir.repository.ProgramRepository;
import com.diravenir.mapper.ProgramMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

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
        List<Program> programs = programRepository.findAll();
        return programs.stream()
                .map(programMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProgramDTO getProgramById(Long id) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found with id: " + id));
        return programMapper.toDTO(program);
    }

    @Override
    public void deleteProgram(Long id) {
        if (!programRepository.existsById(id)) {
            throw new RuntimeException("Program not found with id: " + id);
        }
        programRepository.deleteById(id);
    }

    @Override
    public ProgramDTO updateProgram(Long id, ProgramDTO programDTO) {
        Program existingProgram = programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found with id: " + id));
        
        // Mettre à jour les champs
        existingProgram.setCampusCity(programDTO.getCampusCity());
        existingProgram.setUniversities(programDTO.getUniversities());
        existingProgram.setUniversityRanking(programDTO.getUniversityRanking());
        existingProgram.setApplyBefore(programDTO.getApplyBefore());
        existingProgram.setCategory(programDTO.getCategory());
        existingProgram.setProgram(programDTO.getProgram());
        existingProgram.setDegreeType(programDTO.getDegreeType());
        existingProgram.setTuitionFees(programDTO.getTuitionFees());
        existingProgram.setDuration(programDTO.getDuration());
        existingProgram.setLanguage(programDTO.getLanguage());
        existingProgram.setScholarship(programDTO.getScholarship());
        existingProgram.setDescription(programDTO.getDescription());
        existingProgram.setAboutThisProgram(programDTO.getAboutThisProgram());
        existingProgram.setWhyThisProgram(programDTO.getWhyThisProgram());
        existingProgram.setAboutTheUniversity(programDTO.getAboutTheUniversity());
        existingProgram.setStatus(programDTO.getStatus());
        existingProgram.setProgramImage(programDTO.getProgramImage());
        
        Program updatedProgram = programRepository.save(existingProgram);
        return programMapper.toDTO(updatedProgram);
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
        Pageable pageable = createPageable(page, size, sortBy);
        Page<Program> programsPage = programRepository.findByAdvancedFiltersWithPagination(
            searchTerm, country, category, status, pageable);
        return programsPage.getContent().stream()
                .map(programMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public PaginatedProgramsResponse getProgramsByAdvancedFiltersPaginated(String searchTerm, String country, String category, 
                                                                           Program.ProgramStatus status, String sortBy, int page, int size) {
        Pageable pageable = createPageable(page, size, sortBy);
        Page<Program> programsPage = programRepository.findByAdvancedFiltersWithPagination(
            searchTerm, country, category, status, pageable);
        
        List<ProgramDTO> programs = programsPage.getContent().stream()
                .map(programMapper::toDTO)
                .collect(Collectors.toList());
        
        return new PaginatedProgramsResponse(
                programs,
                page,
                programsPage.getTotalPages(),
                programsPage.getTotalElements(),
                size
        );
    }

    @Override
    public long getTotalFilteredPrograms(String searchTerm, String country, String category, Program.ProgramStatus status) {
        return programRepository.countByAdvancedFilters(searchTerm, country, category, status);
    }

    @Override
    public Map<String, List<String>> getAvailableFilters() {
        Map<String, List<String>> filters = new HashMap<>();
        
        // Récupérer les pays disponibles
        List<String> countries = programRepository.findDistinctCountries();
        filters.put("countries", countries);
        
        // Récupérer les catégories disponibles
        List<String> categories = programRepository.findDistinctCategories();
        filters.put("categories", categories);
        
        return filters;
    }

    // Méthode privée pour trouver les programmes similaires pour ProgramDetailDTO
    private List<ProgramDetailDTO.SimilarProgramDTO> findSimilarProgramsForDetail(String programName, Long currentProgramId) {
        List<Program> programs = programRepository.findByProgramContainingIgnoreCase(programName);
        return programs.stream()
                .filter(p -> !p.getId().equals(currentProgramId))
                .limit(6) // Limiter à 6 programmes similaires
                .map(this::convertToSimilarProgramDTO)
                .collect(Collectors.toList());
    }

    // Méthode privée pour convertir Program en SimilarProgramDTO
    private ProgramDetailDTO.SimilarProgramDTO convertToSimilarProgramDTO(Program program) {
        String country = null;
        if (program.getDestination() != null) {
            country = program.getDestination().getPays();
        }
        
        String universityLogo = null;
        if (program.getUniversite() != null) {
            universityLogo = program.getUniversite().getLogoUrl();
        }
        
        return new ProgramDetailDTO.SimilarProgramDTO(
                program.getId(),
                program.getUniversities(),
                universityLogo,
                country,
                program.getCampusCity(),
                program.getTuitionFees(),
                program.getDuration() != null ? program.getDuration().toString() : null,
                program.getUniversityRanking(),
                program.getScholarship(),
                program.getApplyBefore()
        );
    }

    @Override
    public ProgramDetailDTO getProgramDetailById(Long id) {
        Program program = programRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Program not found with id: " + id));
        
        // Récupérer le logo de l'université depuis la relation
        String universityLogo = null;
        if (program.getUniversite() != null) {
            universityLogo = program.getUniversite().getLogoUrl();
        }
        
        // Récupérer les informations de destination
        String country = null;
        String destinationName = null;
        if (program.getDestination() != null) {
            country = program.getDestination().getPays();
            destinationName = program.getDestination().getNom();
        }
        
        // Récupérer les programmes similaires
        List<ProgramDetailDTO.SimilarProgramDTO> similarPrograms = findSimilarProgramsForDetail(program.getProgram(), id);
        
        return new ProgramDetailDTO(
                program.getId(),
                program.getProgram(),
                program.getUniversities(),
                universityLogo,
                program.getDegreeType(),
                program.getApplyBefore(),
                program.getTuitionFees(),
                program.getCampusCity(),
                program.getCampusCity(),
                program.getDuration(),
                program.getLanguage(),
                program.getUniversityRanking(),
                null, // programRanking - pas encore implémenté
                program.getScholarship(),
                program.getDescription(),
                program.getAboutTheUniversity(),
                program.getAboutThisProgram(),
                program.getWhyThisProgram(),
                program.getProgramImage(),
                null, // documentsNeeded - pas encore implémenté
                similarPrograms,
                country,
                destinationName
        );
    }

    @Override
    public List<ProgramDTO> findSimilarPrograms(String programName, Long currentProgramId) {
        List<Program> programs = programRepository.findByProgramContainingIgnoreCase(programName);
        return programs.stream()
                .filter(p -> !p.getId().equals(currentProgramId))
                .map(programMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProgramDTO> findProgramsByCategory(String category, Long currentProgramId) {
        List<Program> programs = programRepository.findByCategory(category);
        return programs.stream()
                .filter(p -> !p.getId().equals(currentProgramId))
                .map(programMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProgramDTO> findSimilarProgramsWithFallback(String programName, String category, Long currentProgramId) {
        List<ProgramDTO> similarPrograms = findSimilarPrograms(programName, currentProgramId);
        
        if (similarPrograms.isEmpty() && category != null) {
            similarPrograms = findProgramsByCategory(category, currentProgramId);
        }
        
        return similarPrograms;
    }

    private Pageable createPageable(int page, int size, String sortBy) {
        Sort sort = Sort.by(Sort.Direction.ASC, "program");
        if (sortBy != null && !sortBy.isEmpty()) {
            sort = Sort.by(Sort.Direction.ASC, sortBy);
        }
        return PageRequest.of(page, size, sort);
    }
}
