/**
 * Service de gestion des données utilisateur persistantes
 * Sauvegarde et récupère toutes les données utilisateur (programmes sauvegardés, préférences, etc.)
 */

class UserDataService {
    constructor() {
        this.storageKeys = {
            savedPrograms: 'savedPrograms',
            userPreferences: 'userPreferences',
            userSettings: 'userSettings',
            orientationResults: 'orientationResults',
            applications: 'applications',
            notifications: 'notifications',
            theme: 'theme',
            language: 'language'
        };
    }

    /**
     * Sauvegarde les programmes sauvegardés par l'utilisateur
     */
    savePrograms(programs, userId = null) {
        try {
            const key = userId ? `${this.storageKeys.savedPrograms}_${userId}` : this.storageKeys.savedPrograms;
            const data = {
                programs: programs,
                timestamp: Date.now(),
                userId: userId
            };
            localStorage.setItem(key, JSON.stringify(data));
            console.log('💾 Programmes sauvegardés:', programs.length);
            return true;
        } catch (error) {
            console.error('❌ Erreur lors de la sauvegarde des programmes:', error);
            return false;
        }
    }

    /**
     * Récupère les programmes sauvegardés
     */
    getSavedPrograms(userId = null) {
        try {
            const key = userId ? `${this.storageKeys.savedPrograms}_${userId}` : this.storageKeys.savedPrograms;
            const data = localStorage.getItem(key);
            if (data) {
                const parsed = JSON.parse(data);
                console.log('📂 Programmes récupérés:', parsed.programs?.length || 0);
                return parsed.programs || [];
            }
            return [];
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des programmes:', error);
            return [];
        }
    }

    /**
     * Ajoute un programme aux sauvegardés
     */
    addSavedProgram(program, userId = null) {
        try {
            const savedPrograms = this.getSavedPrograms(userId);
            const exists = savedPrograms.find(p => p.id === program.id);
            
            if (!exists) {
                savedPrograms.push({
                    ...program,
                    savedAt: new Date().toISOString()
                });
                this.savePrograms(savedPrograms, userId);
                console.log('✅ Programme ajouté aux sauvegardés:', program.nom);
                return true;
            } else {
                console.log('⚠️ Programme déjà sauvegardé:', program.nom);
                return false;
            }
        } catch (error) {
            console.error('❌ Erreur lors de l\'ajout du programme:', error);
            return false;
        }
    }

    /**
     * Supprime un programme des sauvegardés
     */
    removeSavedProgram(programId, userId = null) {
        try {
            const savedPrograms = this.getSavedPrograms(userId);
            const filtered = savedPrograms.filter(p => p.id !== programId);
            this.savePrograms(filtered, userId);
            console.log('🗑️ Programme supprimé des sauvegardés:', programId);
            return true;
        } catch (error) {
            console.error('❌ Erreur lors de la suppression du programme:', error);
            return false;
        }
    }

    /**
     * Sauvegarde les préférences utilisateur
     */
    saveUserPreferences(preferences, userId = null) {
        try {
            const key = userId ? `${this.storageKeys.userPreferences}_${userId}` : this.storageKeys.userPreferences;
            const data = {
                preferences: preferences,
                timestamp: Date.now(),
                userId: userId
            };
            localStorage.setItem(key, JSON.stringify(data));
            console.log('💾 Préférences sauvegardées');
            return true;
        } catch (error) {
            console.error('❌ Erreur lors de la sauvegarde des préférences:', error);
            return false;
        }
    }

    /**
     * Récupère les préférences utilisateur
     */
    getUserPreferences(userId = null) {
        try {
            const key = userId ? `${this.storageKeys.userPreferences}_${userId}` : this.storageKeys.userPreferences;
            const data = localStorage.getItem(key);
            if (data) {
                const parsed = JSON.parse(data);
                return parsed.preferences || {};
            }
            return {};
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des préférences:', error);
            return {};
        }
    }

    /**
     * Sauvegarde les résultats d'orientation
     */
    saveOrientationResults(results, userId = null) {
        try {
            const key = userId ? `${this.storageKeys.orientationResults}_${userId}` : this.storageKeys.orientationResults;
            const data = {
                results: results,
                timestamp: Date.now(),
                userId: userId
            };
            localStorage.setItem(key, JSON.stringify(data));
            console.log('💾 Résultats d\'orientation sauvegardés');
            return true;
        } catch (error) {
            console.error('❌ Erreur lors de la sauvegarde des résultats:', error);
            return false;
        }
    }

    /**
     * Récupère les résultats d'orientation
     */
    getOrientationResults(userId = null) {
        try {
            const key = userId ? `${this.storageKeys.orientationResults}_${userId}` : this.storageKeys.orientationResults;
            const data = localStorage.getItem(key);
            if (data) {
                const parsed = JSON.parse(data);
                return parsed.results || null;
            }
            return null;
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des résultats:', error);
            return null;
        }
    }

