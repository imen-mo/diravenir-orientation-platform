package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "student_information")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentInformation {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "test_uuid", nullable = false, unique = true)
    private String testUuid;
    
    @Column(name = "full_name", nullable = false)
    private String fullName;
    
    @Column(name = "phone", nullable = false)
    private String phone;
    
    @Column(name = "email", nullable = false)
    private String email;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
