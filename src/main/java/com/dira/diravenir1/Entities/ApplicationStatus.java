package com.dira.diravenir1.Entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;

@Entity
@Table(name = "application_status")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationStatus {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "status_name", nullable = false, unique = true)
    private String statusName;
    
    @Column(name = "description")
    private String description;
    
    @Column(name = "is_active")
    private Boolean isActive;
    
    @Column(name = "color_code")
    private String colorCode;
    
    @Column(name = "sort_order")
    private Integer sortOrder;
}
