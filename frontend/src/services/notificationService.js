// Service de gestion des notifications
class NotificationService {
    constructor() {
        this.permission = 'default';
        this.isSupported = 'Notification' in window;
        this.init();
    }

    // Initialisation
    async init() {
        if (this.isSupported) {
            this.permission = Notification.permission;
            console.log(`🔔 Service de notifications initialisé. Permission: ${this.permission}`);
        }
    }

    // Demander la permission
    async requestPermission() {
        if (!this.isSupported) {
            console.warn('❌ Notifications non supportées par ce navigateur');
            return false;
        }

        try {
            const permission = await Notification.requestPermission();
            this.permission = permission;
            console.log(`🔔 Permission de notification: ${permission}`);
            return permission === 'granted';
        } catch (error) {
            console.error('❌ Erreur lors de la demande de permission:', error);
            return false;
        }
    }

    // Vérifier si les notifications sont autorisées
    isAllowed() {
        return this.permission === 'granted';
    }

    // Envoyer une notification
    async sendNotification(title, options = {}) {
        if (!this.isSupported || !this.isAllowed()) {
            console.warn('❌ Notifications non autorisées');
            return false;
        }

        try {
            const notification = new Notification(title, {
                icon: '/favicon.ico',
                badge: '/favicon.ico',
                ...options
            });

            // Gérer les clics sur la notification
            notification.onclick = () => {
                window.focus();
                notification.close();
            };

            // Auto-fermeture après 5 secondes
            setTimeout(() => {
                notification.close();
            }, 5000);

            console.log(`🔔 Notification envoyée: ${title}`);
            return true;
        } catch (error) {
            console.error('❌ Erreur lors de l\'envoi de la notification:', error);
            return false;
        }
    }

    // Notification de bienvenue
    async sendWelcomeNotification(userName) {
        return this.sendNotification(
            '🎉 Bienvenue sur DirAvenir !',
            {
                body: `Bonjour ${userName}, nous sommes ravis de vous accueillir !`,
                tag: 'welcome'
            }
        );
    }

    // Notification de nouveau programme
    async sendNewProgramNotification(programName) {
        return this.sendNotification(
            '🆕 Nouveau programme disponible !',
            {
                body: `Découvrez "${programName}" dans notre catalogue`,
                tag: 'new-program'
            }
        );
    }

    // Notification de test terminé
    async sendTestCompletedNotification() {
        return this.sendNotification(
            '✅ Test d\'orientation terminé !',
            {
                body: 'Vos résultats sont prêts. Consultez-les maintenant !',
                tag: 'test-completed'
            }
        );
    }

    // Notification de mise à jour de profil
    async sendProfileUpdatedNotification() {
        return this.sendNotification(
            '👤 Profil mis à jour !',
            {
                body: 'Vos informations ont été sauvegardées avec succès',
                tag: 'profile-updated'
            }
        );
    }

    // Tester les notifications
    async testNotification() {
        return this.sendNotification(
            '🧪 Test de notification',
            {
                body: 'Si vous voyez ce message, les notifications fonctionnent !',
                tag: 'test'
            }
        );
    }

    // Obtenir le statut des permissions
    getPermissionStatus() {
        return {
            isSupported: this.isSupported,
            permission: this.permission,
            isAllowed: this.isAllowed()
        };
    }
}

// Instance globale
const notificationService = new NotificationService();

export default notificationService;
