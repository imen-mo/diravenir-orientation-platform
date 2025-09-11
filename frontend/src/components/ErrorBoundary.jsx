import React from 'react';
import { FaExclamationTriangle, FaRedo, FaHome } from 'react-icons/fa';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Mettre à jour l'état pour afficher l'UI d'erreur
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log l'erreur pour le débogage
    console.error('🚨 Erreur capturée par ErrorBoundary:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-icon">
              <FaExclamationTriangle />
            </div>
            
            <h1>Oups ! Quelque chose s'est mal passé</h1>
            
            <p className="error-message">
              Une erreur inattendue s'est produite. Ne vous inquiétez pas, 
              notre équipe a été notifiée et travaille à résoudre le problème.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>Détails techniques (Développement)</summary>
                <div className="error-stack">
                  <h4>Erreur:</h4>
                  <pre>{this.state.error.toString()}</pre>
                  
                  {this.state.errorInfo && (
                    <>
                      <h4>Stack trace:</h4>
                      <pre>{this.state.errorInfo.componentStack}</pre>
                    </>
                  )}
                </div>
              </details>
            )}

            <div className="error-actions">
              <button onClick={this.handleRetry} className="retry-btn">
                <FaRedo />
                Réessayer
              </button>
              
              <button onClick={this.handleGoHome} className="home-btn">
                <FaHome />
                Retour à l'accueil
              </button>
            </div>

            <div className="error-help">
              <p>
                Si le problème persiste, contactez notre support technique :
                <br />
                <a href="mailto:support@diravenir.com">support@diravenir.com</a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
