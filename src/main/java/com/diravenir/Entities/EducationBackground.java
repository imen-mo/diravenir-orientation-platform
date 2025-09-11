package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "education_background")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EducationBackground {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;
    
    @Column(nullable = false)
    private String school;
    
    @Column
    private String major;
    
    @Column(nullable = false)
    private LocalDate startedDate;
    
    @Column(nullable = false)
    private LocalDate finishedDate;
    
    @Column
    private String grade;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
