package com.diravenir.mapper;

import com.diravenir.dto.MessageDTO;
import com.diravenir.Entities.Conseiller;
import com.diravenir.Entities.Etudiant;
import com.diravenir.Entities.Message;
import org.springframework.stereotype.Component;

@Component
public class MessageMapper {
    public MessageDTO toDTO(Message message) {
        MessageDTO dto = new MessageDTO();
        dto.setId(message.getId());
        dto.setContenu(message.getContenu());
        dto.setDateEnvoi(message.getDateEnvoi());
        dto.setLu(message.getLu());
        dto.setEtudiantId(message.getEtudiant() != null ? message.getEtudiant().getId() : null);
        dto.setConseillerId(message.getConseiller() != null ? message.getConseiller().getId() : null);
        return dto;
    }
    public Message toEntity(MessageDTO dto, Etudiant etudiant, Conseiller conseiller) {
        Message message = new Message();
        message.setId(dto.getId());
        message.setContenu(dto.getContenu());
        message.setDateEnvoi(dto.getDateEnvoi() != null ? dto.getDateEnvoi() : java.time.LocalDateTime.now());
        message.setLu(dto.getLu());
        message.setEtudiant(etudiant);
        message.setConseiller(conseiller);
        return message;
    }
} 
