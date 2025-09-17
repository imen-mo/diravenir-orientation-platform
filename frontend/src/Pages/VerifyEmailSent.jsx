import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/VerifyEmailSent.css';
import GlobalLayout from '../components/GlobalLayout';

const VerifyEmailSent = () => {
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Récupérer les paramètres de l'URL
        const urlParams = new URLSearchParams(location.search);
        const emailParam = urlParams.get('email');
        const messageParam = urlParams.get('message');

        if (emailParam) {
            setEmail(decodeURIComponent(emailParam));
        }
        if (messageParam) {
            setMessage(decodeURIComponent(messageParam));
        }
    }, [location.search]);

    return (
        <GlobalLayout activePage="verify-email-sent">
            <div className="verify-email-sent-container">
                <div className="verify-email-sent-card">
                    <div className="verify-email-sent-header">
                        <div className="verify-email-sent-icon">
                            <svg className="email-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        
                        <h1 className="verify-email-sent-title">Check Your Email</h1>
                        <p className="verify-email-sent-subtitle">
                            We've sent you a verification link
                        </p>
                    </div>

                    <div className="verify-email-sent-content">
                        <div className="verify-email-sent-message">
                            <p className="main-message">
                                {message || 'Please check your email and click the verification link to activate your account.'}
                            </p>
                            
                            {email && (
                                <div className="email-info">
                                    <p className="email-label">Email sent to:</p>
                                    <p className="email-address">{email}</p>
                                </div>
                            )}
                        </div>

                        <div className="verify-email-sent-instructions">
                            <h3>What to do next:</h3>
                            <ol>
                                <li>Check your email inbox (and spam folder)</li>
                                <li>Click on the verification link</li>
                                <li>Return here to sign in</li>
                            </ol>
                        </div>

                        <div className="verify-email-sent-actions">
                            <Link to="/login" className="back-to-login-button">
                                Back to Login
                            </Link>
                            
                            <button 
                                onClick={() => window.location.reload()} 
                                className="refresh-button"
                            >
                                Refresh Page
                            </button>
                        </div>

                        <div className="verify-email-sent-help">
                            <p>
                                Didn't receive the email? Check your spam folder or{' '}
                                <Link to="/register" className="help-link">
                                    try registering again
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GlobalLayout>
    );
};

export default VerifyEmailSent;
