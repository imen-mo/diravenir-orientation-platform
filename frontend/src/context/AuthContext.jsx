import React, { createContext, useContext, useState } from 'react';

// Créer le contexte
const AuthContext = createContext();

// Hook personnalisé pour accéder facilement au contexte
export const useAuth = () => useContext(AuthContext);

// Provider qui enveloppe l’app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // null = déconnecté

    const login = (userData) => {
        setUser(userData); // Exemple: { name: 'Sarah', photo: '...' }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
