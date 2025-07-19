package com.dira.diravenir1.Entities;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Test {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;

    private LocalDate datePassage;

    private String resultat;

    @OneToMany(mappedBy = "test")
    private List<ResultatTest> resultats;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public LocalDate getDatePassage() { return datePassage; }
    public void setDatePassage(LocalDate datePassage) { this.datePassage = datePassage; }

    public String getResultat() { return resultat; }
    public void setResultat(String resultat) { this.resultat = resultat; }

    public List<ResultatTest> getResultats() { return resultats; }
    public void setResultats(List<ResultatTest> resultats) { this.resultats = resultats; }
}
