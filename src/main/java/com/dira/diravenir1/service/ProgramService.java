package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.ProgramDTO;
import com.dira.diravenir1.Entities.Program;

import java.util.List;

public interface ProgramService {
    ProgramDTO saveProgram(ProgramDTO programDTO);
    List<ProgramDTO> getAllPrograms();
    ProgramDTO getProgramById(Long id);
    void deleteProgram(Long id);
    ProgramDTO updateProgram(Long id, ProgramDTO programDTO);
    
    // Méthodes de recherche
    List<ProgramDTO> getProgramsByStatus(Program.ProgramStatus status);
    List<ProgramDTO> searchPrograms(String searchTerm);
    List<ProgramDTO> getProgramsByFilters(String majorName, String universityName, Program.ProgramStatus status);
    List<ProgramDTO> getProgramsByDestination(Long destinationId);
    List<ProgramDTO> getProgramsByUniversity(Long universityId);
} 