import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CloseYearConfirmation = () => {
	const [archivageStatus, setArchivageStatus] = useState('loading');
	const [passagesStatus, setPassagesStatus] = useState('loading');
	const [affectationProfsStatus, setAffectationProfsStatus] = useState('loading');

	useEffect(() => {
		const fetchStatus = async () => {
			try {
				const year = `${
					new Date().getFullYear() - 1
				}-${new Date().getFullYear()}`;

				// archive
				const responseArchive = await fetch(
					`http://localhost:3001/api/archive/${year}/all`,
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);
				setArchivageStatus(responseArchive.ok);
				if (!responseArchive.ok) {
					// return;
				}

				// passages
				const responsePassages = await fetch(
					`http://localhost:3001/api/eleves/assign`,
					{
						method: 'PUT',
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);
				setPassagesStatus(responsePassages.ok);
				if (!responsePassages.ok) {
					// return;
				}

				// professeurs
				const responseProfesseurs = await fetch(
					`http://localhost:3001/api/professeurs/assign`,
					{
						method: 'PUT',
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);
				setAffectationProfsStatus(responseProfesseurs.ok);
				if (!responseProfesseurs.ok) {
					// return;
				}
			} catch (error) {
				// console.error('Erreur pendant le chargement des données', error);
			}
		};

		fetchStatus();
	}, []);

	const StatusIndicator = ({ status }) => (
		<div className="relative inline-block mr-3 w-8 h-8 flex items-center justify-center">
			{status === 'loading' ? (
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
					Confirmation de clôture
				</h1>

				<div className="mb-8 flex items-center justify-start">
					<StatusIndicator status={archivageStatus} />
					<span className="text-lg font-semibold">
						Archivage de l'année passée
					</span>
				</div>

				<div className="mb-8 flex items-center">
					<StatusIndicator status={passagesStatus} />
					<div className="flex items-start w-64">
						<span className="text-lg text-left font-semibold">
							Attribution des classes
						</span>
					</div>
				</div>

				<div className="mb-8 flex items-center justify-start">
					<StatusIndicator status={affectationProfsStatus} />
					<span className="text-lg font-semibold">
						Affectations des enseignants
					</span>
				</div>

				<div className="mt-10">
					<Link
						to="/"
						className="block w-full py-3 px-6 text-white font-bold rounded-lg bg-purple-custom hover:bg-opacity-80 text-center"
					>
						Retour à l'accueil
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CloseYearConfirmation;
