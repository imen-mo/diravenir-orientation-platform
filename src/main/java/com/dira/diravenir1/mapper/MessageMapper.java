package com.dira.diravenir1.mapper;

import com.dira.diravenir1.dto.MessageDTO;
import com.dira.diravenir1.Entities.Conseiller;
import com.dira.diravenir1.Entities.Etudiant;
import com.dira.diravenir1.Entities.Message;
import org.springframework.stereotype.Component;

@Component
public class MessageMapper {
    public MessageDTO toDTO(Message message) {
        MessageDTO dto = new MessageDTO();
        dto.setId(message.getId());
        dto.setContenu(message.getContenu());
        dto.setDateEnvoi(message.getDateEnvoi());
        dto.setLu(message.isLu());
        dto.setEtudiantId(message.getEtudiant() != null ? message.getEtudiant().getId() : null);
        dto.setConseillerId(message.getConseiller() != null ? message.getConseiller().getId() : null);
        return dto;
    }
    public Message toEntity(MessageDTO dto, Etudiant etudiant, Conseiller conseiller) {
        Message message = new Message();
        message.setId(dto.getId());
        message.setContenu(dto.getContenu());
        message.setDateEnvoi(dto.getDateEnvoi() != null ? dto.getDateEnvoi() : java.time.LocalDateTime.now());
        message.setLu(dto.isLu());
        message.setEtudiant(etudiant);
        message.setConseiller(conseiller);
        return message;
    }
} 