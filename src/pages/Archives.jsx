import React, { useEffect, useState } from 'react';

const Archives = () => {
	const [selectedYear, setSelectedYear] = useState('');
	const [selectedLevel, setSelectedLevel] = useState('');
	const [archivedStudents, setArchivedStudents] = useState([]);

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await fetch('http://localhost:3001/api/archive', {
					headers: {
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					},
				});
				const data = await response.json();
				setArchivedStudents(data);
			} catch (error) {
				console.error('Erreur lors de la récupération des élèves:', error);
			}
		};

		fetchStudents();
	}, []);

	const filteredStudents = archivedStudents.filter(student => {
		return (
			(selectedYear ? student.year === parseInt(selectedYear) : true) &&
			(selectedLevel ? student.niveau === selectedLevel : true)
		);
	});

	const uniqueYears = [...new Set(archivedStudents.map(student => student.year))];
	const uniqueLevels = [...new Set(archivedStudents.map(student => student.niveau))];

	return (
		<div className=" p-8">
			<h1 className="text-3xl font-bold mb-6 text-gray-800">Archives des élèves</h1>

			<div className="flex flex-wrap mb-6 space-x-4">
				<div className="flex gap-2 items-center">
					<label className="block text-gray-700 font-semibold">Année :</label>
					<select
						value={selectedYear}
						onChange={e => setSelectedYear(e.target.value)}
						className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
					>
						<option value="">Toutes les années</option>
						{uniqueYears.map(year => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</select>
				</div>

				<div className="flex gap-2 items-center">
					<label className="block text-gray-700 font-semibold">Niveau :</label>
					<select
						value={selectedLevel}
						onChange={e => setSelectedLevel(e.target.value)}
						className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
					>
						<option value="">Tous les niveaux</option>
						{uniqueLevels.map(level => (
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
						{filteredStudents.map(student => (
							<li
								key={student._id}
								className="p-2 border-b last:border-b-0 text-gray-700 flex justify-between"
							>
								<p className="w-1/4  flex justify-start">
									{student.prenom} {student.nom}
								</p>
								<p className="w-1/4 text-start italic">
									{student.profName}
								</p>
								<p className="italic text-gray-500 w-1/4 flex justify-end ">
									{student.niveau} - {student.year}
								</p>
							</li>
						))}
					</ul>
				) : (
					<p className="text-gray-500">
						Aucun élève trouvé pour cette sélection.
					</p>
				)}
			</div>
		</div>
	);
};

export default Archives;
