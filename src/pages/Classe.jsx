import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LIST_LEVELS_LINK } from '../constants';
import ButtonSkip from '../components/ButtonSkip';
import ButtonRepeat from '../components/ButtonRepeat';
import ButtonReset from '../components/ButtonReset';

const Classe = () => {
	const { niveau } = useParams();
	const [selectedClass, setSelectedClass] = useState(niveau || LIST_LEVELS_LINK[0]);
	const [filteredStudents, setFilteredStudents] = useState([]);
	const [allStudents, setAllStudents] = useState([]);
	const [isValidated, setIsValidated] = useState(false);

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const response = await fetch('http://localhost:3001/api/eleves', {
					headers: {
						'Authorization': `Bearer ${localStorage.getItem('token')}`,
					},
				});
				if (!response.ok) {
					throw new Error('Erreur lors de la récupération des élèves');
				}
				const data = await response.json();
				setAllStudents(data);
			} catch (error) {
				console.error('Erreur lors de la récupération des élèves:', error);
			}
		};

		fetchStudents();
	}, []);

	useEffect(() => {
		if (allStudents.length === 0) {
			return;
		}
		setIsValidated(localStorage.getItem(selectedClass) === 'true');
		const students = allStudents.filter(student => student.niveau === selectedClass);
		setFilteredStudents(students);
	}, [selectedClass, allStudents]);

	const updateStudentStatus = (id, statusType) => {
		setIsValidated(false);
		const updatedStudents = filteredStudents.map(student => {
			if (student._id === id) {
				return {
					...student,
					repeatGrade: statusType === 'repeat',
					skipGrade: statusType === 'skip',
				};
			}
			return student;
		});
		setFilteredStudents(updatedStudents);
	};

	const handleValidation = () => {
		localStorage.setItem(selectedClass, 'true');
		setIsValidated(true);
	};

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6 text-gray-800">
				Visualisation de la classe {selectedClass.replace(/-/g, ' ')}
			</h1>

			<div className="bg-white p-6 rounded-lg shadow-md">
				{filteredStudents.length === 0 ? (
					<p className="text-gray-500 text-center">
						Aucun élève dans cette classe.
					</p>
				) : (
					<>
						<ul>
							{filteredStudents.map(student => (
								<li
									key={student._id}
									className={`flex items-center justify-between p-4 mb-2 rounded-lg border shadow-md ${
										student.repeatGrade
											? 'bg-red-100 border-red-400'
											: student.skipGrade
											? 'bg-green-100 border-green-400'
											: 'border-gray-200'
									}`}
								>
									<div className="flex items-left w-1/4">
										<p className="font-semibold text-gray-700">
											{student.prenom} {student.nom}
										</p>
									</div>
									<div className="flex items-left w-1/4">
										<p className="text-gray-500 ml-2 italic">
											{student.repeatGrade
												? 'Redoublement'
												: student.skipGrade
												? 'Saut de classe'
												: "Passage à l'année supérieure"}
										</p>
									</div>
									<div className="space-x-2 w-1/3 flex justify-end">
										{student.skipGrade ? (
											<ButtonReset
												updateStudentStatus={updateStudentStatus}
												student={student}
											/>
										) : (
											<ButtonSkip
												updateStudentStatus={updateStudentStatus}
												student={student}
											/>
										)}
										{student.repeatGrade ? (
											<ButtonReset
												updateStudentStatus={updateStudentStatus}
												student={student}
											/>
										) : (
											<ButtonRepeat
												updateStudentStatus={updateStudentStatus}
												student={student}
											/>
										)}
									</div>
								</li>
							))}
						</ul>

						<div className="flex justify-end mt-6 gap-2 items-center">
							{isValidated ? (
								<p className="text-green-500 text-center">
									La classe est bien enregistrée
								</p>
							) : (
								<p className="text-red-500 text-center">
									La classe n'est pas enregistrée
								</p>
							)}
							<button
								onClick={handleValidation}
								className="px-6 py-2 bg-purple-custom text-white font-bold rounded-lg hover:bg-purple-custom-hover transition"
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

export default Classe;
