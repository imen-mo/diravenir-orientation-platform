package com.diravenir.repository;

import com.diravenir.Entities.ChatSession;
import com.diravenir.Entities.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {
    
    // Trouver par session UUID
    Optional<ChatSession> findBySessionUuid(String sessionUuid);
    
    // Trouver par utilisateur
    List<ChatSession> findByUserIdOrderByLastActivityDesc(String userId);
    
    // Trouver par conversation
    List<ChatSession> findByConversationIdOrderByLastActivityDesc(String conversationId);
    
    // Trouver les sessions actives
    List<ChatSession> findByIsActiveTrueOrderByLastActivityDesc();
    
    // Trouver les sessions en ligne
    List<ChatSession> findByIsOnlineTrueOrderByLastActivityDesc();
    
    // Trouver les sessions par utilisateur et conversation
    Optional<ChatSession> findByUserIdAndConversationId(String userId, String conversationId);
    
    // Trouver les sessions récentes
    @Query("SELECT s FROM ChatSession s WHERE s.lastActivity >= :since ORDER BY s.lastActivity DESC")
    List<ChatSession> findRecentSessions(@Param("since") LocalDateTime since);
    
    // Compter les sessions actives par utilisateur
    long countByUserIdAndIsActiveTrue(String userId);
    
    // Compter les sessions en ligne par utilisateur
    long countByUserIdAndIsOnlineTrue(String userId);
    
    // Supprimer les sessions inactives
    @Query("DELETE FROM ChatSession s WHERE s.lastActivity < :before")
    void deleteInactiveSessions(@Param("before") LocalDateTime before);
    
    // Trouver les sessions par type d'utilisateur
    List<ChatSession> findByUserTypeOrderByLastActivityDesc(com.diravenir.Entities.ChatMessage.SenderType userType);
    
    // Méthodes manquantes pour ChatSessionService
    @Query("SELECT s FROM ChatSession s WHERE s.userId = :userId AND s.conversationId = :conversationId AND s.isActive = true")
    Optional<ChatSession> findActiveSessionByUserAndConversation(@Param("userId") String userId, @Param("conversationId") String conversationId);
    
    @Query("SELECT s FROM ChatSession s WHERE s.conversationId = :conversationId AND s.isOnline = true ORDER BY s.lastActivity DESC")
    List<ChatSession> findOnlineUsersInConversation(@Param("conversationId") String conversationId);
    
    @Query("SELECT s FROM ChatSession s WHERE s.userId = :userId AND s.isActive = true ORDER BY s.lastActivity DESC")
    List<ChatSession> findActiveSessionsByUserId(@Param("userId") String userId);
    
    @Query("SELECT s FROM ChatSession s WHERE s.userId = :userId ORDER BY s.lastActivity DESC")
    List<ChatSession> findRecentSessionsByUserId(@Param("userId") String userId);
    
    @Modifying
    @Query("UPDATE ChatSession s SET s.isActive = false WHERE s.userId = :userId")
    void deactivateUserSessions(@Param("userId") String userId);
    
    @Query("SELECT s FROM ChatSession s WHERE s.lastActivity < :expiryTime AND s.isActive = true")
    List<ChatSession> findExpiredSessions(@Param("expiryTime") LocalDateTime expiryTime);
    
    @Query("SELECT s FROM ChatSession s WHERE s.lastActivity >= :since ORDER BY s.lastActivity DESC")
    List<ChatSession> findSessionsWithRecentActivity(@Param("since") LocalDateTime since);
    
    @Query("SELECT COUNT(s), COUNT(CASE WHEN s.isOnline = true THEN 1 END), COUNT(CASE WHEN s.isActive = true THEN 1 END) FROM ChatSession s")
    Object[] getSessionStatistics();
}
