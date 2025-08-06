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
    public List<ProgramDTO> getProgramsByFilters(String majorName, String universityName, Program.ProgramStatus status) {
        List<Program> programs = programRepository.findByFilters(majorName, universityName, status);
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
} 