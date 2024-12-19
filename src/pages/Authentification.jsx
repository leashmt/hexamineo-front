import React, { useState } from "react";
import { login } from "../api/auth";

const Authentification = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData.email, formData.password);
      console.log(response)
      setMessage(response.data.message);
      if (response.data.token){
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user))
      }
      window.location.href = "/";
    } catch (error) {
      setMessage(error.response?.data?.message || "Erreur inconnue");
    }
  };

  return (
    <div className="flex h-screen bg-white-background">
      <div className="w-1/2 flex flex-col justify-center items-center bg-purple-custom text-white p-8">
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur la plateforme !</h1>
        <p className="text-lg text-center">
          Gérez vos élèves, professeurs et classes en toute simplicité.
        </p>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center px-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
            Connexion
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 shadow rounded-lg"
          >
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Votre mot de passe"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-custom"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-yellow-highlight text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
            >
              Se connecter
            </button>
          </form>

          {message && 
            <p className="mt-4 text-center text-red-500 font-medium">{message}</p>
          }
        </div>
      </div>
    </div>
  );
};

export default Authentification;
