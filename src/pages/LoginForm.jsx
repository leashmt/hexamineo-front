import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password); // <- il reste la logique test de mdp à ajouter facultatif
  };

  return (
    <div className="h-screen w-full bg-gradient-to-r from-[#F1C27D] via-[#7B4F31] to-[#6A4E3C] flex items-center justify-center">
      <form onSubmit = {handleLogin} className="bg-white p-6 shadow-lg rounded-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Connexion</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Votre mot de passe"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-[#F1C27D] via-[#7B4F31] to-[#6A4E3C] text-white px-4 py-2 rounded-lg w-full hover:opacity-90 transition focus:outline-none focus:ring focus:ring-green-300"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
