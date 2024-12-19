import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = (statusCode) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-yellow-highlight mb-4">Erreur {statusCode}</h1>
      <p className="text-xl mb-8">
        {statusCode === 500 ? "Internet Server Error." :
         statusCode === 404 ? "La page que vous recherchez n'existe pas." :
         statusCode === 403 ? "Accès refusé, Vous n'êtes pas autorisé à accéder à cette page." :
         statusCode === 401 ? "Authentification nécessaire." :
              
         "Une erreur s'est produite."}
      </p>
      <Link to="/" className="bg-purple-custom hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default ErrorPage;
