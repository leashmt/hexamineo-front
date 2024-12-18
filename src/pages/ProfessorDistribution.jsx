import React, { useState } from "react";

const niveaux = [
  "1ère section maternelle",
  "2ème section maternelle",
  "3ème section maternelle",
  "CP",
  "CE1",
  "CE2",
  "CM1",
  "CM2",
];

const initialProfesseurs = [
  { id: 1, name: "Jean Dupont", niveau: "" },
  { id: 2, name: "Marie Curie", niveau: "" },
  { id: 3, name: "Luc Martin", niveau: "" },
  { id: 4, name: "Anne Leroy", niveau: "" },
  { id: 5, name: "Paul Simon", niveau: "" },
  { id: 6, name: "Laura Bernard", niveau: "" },
  { id: 7, name: "Alexandre Petit", niveau: "" },
  { id: 8, name: "Camille Richard", niveau: "" },
  { id: 9, name: "Sophie Garnier", niveau: "" },
];

const ProfessorDistribution= () => {
  const [professeurs, setProfesseurs] = useState(initialProfesseurs);
  const [uniqueProfByNiveau, setUniqueProfByNiveau] = useState(true);

  // Fonction pour gérer la sélection d'un niveau
  const handleNiveauChange = (id, selectedNiveau) => {
    const updatedProfesseurs = professeurs.map((prof) =>
      prof.id === id ? { ...prof, niveau: selectedNiveau } : prof
    );
    setProfesseurs(updatedProfesseurs);

    // Vérification des règles après chaque modification
    checkValidationRules(updatedProfesseurs);
  };

  // Fonction pour vérifier les règles
  const checkValidationRules = (updatedProfesseurs) => {
    const niveauxAttribués = updatedProfesseurs
      .map((prof) => prof.niveau)
      .filter((niveau) => niveau !== "");

    const niveauxUniques = new Set(niveauxAttribués);
    setUniqueProfByNiveau(niveauxAttribués.length === niveauxUniques.size);
  };

  // Fonction pour valider la répartition
  const handleValidation = () => {
    if (uniqueProfByNiveau) {
      alert("Répartition validée avec succès !");
    } else {
      alert("Erreur : Un seul prof par niveau est autorisé !");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Répartition des professeurs
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">PROF</th>
              <th className="p-3 text-left">CLASSE</th>
            </tr>
          </thead>
          <tbody>
            {professeurs.map((prof) => (
              <tr key={prof.id} className="border-b">
                <td className="p-3">{prof.name}</td>
                <td className="p-3">
                  <select
                    value={prof.niveau}
                    onChange={(e) =>
                      handleNiveauChange(prof.id, e.target.value)
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="">Choisir un niveau</option>
                    {niveaux.map((niveau) => (
                      <option key={niveau} value={niveau}>
                        {niveau}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bouton Valider */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleValidation}
          disabled={!uniqueProfByNiveau}
          className={`px-6 py-2 text-white font-semibold rounded-lg transition ${
            uniqueProfByNiveau
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          VALIDER
        </button>
      </div>

      {/* Message d'erreur */}
      {!uniqueProfByNiveau && (
        <p className="mt-4 text-red-500 text-sm">
          Erreur : Chaque niveau doit avoir un seul professeur.
        </p>
      )}
    </div>
  );
};

export default ProfessorDistribution;
