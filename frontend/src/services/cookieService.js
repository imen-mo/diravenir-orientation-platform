/**
 * Configuration des cookies pour l'application
 */
const COOKIE_CONFIG = {
    jwt_token: {
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60, // 24 heures
        httpOnly: false // Permet l'accès via JavaScript
    }
};

/**
 * Définit un cookie avec les options appropriées
 */
export function setCookie(name, value, options = {}) {
    const config = COOKIE_CONFIG[name] || {};
    const opts = { ...config, ...options };
    
    let cookieString = `${name}=${encodeURIComponent(value)}`;
    
    if (opts.maxAge) {
        cookieString += `; max-age=${opts.maxAge}`;
    }
    if (opts.path) {
        cookieString += `; path=${opts.path}`;
    }
    if (opts.secure) {
        cookieString += '; secure';
    }
    if (opts.sameSite) {
        cookieString += `; samesite=${opts.sameSite}`;
    }
    if (opts.httpOnly) {
        cookieString += '; httpOnly';
    }
    
    document.cookie = cookieString;
    
    console.log(`🍪 Cookie ${name} défini avec succès`);
}

/**
 * Récupère un cookie par nom
 */
export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookieValue = decodeURIComponent(parts.pop().split(';').shift());
        console.log(`🍪 Cookie ${name} récupéré: ${cookieValue ? 'OUI' : 'NON'}`);
        return cookieValue;
    }
    return null;
}

/**
 * Supprime un cookie
 */
export function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    console.log(`🍪 Cookie ${name} supprimé`);
}

/**
 * Vérifie si un cookie existe
 */
export function hasCookie(name) {
    return !!getCookie(name);
}

/**
 * Nettoie tous les cookies d'authentification
 */
export function clearAuthCookies() {
    Object.keys(COOKIE_CONFIG).forEach(cookieName => {
        deleteCookie(cookieName);
    });
    
    // Nettoyer aussi le localStorage pour compatibilité
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userInfo');
    
    console.log('🧹 Tous les cookies d\'authentification ont été nettoyés');
}

/**
 * Synchronise les cookies avec le localStorage
 */
export function syncCookiesWithLocalStorage() {
    const token = localStorage.getItem('token');
    if (token && !getCookie('jwt_token')) {
        setCookie('jwt_token', token);
        console.log('🔄 Token synchronisé depuis localStorage vers cookies');
    }
}

/**
 * Nettoie tous les cookies de l'application
 */
export function clearAllCookies() {
    const cookies = document.cookie.split(';');
    
    cookies.forEach(cookie => {
        const [name] = cookie.trim().split('=');
        if (name) {
            deleteCookie(name);
        }
    });
    
    console.log('🧹 Tous les cookies ont été supprimés');
}

/**
 * Récupère tous les cookies d'authentification
 */
export function getAuthCookies() {
    const authCookies = {};
    
    Object.keys(COOKIE_CONFIG).forEach(cookieName => {
        const value = getCookie(cookieName);
        if (value) {
            authCookies[cookieName] = value;
        }
    });
    
    return authCookies;
}

/**
 * Vérifie si des cookies d'authentification existent
 */
export function hasAuthCookies() {
    return Object.keys(getAuthCookies()).length > 0;
}

/**
 * Définit un cookie d'authentification avec les options par défaut
 */
export function setAuthCookie(name, value) {
    if (COOKIE_CONFIG[name]) {
        setCookie(name, value, COOKIE_CONFIG[name]);
    } else {
        console.warn(`⚠️ Configuration de cookie non trouvée pour: ${name}`);
        setCookie(name, value);
    }
}

/**
 * Supprime un cookie d'authentification
 */
export function deleteAuthCookie(name) {
    if (COOKIE_CONFIG[name]) {
        deleteCookie(name);
    } else {
        console.warn(`⚠️ Configuration de cookie non trouvée pour: ${name}`);
        deleteCookie(name);
    }
}

/**
 * Vérifie la cohérence entre cookies et localStorage
 */
export function checkAuthConsistency() {
    const cookieToken = getCookie('jwt_token');
    const localToken = localStorage.getItem('token');
    
    if (cookieToken && localToken && cookieToken !== localToken) {
        console.warn('⚠️ Incohérence détectée entre cookies et localStorage');
        // Synchroniser avec la valeur la plus récente
        const mostRecent = cookieToken;
        localStorage.setItem('token', mostRecent);
        console.log('🔄 Synchronisation effectuée');
    }
    
    return {
        hasCookie: !!cookieToken,
        hasLocal: !!localToken,
        isConsistent: cookieToken === localToken
    };
}

/**
 * Initialise le service de cookies
 */
export function initCookieService() {
    // Vérifier la cohérence au démarrage
    checkAuthConsistency();
    
    // Synchroniser si nécessaire
    syncCookiesWithLocalStorage();
    
    console.log('🍪 Service de cookies initialisé');
}

export default {
    setCookie,
    getCookie,
    deleteCookie,
    hasCookie,
    clearAuthCookies,
    syncCookiesWithLocalStorage,
    checkAuthConsistency,
    initCookieService,
    clearAllCookies,
    getAuthCookies,
    hasAuthCookies,
    setAuthCookie,
    deleteAuthCookie
};
