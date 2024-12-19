import React, { useState } from "react";

const initialUsers = [
  { id: 1, name: "Madame Dupont", email: "dupont@ecole.fr", role: "Directrice" },
  { id: 2, name: "Jean Martin", email: "jmartin@ecole.fr", role: "Professeur" },
  { id: 3, name: "Mairie", email: "mairie@ville.fr", role: "Mairie" },
];

const Dashboard = () => {
  const [users, setUsers] = useState(initialUsers);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    id: null,
    name: "",
    email: "",
    role: "Professeur",
  });

  const [editMode, setEditMode] = useState(false);

  const handleAddOrEditUser = (e) => {
    e.preventDefault();
    if (editMode) {
      setUsers(
        users.map((user) =>
          user.id === newUser.id ? { ...user, ...newUser } : user
        )
      );
    } else {
      setUsers([
        ...users,
        { id: users.length + 1, ...newUser },
      ]);
    }
    setNewUser({ name: "", email: "", role: "Professeur" });
    setShowForm(false);
    setEditMode(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  const handleEditUser = (user) => {
    setShowForm(true);
    setEditMode(true);
    setNewUser(user);
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
              <tr key={user.id} className="border-b">
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
                    onClick={() => handleDeleteUser(user.id)}
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
              <option value="Directrice">Directrice</option>
              <option value="Professeur">Professeur</option>
              <option value="Mairie">Mairie</option>
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
