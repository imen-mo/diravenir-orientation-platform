package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.ProgramDTO;
import com.dira.diravenir1.Entities.Program;

import java.util.List;
import java.util.Map;
import com.dira.diravenir1.dto.PaginatedProgramsResponse;

public interface ProgramService {
    ProgramDTO saveProgram(ProgramDTO programDTO);
    List<ProgramDTO> getAllPrograms();
    ProgramDTO getProgramById(Long id);
    void deleteProgram(Long id);
    ProgramDTO updateProgram(Long id, ProgramDTO programDTO);
    
    // Méthodes de recherche
    List<ProgramDTO> getProgramsByStatus(Program.ProgramStatus status);
    List<ProgramDTO> searchPrograms(String searchTerm);
    List<ProgramDTO> getProgramsByFilters(String program, String universities, Program.ProgramStatus status);
    List<ProgramDTO> getProgramsByDestination(Long destinationId);
    List<ProgramDTO> getProgramsByUniversity(Long universityId);
    
    // Nouvelles méthodes de filtrage avancé
    List<ProgramDTO> getProgramsByAdvancedFilters(String searchTerm, String country, String category, 
                                                 Program.ProgramStatus status, String sortBy, int page, int size);
    PaginatedProgramsResponse getProgramsByAdvancedFiltersPaginated(String searchTerm, String country, String category, 
                                                                   Program.ProgramStatus status, String sortBy, int page, int size);
    
    // Méthode pour obtenir le total des programmes filtrés (pour la pagination)
    long getTotalFilteredPrograms(String searchTerm, String country, String category, Program.ProgramStatus status);
    
    Map<String, List<String>> getAvailableFilters();
} 