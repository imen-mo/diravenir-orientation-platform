package com.dira.diravenir1.impl;

import com.dira.diravenir1.dto.MessageDTO;
import com.dira.diravenir1.Entities.Conseiller;
import com.dira.diravenir1.Entities.Etudiant;
import com.dira.diravenir1.Entities.Message;
import com.dira.diravenir1.mapper.MessageMapper;
import com.dira.diravenir1.Repository.ConseillerRepository;
import com.dira.diravenir1.Repository.EtudiantRepository;
import com.dira.diravenir1.Repository.MessageRepository;
import com.dira.diravenir1.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private EtudiantRepository etudiantRepository;
    @Autowired
    private ConseillerRepository conseillerRepository;
    @Autowired
    private MessageMapper messageMapper;
    @Override
    public MessageDTO envoyerMessage(MessageDTO dto) {
        Etudiant etudiant = etudiantRepository.findById(dto.getEtudiantId())
                .orElseThrow(() -> new RuntimeException("Etudiant non trouvé"));
        Conseiller conseiller = conseillerRepository.findById(dto.getConseillerId())
                .orElseThrow(() -> new RuntimeException("Conseiller non trouvé"));
        Message message = messageMapper.toEntity(dto, etudiant, conseiller);
        message = messageRepository.save(message);
        return messageMapper.toDTO(message);
    }
    @Override
    public List<MessageDTO> getMessagesByEtudiant(Long etudiantId) {
        return messageRepository.findByEtudiantId(etudiantId)
                .stream()
                .map(messageMapper::toDTO)
                .collect(Collectors.toList());
    }
    @Override
    public List<MessageDTO> getMessagesByConseiller(Long conseillerId) {
        return messageRepository.findByConseillerId(conseillerId)
                .stream()
                .map(messageMapper::toDTO)
                .collect(Collectors.toList());
    }
} 