import React, { useState, useEffect } from "react";

// Exemple de données des élèves
const studentsData = [
  {
    _id: "1",
    nom: "Guillou",
    prenom: "Élise",
    niveau: "CE1",
    repeatingGrade: false,
    skipGrade: false,
  },
  {
    _id: "2",
    nom: "Dupuy",
    prenom: "René",
    niveau: "CE1",
    repeatingGrade: false,
    skipGrade: false,
  },
  {
    _id: "3",
    nom: "Bodin",
    prenom: "Thibaut",
    niveau: "CE2",
    repeatingGrade: false,
    skipGrade: false,
  },
];

const PageVisualisationClasses = () => {
  const [selectedClass, setSelectedClass] = useState("CE1");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    // Filtrer les élèves par classe sélectionnée
    const students = studentsData.filter(
      (student) => student.niveau === selectedClass
    );
    setFilteredStudents(students);
  }, [selectedClass]);

  // Fonction pour changer l'état des élèves
  const updateStudentStatus = (id, statusType) => {
    const updatedStudents = filteredStudents.map((student) => {
      if (student._id === id) {
        return {
          ...student,
          repeatingGrade: statusType === "repeat",
          skipGrade: statusType === "skip",
        };
      }
      return student;
    });
    setFilteredStudents(updatedStudents);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Visualisation des Classes
      </h1>

      {/* Sélecteur des classes */}
      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Sélectionnez une classe :
        </label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="CE1">CE1</option>
          <option value="CE2">CE2</option>
          <option value="CM1">CM1</option>
          <option value="CM2">CM2</option>
        </select>
      </div>

      {/* Liste des élèves */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {filteredStudents.length === 0 ? (
          <p className="text-gray-500 text-center">
            Aucun élève dans cette classe.
          </p>
        ) : (
          <>
            <ul>
              {filteredStudents.map((student) => (
                <li
                  key={student._id}
                  className={`flex items-center justify-between p-4 mb-2 rounded-lg border ${
                    student.repeatingGrade
                      ? "bg-red-100 border-red-400"
                      : student.skipGrade
                      ? "bg-green-100 border-green-400"
                      : "border-gray-200"
                  }`}
                >
                  <div>
                    <span className="font-semibold text-gray-700">
                      {student.prenom} {student.nom}
                    </span>
                    <span className="text-gray-500 ml-2 italic">
                      {student.repeatingGrade
                        ? "Redoublement"
                        : student.skipGrade
                        ? "Saut de classe"
                        : "Passage à l'année supérieure"}
                    </span>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => updateStudentStatus(student._id, "skip")}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Saut de classe
                    </button>
                    <button
                      onClick={() => updateStudentStatus(student._id, "repeat")}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Redoublement
                    </button>
                    <button
                      onClick={() => updateStudentStatus(student._id, "pass")}
                      className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                    >
                      Annuler
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Bouton Valider */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => console.log("Validation des élèves")}
                className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
              >
                Valider la classe
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PageVisualisationClasses;
