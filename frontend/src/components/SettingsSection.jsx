import React from 'react';
import './SettingsSection.css';

const SettingsSection = ({ title, icon, children, className = '' }) => {
    return (
        <div className={`settings-section ${className}`}>
            <h2>
                {icon} {title}
            </h2>
            {children}
        </div>
    );
};

export default SettingsSection;
