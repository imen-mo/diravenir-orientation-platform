package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Getter
@Setter
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;
    private String description;
    private String imageUrl;

    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL)
    private List<Program> programs;
} 