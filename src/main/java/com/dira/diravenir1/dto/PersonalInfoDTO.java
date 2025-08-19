package com.dira.diravenir1.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PersonalInfoDTO {
    private String nom;
    private String email;
    private String telephone;
}
