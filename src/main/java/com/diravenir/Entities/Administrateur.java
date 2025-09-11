package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "administrateurs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Administrateur extends Utilisateur {

    private String fonctions;
    
    private Boolean gereCompte = false;
    
    private Boolean gereEtudiants = false;

}
