import React from 'react';
import ReCaptchaTest from '../components/ReCaptchaTest';
import GlobalNavbar from '../components/GlobalNavbar';

const ReCaptchaTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <GlobalNavbar />
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧪 Test reCAPTCHA v3 Backend
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Testez l'intégration complète de reCAPTCHA v3 avec votre backend Spring Boot.
          </p>
        </div>
        
        <ReCaptchaTest />
        
        <div className="mt-12 p-6 bg-white rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📚 Guide d'Utilisation</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">🔧 Tests Disponibles</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><strong>Test Basique:</strong> Vérification générale avec action "submit"</li>
                <li><strong>Test Signup:</strong> Vérification pour l'inscription (score ≥ 0.5)</li>
                <li><strong>Test Signin:</strong> Vérification pour la connexion (score ≥ 0.5)</li>
                <li><strong>Test Strict:</strong> Vérification stricte (score ≥ 0.7)</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-700 mb-2">🎯 Seuils de Score</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><strong>0.0 - 0.4:</strong> Risque élevé (bloqué)</li>
                <li><strong>0.5 - 0.6:</strong> Risque moyen (accepté pour actions basiques)</li>
                <li><strong>0.7 - 1.0:</strong> Risque faible (accepté pour toutes actions)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReCaptchaTestPage;
