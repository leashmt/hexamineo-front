import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/api/users";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    id: null,
    name: "",
    email: "",
    role: "Professeur",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  const handleAddOrEditUser = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.patch(
          `${API_URL}/${newUser.id}`,
          { ...newUser, role: newUser.role },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(users.map((user) => (user._id === newUser.id ? { ...user, ...newUser } : user)));
      } else {
        const response = await axios.post(
          API_URL,
          { ...newUser, role: newUser.role, password: "Saint-Exupery" },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers([...users, response.data]);
      }
      setNewUser({ name: "", email: "", role: "Professeur" });
      setShowForm(false);
      setEditMode(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout ou la modification de l'utilisateur :", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  const handleEditUser = (user) => {
    setShowForm(true);
    setEditMode(true);
    setNewUser({ id: user._id, name: user.name, email: user.email, role: user.role });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Liste des utilisateurs</h2>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Rôle</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-2 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center">
        <button
          onClick={() => {
            setShowForm(!showForm);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {showForm ? "Annuler" : "Ajouter un utilisateur"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddOrEditUser}
          className="mt-6 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editMode ? "Modifier" : "Ajouter"} un utilisateur
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 text-center">Nom</label>
            <input
              type="text"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Nom complet"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 text-center">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1 text-center">Rôle</label>
            <select
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
              className="block w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              <option value="DIRECTRICE">Directrice</option>
              <option value="PROFESSEUR">Professeur</option>
              <option value="MAIRIE">Mairie</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            {editMode ? "Modifier" : "Ajouter"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Dashboard;
