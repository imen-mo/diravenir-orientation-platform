package com.diravenir.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProgramDetailDTO {
    
    // Informations du programme principal
    private Long id;
    private String title;
    private String university;
    private String universityLogo;
    private String degreeType;
    private String applyBefore;
    private String tuitionFees;
    private String location;
    private String campusCity;
    private Integer duration;
    private String language;
    private String universityRanking;
    private String programRanking;
    private String scholarship;
    private String description;
    private String universityAbout;
    private String aboutThisProgram;
    private String whyThisProgram;
    private String programImage;
    
    // Documents requis
    private List<String> documentsNeeded;
    
    // Autres universités qui proposent le même programme
    private List<SimilarProgramDTO> similarPrograms;
    
    // Informations de destination
    private String country;
    private String destinationName;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SimilarProgramDTO {
        private Long id;
        private String universityName;
        private String universityLogo;
        private String country;
        private String city;
        private String tuitionFees;
        private String duration;
        private String ranking;
        private String scholarship;
        private String applyBefore;
    }
}
