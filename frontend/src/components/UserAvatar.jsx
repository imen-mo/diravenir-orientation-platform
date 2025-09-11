import React from 'react';
import './UserAvatar.css';

const UserAvatar = ({ 
    user, 
    size = 'medium', 
    showName = false, 
    className = '',
    onClick = null 
}) => {
    // Extraire la première lettre du prénom ou du nom
    const getInitial = () => {
        if (user?.prenom) {
            return user.prenom.charAt(0).toUpperCase();
        }
        if (user?.name) {
            return user.name.charAt(0).toUpperCase();
        }
        if (user?.email) {
            return user.email.charAt(0).toUpperCase();
        }
        return 'U';
    };

    // Générer une couleur basée sur l'email pour la cohérence
    const getAvatarColor = () => {
        if (user?.email) {
            const colors = [
                '#8B5CF6', // Violet
                '#7C3AED', // Violet foncé
                '#6D28D9', // Violet plus foncé
                '#5B21B6', // Violet très foncé
                '#4C1D95', // Violet extrême
                '#3B0764', // Violet ultra foncé
            ];
            const hash = user.email.split('').reduce((a, b) => {
                a = ((a << 5) - a) + b.charCodeAt(0);
                return a & a;
            }, 0);
            return colors[Math.abs(hash) % colors.length];
        }
        return '#8B5CF6'; // Violet par défaut
    };

    const avatarStyle = {
        backgroundColor: getAvatarColor(),
        color: 'white',
        fontSize: size === 'small' ? '12px' : size === 'large' ? '24px' : '16px',
        width: size === 'small' ? '32px' : size === 'large' ? '64px' : '40px',
        height: size === 'small' ? '32px' : size === 'large' ? '64px' : '40px',
    };

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <div className={`user-avatar ${className}`} onClick={handleClick}>
            <div 
                className={`avatar-circle avatar-${size}`}
                style={avatarStyle}
            >
                {getInitial()}
            </div>
            {showName && user && (
                <div className="avatar-name">
                    {user.name || `${user.prenom || ''} ${user.nom || ''}`.trim() || 'Utilisateur'}
                </div>
            )}
        </div>
    );
};

export default UserAvatar;
