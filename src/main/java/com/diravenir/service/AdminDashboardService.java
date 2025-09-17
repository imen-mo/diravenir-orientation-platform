package com.diravenir.service;

import java.util.Map;
import java.util.List;

/**
 * Interface pour le service de dashboard administrateur
 */
public interface AdminDashboardService {
    
    /**
     * Obtenir toutes les statistiques du dashboard
     */
    Map<String, Object> getAllStatistics();
    
    /**
     * Obtenir les statistiques des utilisateurs
     */
    Map<String, Object> getUserStatistics();
    
    /**
     * Obtenir les statistiques des applications
     */
    Map<String, Object> getApplicationStatistics();
    
    /**
     * Obtenir les statistiques des programmes
     */
    Map<String, Object> getProgramStatistics();
    
    /**
     * Obtenir les statistiques du chat
     */
    Map<String, Object> getChatStatistics();
    
    /**
     * Obtenir les statistiques d'orientation
     */
    Map<String, Object> getOrientationStatistics();
    
    /**
     * Obtenir les activités récentes
     */
    List<Map<String, Object>> getRecentActivities();
    
    /**
     * Obtenir les données pour les graphiques
     */
    Map<String, Object> getChartsData();
}
