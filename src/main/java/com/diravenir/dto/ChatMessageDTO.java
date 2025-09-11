package com.diravenir.dto;

import com.diravenir.Entities.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessageDTO {
    
    private Long id;
    private String senderId;
    private ChatMessage.SenderType senderType;
    private String receiverId;
    private ChatMessage.SenderType receiverType;
    private String message;
    private ChatMessage.MessageType messageType;
    private Boolean isRead;
    private LocalDateTime sentAt;
    private LocalDateTime readAt;
    private String conversationId;
    private String senderName;
    private String receiverName;
    
    public static ChatMessageDTO fromEntity(ChatMessage entity) {
        return ChatMessageDTO.builder()
                .id(entity.getId())
                .senderId(entity.getSenderId())
                .senderType(entity.getSenderType())
                .receiverId(entity.getReceiverId())
                .receiverType(entity.getReceiverType())
                .message(entity.getMessage())
                .messageType(entity.getMessageType())
                .isRead(entity.getIsRead())
                .sentAt(entity.getSentAt())
                .readAt(entity.getReadAt())
                .conversationId(entity.getConversationId())
                .build();
    }
    
    public ChatMessage toEntity() {
        return ChatMessage.builder()
                .id(this.id)
                .senderId(this.senderId)
                .senderType(this.senderType)
                .receiverId(this.receiverId)
                .receiverType(this.receiverType)
                .message(this.message)
                .messageType(this.messageType)
                .isRead(this.isRead)
                .sentAt(this.sentAt)
                .readAt(this.readAt)
                .conversationId(this.conversationId)
                .build();
    }
}
