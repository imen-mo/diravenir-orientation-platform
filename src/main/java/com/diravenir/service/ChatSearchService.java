package com.diravenir.service;

import com.diravenir.Entities.ChatMessage;
import com.diravenir.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatSearchService {
    
    private final ChatMessageRepository chatMessageRepository;
    
    /**
     * Recherche avancée avec filtres multiples
     */
    public SearchResult searchMessages(SearchRequest request) {
        try {
            List<ChatMessage> messages = chatMessageRepository.searchWithAdvancedFilters(
                request.getSenderId(),
                request.getMessageType(),
                request.getIsRead(),
                request.getStartDate(),
                request.getEndDate(),
                request.getSearchTerm()
            );
            
            // Appliquer la pagination
            int total = messages.size();
            int start = request.getPage() * request.getSize();
            int end = Math.min(start + request.getSize(), total);
            
            List<ChatMessage> paginatedMessages = messages.subList(start, end);
            
            return SearchResult.builder()
                .messages(paginatedMessages)
                .total(total)
                .page(request.getPage())
                .size(request.getSize())
                .totalPages((int) Math.ceil((double) total / request.getSize()))
                .build();
                
        } catch (Exception e) {
            log.error("Erreur lors de la recherche de messages", e);
            return SearchResult.builder()
                .messages(List.of())
                .total(0)
                .page(0)
                .size(0)
                .totalPages(0)
                .build();
        }
    }
    
    /**
     * Recherche typo-tolérante avec suggestions
     */
    public SearchResult searchWithTypoTolerance(String searchTerm, String userId, int page, int size) {
        try {
            // Recherche exacte
            List<ChatMessage> exactMatches = chatMessageRepository.searchUserMessages(userId, searchTerm);
            
            // Recherche avec variations (typo-tolérance)
            List<ChatMessage> fuzzyMatches = new ArrayList<>();
            
            // Variations courantes
            String[] variations = generateTypoVariations(searchTerm);
            for (String variation : variations) {
                List<ChatMessage> variationResults = chatMessageRepository.searchUserMessages(userId, variation);
                fuzzyMatches.addAll(variationResults);
            }
            
            // Combiner et dédupliquer
            Set<Long> seenIds = new HashSet<>();
            List<ChatMessage> allResults = new ArrayList<>();
            
            // Ajouter d'abord les correspondances exactes
            for (ChatMessage message : exactMatches) {
                if (!seenIds.contains(message.getId())) {
                    allResults.add(message);
                    seenIds.add(message.getId());
                }
            }
            
            // Ajouter les correspondances floues
            for (ChatMessage message : fuzzyMatches) {
                if (!seenIds.contains(message.getId())) {
                    allResults.add(message);
                    seenIds.add(message.getId());
                }
            }
            
            // Trier par pertinence et date
            allResults.sort((m1, m2) -> {
                boolean m1Exact = exactMatches.contains(m1);
                boolean m2Exact = exactMatches.contains(m2);
                
                if (m1Exact && !m2Exact) return -1;
                if (!m1Exact && m2Exact) return 1;
                
                return m2.getSentAt().compareTo(m1.getSentAt());
            });
            
            // Pagination
            int total = allResults.size();
            int start = page * size;
            int end = Math.min(start + size, total);
            
            List<ChatMessage> paginatedResults = allResults.subList(start, end);
            
            return SearchResult.builder()
                .messages(paginatedResults)
                .total(total)
                .page(page)
                .size(size)
                .totalPages((int) Math.ceil((double) total / size))
                .suggestions(generateSuggestions(searchTerm))
                .build();
                
        } catch (Exception e) {
            log.error("Erreur lors de la recherche typo-tolérante", e);
            return SearchResult.builder()
                .messages(List.of())
                .total(0)
                .page(0)
                .size(0)
                .totalPages(0)
                .build();
        }
    }
    
    /**
     * Recherche par mots-clés multiples
     */
    public SearchResult searchByMultipleKeywords(String userId, List<String> keywords, int page, int size) {
        try {
            List<ChatMessage> allResults = new ArrayList<>();
            
            // Recherche pour chaque mot-clé
            for (String keyword : keywords) {
                List<ChatMessage> keywordResults = chatMessageRepository.searchUserMessages(userId, keyword);
                allResults.addAll(keywordResults);
            }
            
            // Dédupliquer et trier
            Map<Long, ChatMessage> uniqueMessages = new LinkedHashMap<>();
            for (ChatMessage message : allResults) {
                uniqueMessages.put(message.getId(), message);
            }
            
            List<ChatMessage> sortedResults = new ArrayList<>(uniqueMessages.values());
            sortedResults.sort((m1, m2) -> m2.getSentAt().compareTo(m1.getSentAt()));
            
            // Pagination
            int total = sortedResults.size();
            int start = page * size;
            int end = Math.min(start + size, total);
            
            List<ChatMessage> paginatedResults = sortedResults.subList(start, end);
            
            return SearchResult.builder()
                .messages(paginatedResults)
                .total(total)
                .page(page)
                .size(size)
                .totalPages((int) Math.ceil((double) total / size))
                .build();
                
        } catch (Exception e) {
            log.error("Erreur lors de la recherche par mots-clés multiples", e);
            return SearchResult.builder()
                .messages(List.of())
                .total(0)
                .page(0)
                .size(0)
                .totalPages(0)
                .build();
        }
    }
    
    /**
     * Recherche de messages média
     */
    public SearchResult searchMediaMessages(String userId, int page, int size) {
        try {
            List<ChatMessage> mediaMessages = chatMessageRepository.findMediaMessagesByUserId(userId);
            
            // Pagination
            int total = mediaMessages.size();
            int start = page * size;
            int end = Math.min(start + size, total);
            
            List<ChatMessage> paginatedResults = mediaMessages.subList(start, end);
            
            return SearchResult.builder()
                .messages(paginatedResults)
                .total(total)
                .page(page)
                .size(size)
                .totalPages((int) Math.ceil((double) total / size))
                .build();
                
        } catch (Exception e) {
            log.error("Erreur lors de la recherche de messages média", e);
            return SearchResult.builder()
                .messages(List.of())
                .total(0)
                .page(0)
                .size(0)
                .totalPages(0)
                .build();
        }
    }
    
    /**
     * Recherche de messages système
     */
    public SearchResult searchSystemMessages(String userId, int page, int size) {
        try {
            List<ChatMessage> systemMessages = chatMessageRepository.findSystemMessagesByUserId(userId);
            
            // Pagination
            int total = systemMessages.size();
            int start = page * size;
            int end = Math.min(start + size, total);
            
            List<ChatMessage> paginatedResults = systemMessages.subList(start, end);
            
            return SearchResult.builder()
                .messages(paginatedResults)
                .total(total)
                .page(page)
                .size(size)
                .totalPages((int) Math.ceil((double) total / size))
                .build();
                
        } catch (Exception e) {
            log.error("Erreur lors de la recherche de messages système", e);
            return SearchResult.builder()
                .messages(List.of())
                .total(0)
                .page(0)
                .size(0)
                .totalPages(0)
                .build();
        }
    }
    
    /**
     * Recherche par période
     */
    public SearchResult searchByPeriod(String userId, LocalDateTime startDate, LocalDateTime endDate, int page, int size) {
        try {
            List<ChatMessage> periodMessages = chatMessageRepository.findMessagesByPeriod(userId, startDate, endDate);
            
            // Pagination
            int total = periodMessages.size();
            int start = page * size;
            int end = Math.min(start + size, total);
            
            List<ChatMessage> paginatedResults = periodMessages.subList(start, end);
            
            return SearchResult.builder()
                .messages(paginatedResults)
                .total(total)
                .page(page)
                .size(size)
                .totalPages((int) Math.ceil((double) total / size))
                .build();
                
        } catch (Exception e) {
            log.error("Erreur lors de la recherche par période", e);
            return SearchResult.builder()
                .messages(List.of())
                .total(0)
                .page(0)
                .size(0)
                .totalPages(0)
                .build();
        }
    }
    
    /**
     * Générer des variations pour la typo-tolérance
     */
    private String[] generateTypoVariations(String searchTerm) {
        Set<String> variations = new HashSet<>();
        
        // Variations simples
        variations.add(searchTerm.toLowerCase());
        variations.add(searchTerm.toUpperCase());
        
        // Variations avec caractères similaires
        Map<Character, List<Character>> similarChars = Map.of(
            'a', List.of('q', 'z'),
            'e', List.of('r', 'd'),
            'i', List.of('u', 'o'),
            'o', List.of('i', 'p'),
            'u', List.of('i', 'y'),
            's', List.of('a', 'z'),
            'z', List.of('a', 's')
        );
        
        for (int i = 0; i < searchTerm.length(); i++) {
            char c = searchTerm.charAt(i);
            if (similarChars.containsKey(c)) {
                for (char similar : similarChars.get(c)) {
                    String variation = searchTerm.substring(0, i) + similar + searchTerm.substring(i + 1);
                    variations.add(variation);
                }
            }
        }
        
        return variations.toArray(new String[0]);
    }
    
    /**
     * Générer des suggestions de recherche
     */
    private List<String> generateSuggestions(String searchTerm) {
        List<String> suggestions = new ArrayList<>();
        
        // Suggestions basées sur des mots courants
        String[] commonWords = {"bonjour", "merci", "aide", "question", "problème", "inscription", "candidature"};
        
        for (String word : commonWords) {
            if (word.contains(searchTerm.toLowerCase()) || searchTerm.toLowerCase().contains(word)) {
                suggestions.add(word);
            }
        }
        
        return suggestions.stream().limit(5).collect(Collectors.toList());
    }
    
    @lombok.Data
    @lombok.Builder
    public static class SearchRequest {
        private String senderId;
        private ChatMessage.MessageType messageType;
        private Boolean isRead;
        private LocalDateTime startDate;
        private LocalDateTime endDate;
        private String searchTerm;
        @lombok.Builder.Default
        private int page = 0;
        @lombok.Builder.Default
        private int size = 20;
    }
    
    @lombok.Data
    @lombok.Builder
    public static class SearchResult {
        private List<ChatMessage> messages;
        private int total;
        private int page;
        private int size;
        private int totalPages;
        private List<String> suggestions;
    }
}
