import React from 'react';
import { Link } from 'react-router-dom';
import GlobalLayout from '../components/GlobalLayout';

const NotFound = () => {
  return (
    <GlobalLayout activePage="notfound">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <h2 className="mt-6 text-6xl font-extrabold text-gray-900">
              404
            </h2>
            <h3 className="mt-2 text-2xl font-medium text-gray-900">
              Page non trouvée
            </h3>
            <p className="mt-4 text-gray-600">
              Désolé, nous n'avons pas trouvé la page que vous recherchez.
            </p>
          </div>
          <div className="mt-6">
            <Link
              to="/"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </GlobalLayout>
  );
};

export default NotFound;
