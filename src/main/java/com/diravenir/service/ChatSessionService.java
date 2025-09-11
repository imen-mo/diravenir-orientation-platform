package com.diravenir.service;

import com.diravenir.Entities.ChatSession;
import com.diravenir.Entities.ChatMessage;
import com.diravenir.repository.ChatSessionRepository;
import com.diravenir.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ChatSessionService {
    
    private final ChatSessionRepository chatSessionRepository;
    private final ChatMessageRepository chatMessageRepository;
    
    /**
     * Créer ou mettre à jour une session de chat
     */
    public ChatSession createOrUpdateSession(String userId, ChatMessage.SenderType userType, 
                                           String conversationId, String sessionId, String deviceInfo) {
        try {
            Optional<ChatSession> existingSession = chatSessionRepository
                .findActiveSessionByUserAndConversation(userId, conversationId);
            
            if (existingSession.isPresent()) {
                ChatSession session = existingSession.get();
                session.markAsOnline();
                session.setSessionId(sessionId);
                session.setDeviceInfo(deviceInfo);
                session.setLastActivity(LocalDateTime.now());
                return chatSessionRepository.save(session);
            } else {
                ChatSession newSession = ChatSession.builder()
                    .userId(userId)
                    .userType(userType)
                    .conversationId(conversationId)
                    .sessionId(sessionId)
                    .deviceInfo(deviceInfo)
                    .isActive(true)
                    .isOnline(true)
                    .lastActivity(LocalDateTime.now())
                    .connectedAt(LocalDateTime.now())
                    .build();
                
                return chatSessionRepository.save(newSession);
            }
        } catch (Exception e) {
            log.error("Erreur lors de la création/mise à jour de la session pour l'utilisateur: {}", userId, e);
            throw new RuntimeException("Erreur lors de la gestion de la session", e);
        }
    }
    
    /**
     * Marquer une session comme hors ligne
     */
    public void markSessionOffline(String userId, String conversationId) {
        try {
            Optional<ChatSession> session = chatSessionRepository
                .findActiveSessionByUserAndConversation(userId, conversationId);
            
            if (session.isPresent()) {
                ChatSession chatSession = session.get();
                chatSession.markAsOffline();
                chatSessionRepository.save(chatSession);
                log.info("Session marquée comme hors ligne pour l'utilisateur: {} dans la conversation: {}", userId, conversationId);
            }
        } catch (Exception e) {
            log.error("Erreur lors du marquage de la session comme hors ligne", e);
        }
    }
    
    /**
     * Mettre à jour l'activité d'une session
     */
    public void updateSessionActivity(String userId, String conversationId) {
        try {
            Optional<ChatSession> session = chatSessionRepository
                .findActiveSessionByUserAndConversation(userId, conversationId);
            
            if (session.isPresent()) {
                ChatSession chatSession = session.get();
                chatSession.updateActivity();
                chatSessionRepository.save(chatSession);
            }
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour de l'activité de la session", e);
        }
    }
    
    /**
     * Obtenir les utilisateurs en ligne dans une conversation
     */
    public List<ChatSession> getOnlineUsersInConversation(String conversationId) {
        try {
            return chatSessionRepository.findOnlineUsersInConversation(conversationId);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des utilisateurs en ligne", e);
            return List.of();
        }
    }
    
    /**
     * Obtenir toutes les sessions actives d'un utilisateur
     */
    public List<ChatSession> getUserActiveSessions(String userId) {
        try {
            return chatSessionRepository.findActiveSessionsByUserId(userId);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des sessions actives", e);
            return List.of();
        }
    }
    
    /**
     * Obtenir les sessions récentes d'un utilisateur
     */
    public List<ChatSession> getUserRecentSessions(String userId) {
        try {
            return chatSessionRepository.findRecentSessionsByUserId(userId);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des sessions récentes", e);
            return List.of();
        }
    }
    
    /**
     * Désactiver toutes les sessions d'un utilisateur
     */
    public void deactivateUserSessions(String userId) {
        try {
            chatSessionRepository.deactivateUserSessions(userId);
            log.info("Toutes les sessions de l'utilisateur {} ont été désactivées", userId);
        } catch (Exception e) {
            log.error("Erreur lors de la désactivation des sessions", e);
        }
    }
    
    /**
     * Vérifier si un utilisateur est en ligne
     */
    public boolean isUserOnline(String userId) {
        try {
            List<ChatSession> activeSessions = chatSessionRepository.findActiveSessionsByUserId(userId);
            return activeSessions.stream().anyMatch(ChatSession::getIsOnline);
        } catch (Exception e) {
            log.error("Erreur lors de la vérification du statut en ligne", e);
            return false;
        }
    }
    
    /**
     * Obtenir le statut de frappe d'un utilisateur
     */
    public String getUserTypingStatus(String userId, String conversationId) {
        try {
            Optional<ChatSession> session = chatSessionRepository
                .findActiveSessionByUserAndConversation(userId, conversationId);
            
            return session.map(ChatSession::getTypingStatus).orElse(null);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération du statut de frappe", e);
            return null;
        }
    }
    
    /**
     * Mettre à jour le statut de frappe
     */
    public void updateTypingStatus(String userId, String conversationId, String typingStatus) {
        try {
            Optional<ChatSession> session = chatSessionRepository
                .findActiveSessionByUserAndConversation(userId, conversationId);
            
            if (session.isPresent()) {
                ChatSession chatSession = session.get();
                chatSession.setTypingStatus(typingStatus);
                chatSession.updateActivity();
                chatSessionRepository.save(chatSession);
            }
        } catch (Exception e) {
            log.error("Erreur lors de la mise à jour du statut de frappe", e);
        }
    }
    
    /**
     * Obtenir les statistiques des sessions
     */
    public SessionStatistics getSessionStatistics() {
        try {
            Object[] stats = chatSessionRepository.getSessionStatistics();
            return SessionStatistics.builder()
                .totalSessions((Long) stats[0])
                .onlineUsers((Long) stats[1])
                .activeSessions((Long) stats[2])
                .build();
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des statistiques de session", e);
            return SessionStatistics.builder()
                .totalSessions(0L)
                .onlineUsers(0L)
                .activeSessions(0L)
                .build();
        }
    }
    
    /**
     * Nettoyer les sessions expirées (tâche planifiée)
     */
    @Scheduled(fixedRate = 300000) // Toutes les 5 minutes
    public void cleanExpiredSessions() {
        try {
            LocalDateTime expiryTime = LocalDateTime.now().minusMinutes(30); // 30 minutes d'inactivité
            List<ChatSession> expiredSessions = chatSessionRepository.findExpiredSessions(expiryTime);
            
            for (ChatSession session : expiredSessions) {
                session.markAsOffline();
                chatSessionRepository.save(session);
            }
            
            if (!expiredSessions.isEmpty()) {
                log.info("{} sessions expirées ont été nettoyées", expiredSessions.size());
            }
        } catch (Exception e) {
            log.error("Erreur lors du nettoyage des sessions expirées", e);
        }
    }
    
    /**
     * Obtenir les sessions avec activité récente
     */
    public List<ChatSession> getSessionsWithRecentActivity(int minutes) {
        try {
            LocalDateTime since = LocalDateTime.now().minusMinutes(minutes);
            return chatSessionRepository.findSessionsWithRecentActivity(since);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des sessions avec activité récente", e);
            return List.of();
        }
    }
    
    /**
     * Sauvegarder les préférences utilisateur
     */
    public void saveUserPreferences(String userId, String conversationId, String preferences) {
        try {
            Optional<ChatSession> session = chatSessionRepository
                .findActiveSessionByUserAndConversation(userId, conversationId);
            
            if (session.isPresent()) {
                ChatSession chatSession = session.get();
                chatSession.setPreferences(preferences);
                chatSessionRepository.save(chatSession);
            }
        } catch (Exception e) {
            log.error("Erreur lors de la sauvegarde des préférences", e);
        }
    }
    
    /**
     * Obtenir les préférences utilisateur
     */
    public String getUserPreferences(String userId, String conversationId) {
        try {
            Optional<ChatSession> session = chatSessionRepository
                .findActiveSessionByUserAndConversation(userId, conversationId);
            
            return session.map(ChatSession::getPreferences).orElse(null);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des préférences", e);
            return null;
        }
    }
    
    @lombok.Data
    @lombok.Builder
    public static class SessionStatistics {
        private Long totalSessions;
        private Long onlineUsers;
        private Long activeSessions;
    }
}
