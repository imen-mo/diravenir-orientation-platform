package com.diravenir.controller;

import com.diravenir.Entities.ChatMessage;
import com.diravenir.service.ChatSearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat/search")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class ChatSearchController {
    
    private final ChatSearchService chatSearchService;
    
    /**
     * Recherche avancée avec filtres multiples
     */
    @PostMapping("/advanced")
    public ResponseEntity<ChatSearchService.SearchResult> advancedSearch(@RequestBody ChatSearchService.SearchRequest request) {
        try {
            log.info("Recherche avancée demandée pour l'utilisateur: {}", request.getSenderId());
            ChatSearchService.SearchResult result = chatSearchService.searchMessages(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Erreur lors de la recherche avancée", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Recherche typo-tolérante avec suggestions
     */
    @GetMapping("/typo-tolerant/{userId}")
    public ResponseEntity<ChatSearchService.SearchResult> typoTolerantSearch(
            @PathVariable String userId,
            @RequestParam String searchTerm,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            log.info("Recherche typo-tolérante demandée pour l'utilisateur: {} avec le terme: {}", userId, searchTerm);
            ChatSearchService.SearchResult result = chatSearchService.searchWithTypoTolerance(searchTerm, userId, page, size);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Erreur lors de la recherche typo-tolérante", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Recherche par mots-clés multiples
     */
    @PostMapping("/keywords/{userId}")
    public ResponseEntity<ChatSearchService.SearchResult> searchByKeywords(
            @PathVariable String userId,
            @RequestBody List<String> keywords,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            log.info("Recherche par mots-clés demandée pour l'utilisateur: {} avec {} mots-clés", userId, keywords.size());
            ChatSearchService.SearchResult result = chatSearchService.searchByMultipleKeywords(userId, keywords, page, size);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Erreur lors de la recherche par mots-clés", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Recherche de messages média
     */
    @GetMapping("/media/{userId}")
    public ResponseEntity<ChatSearchService.SearchResult> searchMediaMessages(
            @PathVariable String userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            log.info("Recherche de messages média demandée pour l'utilisateur: {}", userId);
            ChatSearchService.SearchResult result = chatSearchService.searchMediaMessages(userId, page, size);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Erreur lors de la recherche de messages média", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Recherche de messages système
     */
    @GetMapping("/system/{userId}")
    public ResponseEntity<ChatSearchService.SearchResult> searchSystemMessages(
            @PathVariable String userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            log.info("Recherche de messages système demandée pour l'utilisateur: {}", userId);
            ChatSearchService.SearchResult result = chatSearchService.searchSystemMessages(userId, page, size);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Erreur lors de la recherche de messages système", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Recherche par période
     */
    @GetMapping("/period/{userId}")
    public ResponseEntity<ChatSearchService.SearchResult> searchByPeriod(
            @PathVariable String userId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            log.info("Recherche par période demandée pour l'utilisateur: {} de {} à {}", userId, startDate, endDate);
            ChatSearchService.SearchResult result = chatSearchService.searchByPeriod(userId, startDate, endDate, page, size);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Erreur lors de la recherche par période", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Recherche simple par contenu
     */
    @GetMapping("/content/{userId}")
    public ResponseEntity<ChatSearchService.SearchResult> searchByContent(
            @PathVariable String userId,
            @RequestParam String content,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            log.info("Recherche par contenu demandée pour l'utilisateur: {} avec le contenu: {}", userId, content);
            
            ChatSearchService.SearchRequest request = ChatSearchService.SearchRequest.builder()
                .senderId(userId)
                .searchTerm(content)
                .page(page)
                .size(size)
                .build();
                
            ChatSearchService.SearchResult result = chatSearchService.searchMessages(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Erreur lors de la recherche par contenu", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Recherche par type de message
     */
    @GetMapping("/type/{userId}")
    public ResponseEntity<ChatSearchService.SearchResult> searchByMessageType(
            @PathVariable String userId,
            @RequestParam ChatMessage.MessageType messageType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            log.info("Recherche par type de message demandée pour l'utilisateur: {} avec le type: {}", userId, messageType);
            
            ChatSearchService.SearchRequest request = ChatSearchService.SearchRequest.builder()
                .senderId(userId)
                .messageType(messageType)
                .page(page)
                .size(size)
                .build();
                
            ChatSearchService.SearchResult result = chatSearchService.searchMessages(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Erreur lors de la recherche par type de message", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Recherche de messages non lus
     */
    @GetMapping("/unread/{userId}")
    public ResponseEntity<ChatSearchService.SearchResult> searchUnreadMessages(
            @PathVariable String userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            log.info("Recherche de messages non lus demandée pour l'utilisateur: {}", userId);
            
            ChatSearchService.SearchRequest request = ChatSearchService.SearchRequest.builder()
                .senderId(userId)
                .isRead(false)
                .page(page)
                .size(size)
                .build();
                
            ChatSearchService.SearchResult result = chatSearchService.searchMessages(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Erreur lors de la recherche de messages non lus", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Recherche de messages modifiés
     */
    @GetMapping("/edited/{userId}")
    public ResponseEntity<ChatSearchService.SearchResult> searchEditedMessages(
            @PathVariable String userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            log.info("Recherche de messages modifiés demandée pour l'utilisateur: {}", userId);
            
            ChatSearchService.SearchRequest request = ChatSearchService.SearchRequest.builder()
                .senderId(userId)
                .page(page)
                .size(size)
                .build();
                
            ChatSearchService.SearchResult result = chatSearchService.searchMessages(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Erreur lors de la recherche de messages modifiés", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Recherche globale (tous les messages)
     */
    @GetMapping("/global")
    public ResponseEntity<ChatSearchService.SearchResult> globalSearch(
            @RequestParam String searchTerm,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        try {
            log.info("Recherche globale demandée avec le terme: {}", searchTerm);
            
            ChatSearchService.SearchRequest request = ChatSearchService.SearchRequest.builder()
                .searchTerm(searchTerm)
                .page(page)
                .size(size)
                .build();
                
            ChatSearchService.SearchResult result = chatSearchService.searchMessages(request);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Erreur lors de la recherche globale", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Suggestions de recherche
     */
    @GetMapping("/suggestions")
    public ResponseEntity<List<String>> getSearchSuggestions(@RequestParam String query) {
        try {
            log.info("Demande de suggestions pour la requête: {}", query);
            
            // Simuler des suggestions basées sur la requête
            List<String> suggestions = List.of(
                query + " aide",
                query + " question",
                query + " problème",
                query + " inscription",
                query + " candidature"
            );
            
            return ResponseEntity.ok(suggestions);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des suggestions", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Statistiques de recherche
     */
    @GetMapping("/statistics/{userId}")
    public ResponseEntity<Map<String, Object>> getSearchStatistics(@PathVariable String userId) {
        try {
            log.info("Demande de statistiques de recherche pour l'utilisateur: {}", userId);
            
            // Simuler des statistiques
            Map<String, Object> statistics = Map.of(
                "totalSearches", 150,
                "mostSearchedTerms", List.of("inscription", "candidature", "aide", "problème"),
                "lastSearchDate", LocalDateTime.now().minusHours(2),
                "favoriteSearchType", "content"
            );
            
            return ResponseEntity.ok(statistics);
        } catch (Exception e) {
            log.error("Erreur lors de la récupération des statistiques de recherche", e);
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Endpoint de santé pour la recherche
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        return ResponseEntity.ok(Map.of("status", "Chat search service is running"));
    }
}
