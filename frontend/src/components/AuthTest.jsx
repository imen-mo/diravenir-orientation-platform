import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const AuthTest = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const { currentTheme, currentLanguage, getText } = useTheme();

    if (loading) {
        return <div>🔄 {getText('loading')}</div>;
    }

    return (
        <div style={{ padding: '20px', border: '2px solid #ccc', margin: '20px' }}>
            <h3>🧪 {getText('authTest')}</h3>
            <div>
                <strong>{getText('authStatus')}:</strong> {isAuthenticated ? `✅ ${getText('connected')}` : `❌ ${getText('notConnected')}`}
            </div>
            {user && (
                <div>
                    <strong>{getText('user')}:</strong> {user.name || user.email}
                    <br />
                    <strong>{getText('role')}:</strong> {user.role}
                </div>
            )}
            <div>
                <strong>{getText('currentTheme')}:</strong> {currentTheme}
            </div>
            <div>
                <strong>{getText('currentLanguage')}:</strong> {currentLanguage.toUpperCase()}
            </div>
        </div>
    );
};

export default AuthTest;
