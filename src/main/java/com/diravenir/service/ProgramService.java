package com.diravenir.service;

import com.diravenir.dto.ProgramDTO;
import com.diravenir.Entities.Program;

import java.util.List;
import java.util.Map;
import com.diravenir.dto.PaginatedProgramsResponse;
import com.diravenir.dto.ProgramDetailDTO;

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
    
    // Nouvelle méthode pour récupérer les détails complets d'un programme
    ProgramDetailDTO getProgramDetailById(Long id);
    
    // ===== NOUVELLES MÉTHODES POUR PROGRAMMES SIMILAIRES =====
    
    /**
     * Trouver les programmes similaires (même nom) dans d'autres universités
     */
    List<ProgramDTO> findSimilarPrograms(String programName, Long currentProgramId);
    
    /**
     * Trouver les programmes dans la même catégorie
     */
    List<ProgramDTO> findProgramsByCategory(String category, Long currentProgramId);
    
    /**
     * Trouver les programmes similaires avec fallback intelligent
     */
    List<ProgramDTO> findSimilarProgramsWithFallback(String programName, String category, Long currentProgramId);
} 
