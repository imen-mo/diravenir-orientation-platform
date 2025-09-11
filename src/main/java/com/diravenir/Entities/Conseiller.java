package com.diravenir.Entities;

import jakarta.persistence.*;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Conseiller extends Utilisateur {

    private String specialite;
    private String bureau;
    private String telephoneBureau;

    @Column(length = 1000)
    private String disponibilite;
}
