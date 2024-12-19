import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ErrorPage = () => {
  const { statusCode } = useParams();
  return (
    <div className="flex flex-col items-center justify-center mt-36">
      <h1 className="text-6xl font-bold text-yellow-highlight mb-4">
        Erreur {statusCode}
      </h1>
      <p className="text-xl mb-8">
        {statusCode === "500"
          ? 'Erreur interne du serveur.'
          : statusCode === "404"
          ? "La page que vous recherchez n'existe pas."
          : statusCode === "403"
          ? "Accès refusé, vous n'êtes pas autorisé à accéder à cette page."
          : statusCode === "401"
          ? 'Authentification nécessaire.'
          : "Une erreur s'est produite."}
      </p>
      {statusCode === "401" ? (
        <Link
          to="/auth"
          className="bg-purple-custom hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded"
        >
          Se connecter
        </Link>
      ) : (
        <Link
          to="/"
          className="bg-purple-custom hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded"
        >
          Retour à l'accueil
        </Link>
      )}
    </div>
  );
};

export default ErrorPage;
