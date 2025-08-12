import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import './SignUpSuccess.css';

export default function SignUpSuccess() {
    return (
        <motion.div
            className="signup-success-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <header className="success-header">
                <img src={logo} alt="Diravenir" className="success-logo" />
            </header>

            <main className="success-content">
                <motion.div
                    className="success-card"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >

                    <div className="success-icon">
                        <svg 
                            width="64" 
                            height="64" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                        >
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22,4 12,14.01 9,11.01"/>
                        </svg>
                    </div>

                    <h1 className="success-title">
                        Compte créé avec succès ! 🎉
                    </h1>

                    <p className="success-message">
                        Votre compte a été créé avec succès. Nous avons envoyé un email de vérification à votre adresse email.
                    </p>

                    <div className="verification-steps">
                        <h3>Prochaines étapes :</h3>
                        <ol>
                            <li>Vérifiez votre boîte email</li>
                            <li>Cliquez sur le lien de vérification</li>
                            <li>Connectez-vous à votre compte</li>
                        </ol>
                    </div>

                    <div className="email-note">
                        <p>
                            <strong>Note :</strong> Si vous ne voyez pas l'email, vérifiez votre dossier spam.
                        </p>
                    </div>

                    <div className="success-actions">
                        <Link to="/signin" className="btn-primary">
                            Se connecter
                        </Link>
                        <Link to="/" className="btn-outline">
                            Retour à l'accueil
                        </Link>
                    </div>

                    <div className="resend-email">
                        <p>
                            Pas reçu l'email ?{" "}
                            <button className="resend-link">
                                Renvoyer l'email de vérification
                            </button>
                        </p>
                    </div>
                </motion.div>
            </main>
        </motion.div>
    );
} 