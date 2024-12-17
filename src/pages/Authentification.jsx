import React, { useState } from "react";

const Authentification = () => {
  const [isLogin, setIsLogin] = useState(true); 

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Connexion..." : "Inscription...");
  };

  return (
    <div className="flex h-screen bg-white-background">
      <div className="w-1/2 flex flex-col justify-center items-center bg-purple-custom text-white p-8">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenue sur la plateforme !
        </h1>
        <p className="text-lg text-center">
          Gérez vos élèves, professeurs et classes en toute simplicité.
        </p>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center px-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
            {isLogin ? "Connexion" : "Inscription"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 shadow rounded-lg"
          >
            {!isLogin && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-custom"
                />
              </div>
            )}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Votre email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-custom"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                placeholder="Votre mot de passe"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-custom"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-yellow-highlight text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
            >
              {isLogin ? "Se connecter" : "S'inscrire"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-700">
            {isLogin
              ? "Pas encore de compte ?"
              : "Déjà inscrit ?"}
            <button
              onClick={toggleForm}
              className="ml-1 text-purple-custom hover:underline focus:outline-none"
            >
              {isLogin ? "Inscrivez-vous" : "Connectez-vous"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authentification;
