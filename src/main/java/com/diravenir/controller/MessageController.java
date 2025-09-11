package com.diravenir.controller;

import com.diravenir.dto.MessageDTO;
import com.diravenir.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @PostMapping
    public MessageDTO envoyerMessage(@RequestBody MessageDTO dto) {
        return messageService.envoyerMessage(dto);
    }
    @GetMapping("/etudiant/{id}")
    public List<MessageDTO> getMessagesEtudiant(@PathVariable Long id) {
        return messageService.getMessagesByEtudiant(id);
    }
    @GetMapping("/conseiller/{id}")
    public List<MessageDTO> getMessagesConseiller(@PathVariable Long id) {
        return messageService.getMessagesByConseiller(id);
    }
} 
