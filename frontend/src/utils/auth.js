{/* Icône de succès */}// Clé pour le stockage du token dans le localStorage
const TOKEN_KEY = 'diravenir_auth_token';

// Récupérer le token
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Sauvegarder le token
export const setToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

// Supprimer le token (déconnexion)
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Vérifier si l'utilisateur est connecté
export const isAuthenticated = () => {
  return !!getToken();
};
