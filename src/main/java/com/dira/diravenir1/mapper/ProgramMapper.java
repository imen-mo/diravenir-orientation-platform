package com.dira.diravenir1.mapper;

import com.dira.diravenir1.dto.ProgramDTO;
import com.dira.diravenir1.Entities.Program;
import org.springframework.stereotype.Component;

@Component
public class ProgramMapper {
    
    public ProgramDTO toDTO(Program program) {
        ProgramDTO dto = new ProgramDTO();
        dto.setId(program.getId());
        
        // Nouvelle structure unifiée
        dto.setCampusCity(program.getCampusCity());
        dto.setUniversities(program.getUniversities());
        dto.setUniversityRanking(program.getUniversityRanking());
        dto.setApplyBefore(program.getApplyBefore());
        dto.setCategory(program.getCategory());
        dto.setProgram(program.getProgram());
        dto.setDegreeType(program.getDegreeType());
        dto.setTuitionFees(program.getTuitionFees());
        dto.setDuration(program.getDuration());
        dto.setLanguage(program.getLanguage());
        dto.setScholarship(program.getScholarship());
        dto.setDescription(program.getDescription());
        dto.setAboutThisProgram(program.getAboutThisProgram());
        dto.setWhyThisProgram(program.getWhyThisProgram());
        dto.setAboutTheUniversity(program.getAboutTheUniversity());
        
        dto.setStatus(program.getStatus());
        dto.setProgramImage(program.getProgramImage());
        
        // Relations
        if (program.getDestination() != null) {
            dto.setDestinationId(program.getDestination().getId());
            dto.setDestinationName(program.getDestination().getNom());
        }
        if (program.getUniversite() != null) {
            dto.setUniversiteId(program.getUniversite().getId());
            dto.setUniversiteName(program.getUniversite().getNom());
            // Ajouter l'objet université complet pour accéder au logo_url
            dto.setUniversite(program.getUniversite());
        }
        
        return dto;
    }
    
    public Program toEntity(ProgramDTO dto) {
        Program program = new Program();
        program.setId(dto.getId());
        
        // Nouvelle structure unifiée
        program.setCampusCity(dto.getCampusCity());
        program.setUniversities(dto.getUniversities());
        program.setUniversityRanking(dto.getUniversityRanking());
        program.setApplyBefore(dto.getApplyBefore());
        program.setCategory(dto.getCategory());
        program.setProgram(dto.getProgram());
        program.setDegreeType(dto.getDegreeType());
        program.setTuitionFees(dto.getTuitionFees());
        program.setDuration(dto.getDuration());
        program.setLanguage(dto.getLanguage());
        program.setScholarship(dto.getScholarship());
        program.setDescription(dto.getDescription());
        program.setAboutThisProgram(dto.getAboutThisProgram());
        program.setWhyThisProgram(dto.getWhyThisProgram());
        program.setAboutTheUniversity(dto.getAboutTheUniversity());
        
        program.setStatus(dto.getStatus());
        program.setProgramImage(dto.getProgramImage());
        
        return program;
    }
} 