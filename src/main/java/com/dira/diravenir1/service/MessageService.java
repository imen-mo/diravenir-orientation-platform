package com.dira.diravenir1.service;

import com.dira.diravenir1.dto.MessageDTO;
import java.util.List;

public interface MessageService {
    MessageDTO envoyerMessage(MessageDTO dto);
    List<MessageDTO> getMessagesByEtudiant(Long etudiantId);
    List<MessageDTO> getMessagesByConseiller(Long conseillerId);
} 