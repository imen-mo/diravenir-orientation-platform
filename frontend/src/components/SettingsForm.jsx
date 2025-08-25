import React from 'react';
import './SettingsForm.css';

const SettingsForm = ({ 
    settings, 
    onInputChange, 
    onSave, 
    onReset, 
    onTest, 
    loading = false 
}) => {
    return (
        <form onSubmit={onSave} className="settings-form">
            {/* Le contenu du formulaire sera passé en tant qu'enfants */}
            <div className="form-actions">
                <button
                    type="submit"
                    disabled={loading}
                    className="save-btn"
                >
                    {loading ? '💾 Sauvegarde...' : '💾 Sauvegarder les paramètres'}
                </button>
                
                <button
                    type="button"
                    onClick={onReset}
                    className="reset-btn"
                >
                    🔄 Remettre à zéro
                </button>
                
                {onTest && (
                    <button
                        type="button"
                        onClick={onTest}
                        className="test-all-btn"
                    >
                        🧪 Tester tout
                    </button>
                )}
            </div>
        </form>
    );
};

export default SettingsForm;
