import React, { useState } from "react";

const archivedStudents = [
  { id: 1, name: "Élise Guillou", niveau: "CM2", year: 2023 },
  { id: 2, name: "René Dupuy", niveau: "CE1", year: 2022 },
  { id: 3, name: "Thibaut Bodin", niveau: "CM2", year: 2022 },
  { id: 4, name: "Claire Chevallier", niveau: "CM2", year: 2023 },
  { id: 5, name: "André Brunet", niveau: "CE1", year: 2023 },
  { id: 6, name: "Timothée Jacob", niveau: "CM2", year: 2021 },
];

const Archives = () => {
  const [selectedYear, setSelectedYear] = useState(""); // Année sélectionnée
  const [selectedLevel, setSelectedLevel] = useState(""); // Niveau sélectionné

  const filteredStudents = archivedStudents.filter((student) => {
    return (
      (selectedYear ? student.year === parseInt(selectedYear) : true) &&
      (selectedLevel ? student.niveau === selectedLevel : true)
    );
  });

  const uniqueYears = [...new Set(archivedStudents.map((student) => student.year))];
  const uniqueLevels = [...new Set(archivedStudents.map((student) => student.niveau))];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Archives des élèves</h1>

      <div className="flex flex-wrap mb-6 space-x-4">
        <div>
          <label className="block mb-2 text-gray-700 font-semibold">Année</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Toutes les années</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2 text-gray-700 font-semibold">Niveau</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Tous les niveaux</option>
            {uniqueLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Résultats</h2>
        {filteredStudents.length > 0 ? (
          <ul>
            {filteredStudents.map((student) => (
              <li
                key={student.id}
                className="p-2 border-b last:border-b-0 text-gray-700 flex justify-between"
              >
                <span>{student.name}</span>
                <span className="italic text-gray-500">
                  {student.niveau} - {student.year}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucun élève trouvé pour cette sélection.</p>
        )}
      </div>
    </div>
  );
};

export default Archives;
