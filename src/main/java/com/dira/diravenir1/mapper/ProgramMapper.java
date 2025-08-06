package com.dira.diravenir1.mapper;

import com.dira.diravenir1.dto.ProgramDTO;
import com.dira.diravenir1.Entities.Program;
import org.springframework.stereotype.Component;

@Component
public class ProgramMapper {
    
    public ProgramDTO toDTO(Program program) {
        ProgramDTO dto = new ProgramDTO();
        dto.setId(program.getId());
        dto.setMajorName(program.getMajorName());
        dto.setUniversityName(program.getUniversityName());
        dto.setDescription(program.getDescription());
        dto.setDegreeType(program.getDegreeType());
        dto.setLocation(program.getLocation());
        dto.setCampusCity(program.getCampusCity());
        dto.setDuration(program.getDuration());
        dto.setLanguage(program.getLanguage());
        dto.setUniversityRanking(program.getUniversityRanking());
        dto.setProgramRanking(program.getProgramRanking());
        dto.setScholarshipAvailable(program.getScholarshipAvailable());
        dto.setTuitionFees(program.getTuitionFees());
        dto.setApplyBefore(program.getApplyBefore());
        dto.setStatus(program.getStatus());
        dto.setProgramImage(program.getProgramImage());
        
        // Relations
        if (program.getDestination() != null) {
            dto.setDestinationId(program.getDestination().getId());
            dto.setDestinationName(program.getDestination().getNom());
        }
        if (program.getUniversite() != null) {
            dto.setUniversiteId(program.getUniversite().getId());
            dto.setUniversityName(program.getUniversite().getNom());
        }
        if (program.getUniversite() != null) {
            dto.setUniversiteId(program.getUniversite().getId());
            dto.setUniversiteName(program.getUniversite().getNom());
        }
        
        return dto;
    }
    
    public Program toEntity(ProgramDTO dto) {
        Program program = new Program();
        program.setId(dto.getId());
        program.setMajorName(dto.getMajorName());
        program.setUniversityName(dto.getUniversityName());
        program.setDescription(dto.getDescription());
        program.setDegreeType(dto.getDegreeType());
        program.setLocation(dto.getLocation());
        program.setCampusCity(dto.getCampusCity());
        program.setDuration(dto.getDuration());
        program.setLanguage(dto.getLanguage());
        program.setUniversityRanking(dto.getUniversityRanking());
        program.setProgramRanking(dto.getProgramRanking());
        program.setScholarshipAvailable(dto.getScholarshipAvailable());
        program.setTuitionFees(dto.getTuitionFees());
        program.setApplyBefore(dto.getApplyBefore());
        program.setStatus(dto.getStatus());
        program.setProgramImage(dto.getProgramImage());
        
        return program;
    }
} 