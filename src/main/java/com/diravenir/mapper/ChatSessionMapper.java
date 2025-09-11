package com.diravenir.mapper;

import com.diravenir.Entities.ChatSession;
import com.diravenir.dto.ChatSessionDTO;
import org.springframework.stereotype.Component;

@Component
public class ChatSessionMapper {
    
    public ChatSessionDTO toDTO(ChatSession session) {
        if (session == null) {
            return null;
        }
        
        ChatSessionDTO dto = new ChatSessionDTO();
        dto.setId(session.getId());
        dto.setSessionId(session.getSessionId());
        dto.setUserId(session.getUserId());
        dto.setConseillerId(session.getConversationId()); // Utilise conversationId comme conseillerId
        dto.setApplicationId(session.getSessionUuid()); // Utilise sessionUuid comme applicationId
        dto.setStatus(session.getIsActive() ? "ACTIVE" : "INACTIVE");
        dto.setCreatedAt(session.getCreatedAt());
        dto.setUpdatedAt(session.getUpdatedAt());
        dto.setLastMessageAt(session.getLastActivity());
        dto.setUnreadCount(0); // TODO: Calculer le nombre de messages non lus
        
        return dto;
    }
    
    public ChatSession toEntity(ChatSessionDTO dto) {
        if (dto == null) {
            return null;
        }
        
        ChatSession session = new ChatSession();
        session.setId(dto.getId());
        session.setSessionId(dto.getSessionId());
        session.setUserId(dto.getUserId());
        session.setConversationId(dto.getConseillerId()); // Utilise conseillerId comme conversationId
        session.setSessionUuid(dto.getApplicationId()); // Utilise applicationId comme sessionUuid
        session.setIsActive("ACTIVE".equals(dto.getStatus()));
        session.setCreatedAt(dto.getCreatedAt());
        session.setUpdatedAt(dto.getUpdatedAt());
        session.setLastActivity(dto.getLastMessageAt());
        
        return session;
    }
}
