package com.dira.diravenir1.dto;

import com.dira.diravenir1.Entities.Program;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProgramDTO {
    private Long id;
    private String majorName;
    private String universityName;
    private String description;
    private String degreeType;
    private String location;
    private String campusCity;
    private Integer duration;
    private String language;
    private String universityRanking;
    private String programRanking;
    private Boolean scholarshipAvailable;
    private BigDecimal tuitionFees;
    private String applyBefore;
    private Program.ProgramStatus status;
    private String programImage;
    
    // IDs des relations
    private Long destinationId;
    private Long universiteId;
    
    // Informations des relations (optionnel)
    private String destinationName;
    private String universiteName;
} 