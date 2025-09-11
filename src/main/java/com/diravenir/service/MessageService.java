package com.diravenir.service;

import com.diravenir.dto.MessageDTO;
import java.util.List;

public interface MessageService {
    MessageDTO envoyerMessage(MessageDTO dto);
    List<MessageDTO> getMessagesByEtudiant(Long etudiantId);
    List<MessageDTO> getMessagesByConseiller(Long conseillerId);
} 
