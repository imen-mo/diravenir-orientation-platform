package com.diravenir.mapper;

import com.diravenir.dto.ProgramDTO;
import com.diravenir.Entities.Program;
import org.springframework.stereotype.Component;

@Component
public class ProgramMapper {
    
    public ProgramDTO toDTO(Program program) {
        ProgramDTO dto = new ProgramDTO();
        dto.setId(program.getId());
        
        // Nouvelle structure unifiée
        dto.setCampusCity(program.getCampusCity());
        
        // Utiliser le nom propre de l'université au lieu de la description
        if (program.getUniversite() != null) {
            dto.setUniversities(program.getUniversite().getNom());           // Nom en français
            dto.setUniversitiesEn(program.getUniversite().getNomEn());      // Nom en anglais
        } else {
            // Fallback vers le champ universities si pas de relation
            dto.setUniversities(program.getUniversities());
            dto.setUniversitiesEn(program.getUniversities()); // Même valeur en fallback
        }
        
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
            // Mapper les champs spécifiques au lieu de l'entité complète
            dto.setUniversiteNameEn(program.getUniversite().getNomEn());
            dto.setUniversiteLogoUrl(program.getUniversite().getLogoUrl());
            dto.setUniversiteDescription(program.getUniversite().getDescription());
            dto.setUniversiteRanking(program.getUniversite().getRanking());
            dto.setUniversiteType(program.getUniversite().getType());
            dto.setUniversiteCountry(program.getUniversite().getPays());
            dto.setUniversiteCity(program.getUniversite().getVille());
        }
        
        return dto;
    }
    
    public Program toEntity(ProgramDTO dto) {
        Program program = new Program();
        program.setId(dto.getId());
        
        // Nouvelle structure unifiée
        program.setCampusCity(dto.getCampusCity());
        program.setUniversities(dto.getUniversities());
        // Note: universitiesEn n'est pas mappé vers l'entité car c'est un champ calculé
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
