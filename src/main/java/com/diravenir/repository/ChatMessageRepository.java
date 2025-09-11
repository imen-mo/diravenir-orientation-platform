package com.diravenir.repository;

import com.diravenir.Entities.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    
    // Trouver les messages par session
    List<ChatMessage> findBySessionIdOrderByCreatedAtAsc(String sessionId);
    
    // Trouver les messages par utilisateur
    List<ChatMessage> findByUserIdOrderByCreatedAtDesc(String userId);
    
    // Trouver les messages par conseiller
    List<ChatMessage> findByConseillerIdOrderByCreatedAtDesc(String conseillerId);
    
    // Trouver les messages non lus par utilisateur
    List<ChatMessage> findByUserIdAndIsReadFalseOrderByCreatedAtAsc(String userId);
    
    // Trouver les messages non lus par conseiller
    List<ChatMessage> findByConseillerIdAndIsReadFalseOrderByCreatedAtAsc(String conseillerId);
    
    // Compter les messages non lus par utilisateur
    long countByUserIdAndIsReadFalse(String userId);
    
    // Compter les messages non lus par conseiller
    long countByConseillerIdAndIsReadFalse(String conseillerId);
    
    // Trouver les messages récents
    @Query("SELECT m FROM ChatMessage m WHERE m.createdAt >= :since ORDER BY m.createdAt DESC")
    List<ChatMessage> findRecentMessages(@Param("since") LocalDateTime since);
    
    // Recherche de messages par contenu
    @Query("SELECT m FROM ChatMessage m WHERE LOWER(m.content) LIKE LOWER(CONCAT('%', :searchTerm, '%')) ORDER BY m.createdAt DESC")
    List<ChatMessage> searchMessages(@Param("searchTerm") String searchTerm);
    
    // Trouver les messages par type d'expéditeur
    List<ChatMessage> findBySenderTypeOrderByCreatedAtDesc(ChatMessage.SenderType senderType);
    
    // Supprimer les messages anciens
    @Query("DELETE FROM ChatMessage m WHERE m.createdAt < :before")
    void deleteOldMessages(@Param("before") LocalDateTime before);
    
    // Méthodes manquantes pour ChatSearchService
    @Query("SELECT m FROM ChatMessage m WHERE " +
           "(:searchTerm IS NULL OR LOWER(m.content) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) AND " +
           "(:messageType IS NULL OR m.messageType = :messageType) AND " +
           "(:isRead IS NULL OR m.isRead = :isRead) AND " +
           "(:startDate IS NULL OR m.createdAt >= :startDate) AND " +
           "(:endDate IS NULL OR m.createdAt <= :endDate) AND " +
           "(:senderId IS NULL OR m.senderId = :senderId) " +
           "ORDER BY m.createdAt DESC")
    List<ChatMessage> searchWithAdvancedFilters(@Param("searchTerm") String searchTerm,
                                               @Param("messageType") ChatMessage.MessageType messageType,
                                               @Param("isRead") Boolean isRead,
                                               @Param("startDate") LocalDateTime startDate,
                                               @Param("endDate") LocalDateTime endDate,
                                               @Param("senderId") String senderId);
    
    @Query("SELECT m FROM ChatMessage m WHERE m.userId = :userId AND LOWER(m.content) LIKE LOWER(CONCAT('%', :searchTerm, '%')) ORDER BY m.createdAt DESC")
    List<ChatMessage> searchUserMessages(@Param("userId") String userId, @Param("searchTerm") String searchTerm);
    
    @Query("SELECT m FROM ChatMessage m WHERE m.userId = :userId AND m.messageType = 'MEDIA' ORDER BY m.createdAt DESC")
    List<ChatMessage> findMediaMessagesByUserId(@Param("userId") String userId);
    
    @Query("SELECT m FROM ChatMessage m WHERE m.userId = :userId AND m.messageType = 'SYSTEM' ORDER BY m.createdAt DESC")
    List<ChatMessage> findSystemMessagesByUserId(@Param("userId") String userId);
    
    @Query("SELECT m FROM ChatMessage m WHERE m.userId = :userId AND m.createdAt BETWEEN :startDate AND :endDate ORDER BY m.createdAt DESC")
    List<ChatMessage> findMessagesByPeriod(@Param("userId") String userId, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    // Méthodes manquantes pour ChatService
    @Query("SELECT m FROM ChatMessage m WHERE m.conversationId = :conversationId ORDER BY m.sentAt ASC")
    List<ChatMessage> findByConversationIdOrderBySentAtAsc(@Param("conversationId") String conversationId);
    
    @Query("SELECT m FROM ChatMessage m WHERE (m.senderId = :user1Id AND m.receiverId = :user2Id) OR (m.senderId = :user2Id AND m.receiverId = :user1Id) ORDER BY m.sentAt ASC")
    List<ChatMessage> findMessagesBetweenUsers(@Param("user1Id") String user1Id, @Param("user2Id") String user2Id);
    
    @Query("UPDATE ChatMessage m SET m.isRead = true WHERE m.receiverId = :receiverId AND m.senderId = :senderId AND m.isRead = false")
    void markMessagesAsRead(@Param("receiverId") String receiverId, @Param("senderId") String senderId);
    
    @Query("SELECT m FROM ChatMessage m WHERE m.receiverId = :receiverId AND m.isRead = false ORDER BY m.sentAt DESC")
    List<ChatMessage> findUnreadMessagesByReceiverId(@Param("receiverId") String receiverId);
    
    @Query("SELECT COUNT(m) FROM ChatMessage m WHERE m.receiverId = :receiverId AND m.isRead = false")
    long countUnreadMessagesByReceiverId(@Param("receiverId") String receiverId);
    
    @Query("SELECT m FROM ChatMessage m WHERE m.userId = :userId ORDER BY m.sentAt DESC")
    List<ChatMessage> findLastMessagesByUserId(@Param("userId") String userId);
}
