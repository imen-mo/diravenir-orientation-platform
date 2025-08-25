package com.dira.diravenir1.entity;

import com.dira.diravenir1.Entities.Program;
import jakarta.persistence.*;

@Entity
@Table(name = "ideal_profiles")
public class IdealProfile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
@JoinColumn(name = "program_id", nullable = true)
private Program program;

    @Column(name = "pillar_name", nullable = false)
    private String pillarName;
    
    @Column(name = "ideal_score", nullable = false)
    private Integer idealScore;
    
    // Constructeurs
    public IdealProfile() {}
    
    public IdealProfile(Program program, String pillarName, Integer idealScore) {
        this.program = program;
        this.pillarName = pillarName;
        this.idealScore = idealScore;
    }
    
    // Getters et Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Program getProgram() { return program; }
    public void setProgram(Program program) { this.program = program; }
    
    public String getPillarName() { return pillarName; }
    public void setPillarName(String pillarName) { this.pillarName = pillarName; }
    
    public Integer getIdealScore() { return idealScore; }
    public void setIdealScore(Integer idealScore) { this.idealScore = idealScore; }
}