    /**
     * Sauvegarde les candidatures
     */
    saveApplications(applications, userId = null) {
        try {
            const key = userId ? `${this.storageKeys.applications}_${userId}` : this.storageKeys.applications;
            const data = {
                applications: applications,
                timestamp: Date.now(),
                userId: userId
            };
            localStorage.setItem(key, JSON.stringify(data));
            console.log('💾 Candidatures sauvegardées:', applications.length);
            return true;
        } catch (error) {
            console.error('❌ Erreur lors de la sauvegarde des candidatures:', error);
            return false;
        }
    }

    /**
     * Récupère les candidatures
     */
    getApplications(userId = null) {
        try {
            const key = userId ? `${this.storageKeys.applications}_${userId}` : this.storageKeys.applications;
            const data = localStorage.getItem(key);
            if (data) {
                const parsed = JSON.parse(data);
                return parsed.applications || [];
            }
            return [];
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des candidatures:', error);
            return [];
        }
    }

    /**
     * Sauvegarde les notifications
     */
    saveNotifications(notifications, userId = null) {
        try {
            const key = userId ? `${this.storageKeys.notifications}_${userId}` : this.storageKeys.notifications;
            const data = {
                notifications: notifications,
                timestamp: Date.now(),
                userId: userId
            };
            localStorage.setItem(key, JSON.stringify(data));
            console.log('💾 Notifications sauvegardées:', notifications.length);
            return true;
        } catch (error) {
            console.error('❌ Erreur lors de la sauvegarde des notifications:', error);
            return false;
        }
    }

    /**
     * Récupère les notifications
     */
    getNotifications(userId = null) {
        try {
            const key = userId ? `${this.storageKeys.notifications}_${userId}` : this.storageKeys.notifications;
            const data = localStorage.getItem(key);
            if (data) {
                const parsed = JSON.parse(data);
                return parsed.notifications || [];
            }
            return [];
        } catch (error) {
            console.error('❌ Erreur lors de la récupération des notifications:', error);
            return [];
        }
    }

    /**
     * Sauvegarde toutes les données utilisateur
     */
    saveAllUserData(userData, userId) {
        try {
            if (userData.savedPrograms) {
                this.savePrograms(userData.savedPrograms, userId);
            }
            if (userData.preferences) {
                this.saveUserPreferences(userData.preferences, userId);
            }
            if (userData.orientationResults) {
                this.saveOrientationResults(userData.orientationResults, userId);
            }
            if (userData.applications) {
                this.saveApplications(userData.applications, userId);
            }
            if (userData.notifications) {
                this.saveNotifications(userData.notifications, userId);
            }
            console.log('💾 Toutes les données utilisateur sauvegardées');
            return true;
        } catch (error) {
            console.error('❌ Erreur lors de la sauvegarde complète:', error);
            return false;
        }
    }

    /**
     * Récupère toutes les données utilisateur
     */
    getAllUserData(userId) {
        try {
            const userData = {
                savedPrograms: this.getSavedPrograms(userId),
                preferences: this.getUserPreferences(userId),
                orientationResults: this.getOrientationResults(userId),
                applications: this.getApplications(userId),
                notifications: this.getNotifications(userId)
            };
            console.log('📂 Toutes les données utilisateur récupérées');
            return userData;
        } catch (error) {
            console.error('❌ Erreur lors de la récupération complète:', error);
            return {
                savedPrograms: [],
                preferences: {},
                orientationResults: null,
                applications: [],
                notifications: []
            };
        }
    }

    /**
     * Nettoie toutes les données utilisateur
     */
    clearAllUserData(userId = null) {
        try {
            const keys = Object.values(this.storageKeys);
            keys.forEach(key => {
                const fullKey = userId ? `${key}_${userId}` : key;
                localStorage.removeItem(fullKey);
            });
            console.log('🧹 Toutes les données utilisateur nettoyées');
            return true;
        } catch (error) {
            console.error('❌ Erreur lors du nettoyage:', error);
            return false;
        }
    }

    /**
     * Migre les données d'un utilisateur anonyme vers un utilisateur connecté
     */
    migrateUserData(anonymousUserId, connectedUserId) {
        try {
            const anonymousData = this.getAllUserData(anonymousUserId);
            this.saveAllUserData(anonymousData, connectedUserId);
            this.clearAllUserData(anonymousUserId);
            console.log('🔄 Données migrées de l\'utilisateur anonyme vers l\'utilisateur connecté');
            return true;
        } catch (error) {
            console.error('❌ Erreur lors de la migration:', error);
            return false;
        }
    }
}

// Instance singleton
const userDataService = new UserDataService();
export default userDataService;
