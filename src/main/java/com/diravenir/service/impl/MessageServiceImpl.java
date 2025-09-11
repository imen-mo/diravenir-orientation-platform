package com.diravenir.service.impl;

import com.diravenir.dto.MessageDTO;
import com.diravenir.Entities.Message;
import com.diravenir.repository.MessageRepository;
import com.diravenir.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Override
    public MessageDTO envoyerMessage(MessageDTO dto) {
        Message message = convertToEntity(dto);
        Message savedMessage = messageRepository.save(message);
        return convertToDTO(savedMessage);
    }

    @Override
    public List<MessageDTO> getMessagesByEtudiant(Long etudiantId) {
        return messageRepository.findByEtudiantId(etudiantId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<MessageDTO> getMessagesByConseiller(Long conseillerId) {
        return messageRepository.findByConseillerId(conseillerId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private MessageDTO convertToDTO(Message message) {
        MessageDTO dto = new MessageDTO();
        dto.setId(message.getId());
        dto.setContenu(message.getContenu());
        dto.setDateEnvoi(message.getDateEnvoi());
        dto.setLu(message.getLu());
        if (message.getEtudiant() != null) {
            dto.setEtudiantId(message.getEtudiant().getId());
        }
        if (message.getConseiller() != null) {
            dto.setConseillerId(message.getConseiller().getId());
        }
        return dto;
    }

    private Message convertToEntity(MessageDTO dto) {
        Message message = new Message();
        message.setId(dto.getId());
        message.setContenu(dto.getContenu());
        message.setDateEnvoi(dto.getDateEnvoi());
        message.setLu(dto.getLu());
        // Note: Les relations avec Etudiant et Conseiller devraient être gérées séparément
        return message;
    }
}
