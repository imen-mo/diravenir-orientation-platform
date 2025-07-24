package com.dira.diravenir1.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MessageDTO {
    private Long id;
    private String contenu;
    private LocalDateTime dateEnvoi;
    private boolean lu;
    private Long etudiantId;
    private Long conseillerId;
} 