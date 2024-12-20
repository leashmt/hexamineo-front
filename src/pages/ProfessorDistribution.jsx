import React, { useEffect, useState } from 'react';
import { LIST_LEVELS } from '../constants';

const ProfessorDistribution = () => {
	const [professeurs, setProfesseurs] = useState([]);
	const [canSubmit, setCanSubmit] = useState(true);
	const [attribution, setAttribution] = useState(undefined);
	const [message, setMessage] = useState('');

	useEffect(() => {
		let initialAttribution = {
			'1ère section maternelle': '',
			'2ème section maternelle': '',
			'3ème section maternelle': '',
			CP: '',
			CE1: '',
			CE2: '',
			CM1: '',
			CM2: '',
		};

		const fetchProfesseurs = async () => {
			try {
				const response = await fetch('http://localhost:3001/api/professeurs', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});
				const data = await response.json();
				for (let prof of data) {
					if (prof.niveau === 'Non renseigné') {
						continue;
					}
					initialAttribution[prof.niveau] = prof.nom;
				}
				setAttribution(initialAttribution);
				setProfesseurs(data);
			} catch (error) {
				// console.error('Erreur lors de la récupération des professeurs:', error);
			}
		};

		fetchProfesseurs();
	}, []);

	const handleNiveauChange = (nom, selectedNiveau) => {
		const previsousNiveau = getKeyByValue(attribution, nom);

		const nextAttribution = {
			...attribution,
			[selectedNiveau]: nom,
			[previsousNiveau]: '',
		};

		const emptyClasses = checkEmptyClasses(nextAttribution);

		if (emptyClasses.length > 0) {
			const message = `Les classes suivantes n'ont pas de professeur : ${emptyClasses.join(
				', '
			)}`;
			setMessage(message);
			setCanSubmit(false);
		} else {
			setMessage('');
			setCanSubmit(true);
		}

		setAttribution(nextAttribution);
	};

	const updateLevels = async () => {
		try {
			const response = await fetch(
				'http://localhost:3001/api/professeurs/update-levels',
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
					body: JSON.stringify(attribution),
				}
			);
			const data = await response.json();
		} catch (error) {
			// console.error('Erreur lors de la requête :', error);
		}
	};

	const handleValidation = () => {
		const emptyClasses = checkEmptyClasses(attribution);
		if (emptyClasses.length === 0) {
			setMessage('');
			updateLevels();
		} else {
			const message = `Les classes suivantes n'ont pas de professeur : ${emptyClasses.join(
				', '
			)}`;
			setMessage(message);
		}
	};

	const getKeyByValue = (obj, value) => {
		for (let key in obj) {
			if (obj[key] === value) {
				return key;
			}
		}
		return null;
	};

	const checkEmptyClasses = obj => {
		let emptyClasses = [];
		for (let key in obj) {
			if (key === 'Non renseigné' || key === 'null') {
				continue;
			}
			if (!obj[key]) {
				emptyClasses.push(key);
			}
		}
		return emptyClasses;
	};

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6 text-gray-800">
				Répartition des professeurs
			</h1>

			<div className="bg-white p-6 rounded-lg shadow-md">
				<table className="w-full table-auto">
					<thead>
						<tr className="bg-gray-200 rounded-t-md" key="title">
							<th className="p-3 text-left">ENSEIGNANT</th>
							<th className="p-3 text-left">CLASSE</th>
						</tr>
					</thead>
					<tbody>
						{professeurs.length === 0 ? (
							<tr>
								<td
									key="empty"
									colSpan="2"
									className="p-3 text-center text-gray-500"
								>
									Aucun professeur disponible
								</td>
							</tr>
						) : (
							professeurs.map(prof => (
								<tr key={prof.id} className="border-b">
									<td className="p-3 text-start">{prof.nom}</td>
									<td className="p-3">
										<select
											value={
												getKeyByValue(attribution, prof.nom) ||
												'Non renseigné'
											}
											onChange={e =>
												handleNiveauChange(
													prof.nom,
													e.target.value
												)
											}
											className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
										>
											<option
												value="Non renseigné"
												key={'Non renseigné'}
											>
												Choisir un niveau
											</option>
											{LIST_LEVELS.map(niveau => (
												<option key={niveau} value={niveau}>
													{niveau}
												</option>
											))}
										</select>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{message && <p className="mt-4 text-red-500 text-sm">{message}</p>}

			<div className="flex justify-end mt-6">
				<button
					onClick={handleValidation}
					disabled={!canSubmit}
					className={`px-6 py-2 text-white font-semibold rounded-lg transition ${
						canSubmit
							? 'bg-green-500 hover:bg-green-600'
							: 'bg-gray-400 cursor-not-allowed'
					}`}
				>
					VALIDER
				</button>
			</div>
		</div>
	);
};

export default ProfessorDistribution;
