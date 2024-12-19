import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LIST_LEVELS } from '../constants';

const CloseYear = () => {
	const [newEleveAdded, setNewEleveAdded] = useState(false);
	const [classValidate, setClassValidate] = useState(false);
	const [isProfessorsAssigned, setProfessorsAssigned] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchStatus = async () => {
			setIsLoading(true);
			try {
				//check professors
				const response = await fetch('http://localhost:3001/api/professeurs', {
					headers: {
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					},
				});
				const professeurs = await response.json();

				const allLevelsAssigned = LIST_LEVELS.every(level =>
					professeurs.some(prof => prof.niveau === level)
				);
				setProfessorsAssigned(allLevelsAssigned);

				// check new students
				const responseEleves = await fetch(
					'http://localhost:3001/api/eleves/without-level', {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						},
					}
				);
				const eleves = await responseEleves.json();

				const hasNonRenseigne = eleves.length > 0;
				setNewEleveAdded(hasNonRenseigne);

				// check classes validation
				let checkClasses = true;
				for (let level of LIST_LEVELS) {
					const valueLocalStorage = localStorage.getItem(level);
					if (valueLocalStorage === 'true') {
						checkClasses = true;
						continue;
					} else {
						checkClasses = false;
						break;
					}
				}
				setClassValidate(checkClasses);
			} catch (error) {
				console.error('Erreur pendant le chargement des données', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchStatus();
	}, []);

	const handleCloseYear = () => {
		if (newEleveAdded && classValidate) {
			navigate('/closeYearConfirmation');
		}
	};

	const StatusIndicator = ({ status }) => (
		<div className="relative inline-block mr-3 w-8 h-8 flex items-center justify-center">
			{isLoading ? (
				<div className="absolute inset-0 animate-spin rounded-full border-4 border-solid border-purple-custom border-t-transparent"></div>
			) : (
				<span
					className={`absolute inset-0 rounded-full ${
						status ? 'bg-green-500' : 'bg-red-500'
					}`}
				></span>
			)}
		</div>
	);

	return (
		<div className="flex flex-col items-center justify-center pt-[50px]">
			<div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
				<h1 className="text-3xl font-bold mb-6 text-purple-custom text-center">
					Clôture de l'année scolaire
				</h1>

				<div className="mb-8 flex items-center justify-start">
					<StatusIndicator status={newEleveAdded} />
					<p className="text-lg font- text-start">
						{newEleveAdded
							? 'Les nouveaux élèves ont bien été ajoutés'
							: "Aucun élève n'a été ajouté"}
					</p>
				</div>

				<div className="mb-8 flex items-center justify-start">
					<StatusIndicator status={classValidate} />
					<p className="text-lg font- text-start">
						Validation de toutes les classes actuelles
					</p>
				</div>

				<div className="mb-8 flex items-center justify-start">
					<StatusIndicator status={isProfessorsAssigned} />
					<p className="text-lg font- text-start">
						{isProfessorsAssigned
							? 'Les professeurs ont bien été affectés'
							: "Certaines classes n'ont pas de professeur"}
					</p>
				</div>

				<div className="mt-10">
					<button
						onClick={handleCloseYear}
						disabled={!(newEleveAdded && classValidate)}
						className={`w-full py-3 px-6 text-white font-bold rounded-lg ${
							newEleveAdded && classValidate
								? 'bg-green-500 hover:bg-green-600'
								: 'bg-gray-400 cursor-not-allowed'
						}`}
					>
						Clôturer l'année
					</button>
				</div>
			</div>
		</div>
	);
};

export default CloseYear;
