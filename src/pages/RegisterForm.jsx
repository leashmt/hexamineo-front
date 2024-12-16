import React, { useState } from "react";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }
    console.log("Nom:", name, "Email:", email, "Password:", password); // <- il reste la login de connexion à ajouter
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-r from-[#F1C27D] via-[#7B4F31] to-[#6A4E3C] px-4">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 shadow-lg rounded-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Inscription
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nom
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Créez un mot de passe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirmez le mot de passe
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmez le mot de passe"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-[#F1C27D] via-[#7B4F31] to-[#6A4E3C] text-white px-4 py-2 rounded-lg w-full hover:opacity-90 transition focus:outline-none focus:ring focus:ring-green-300"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
