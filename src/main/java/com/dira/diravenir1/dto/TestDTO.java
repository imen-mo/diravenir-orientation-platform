package com.dira.diravenir1.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestDTO {
    private Long id;
    private String type;
    private LocalDate datePassage;
    private String resultat;
}
