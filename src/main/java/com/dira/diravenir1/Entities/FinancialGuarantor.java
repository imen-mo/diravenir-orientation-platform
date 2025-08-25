package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "financial_guarantor")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinancialGuarantor {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GuarantorRelationship relationship;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false)
    private String country;
    
    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;
    
    @Column
    private String email;
    
    @Column
    private String workplace;
    
    @Column(columnDefinition = "TEXT")
    private String workplaceAddress;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
