import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const AddStudent = () => {
	const [csvFile, setCsvFile] = useState(null);
	const [message, setMessage] = useState('');
	const [messageStudent, setMessageStudent] = useState('');
	const [student, setStudent] = useState({
		nom: '',
		prenom: '',
		dateDeNaissance: '',
	});

	const handleChange = e => {
		setMessageStudent('');
		setMessage('');
		const { name, value } = e.target;
		setStudent(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:3001/api/eleves', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: JSON.stringify(student),
			});

			if (response.ok) {
				setMessageStudent("L'élève a bien été ajouté");
				setStudent({
					nom: '',
					prenom: '',
					dateDeNaissance: '',
				});
			} else {
				alert('Une erreur est survenue');
			}
		} catch (error) {
			// console.error('Erreur réseau ou serveur :', error);
			alert('Impossible de se connecter au serveur');
		}
	};

	const handleCSVSubmit = async e => {
		e.preventDefault();

		if (!csvFile) {
			setMessage('Veuillez sélectionner un fichier CSV.');
			return;
		}

		const formData = new FormData();
		formData.append('csvFile', csvFile);

		try {
			const response = await fetch('http://localhost:3001/api/import-csv', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
				body: formData,
			});

			if (response.ok) {
				setMessage('Fichier CSV importé et traité avec succès');
				setCsvFile(null);
			} else {
				setMessage("Erreur lors de l'importation du fichier");
			}
		} catch (error) {
			// console.error('Erreur:', error);
			setMessage('Erreur lors de la connexion au serveur');
		}
	};

	const onDrop = useCallback(acceptedFiles => {
		const file = acceptedFiles[0];
		setCsvFile(file);
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'text/csv': ['.csv'],
		},
	});

	return (
		<div className="flex flex-col items-center justify-center pt-[50px]">
			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
			>
				<h2 className="text-2xl font-bold mb-6 text-purple-custom text-center">
					Ajouter un élève
				</h2>
				{messageStudent && (
					<p className="text-green-500 border border-green-500 rounded-md p-1 mb-2 w-full text-center">
						{messageStudent}
					</p>
				)}
				<div className="mb-4">
					<label
						htmlFor="nom"
						className="block text-purple-custom text-sm font-bold mb-2 text-start"
					>
						Nom :
					</label>
					<input
						type="text"
						id="nom"
						name="nom"
						value={student.nom}
						onChange={handleChange}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="prenom"
						className="block text-purple-custom text-sm font-bold mb-2 text-start"
					>
						Prénom :
					</label>
					<input
						type="text"
						id="prenom"
						name="prenom"
						value={student.prenom}
						onChange={handleChange}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="dateNaissance"
						className="block text-purple-custom text-sm font-bold mb-2 text-start"
					>
						Date de naissance :
					</label>
					<input
						type="date"
						id="dateDeNaissance"
						name="dateDeNaissance"
						value={student.dateDeNaissance}
						onChange={handleChange}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
					/>
				</div>

				<button
					type="submit"
					className="bg-purple-custom hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none w-full"
				>
					Inscrire l'élève
				</button>
			</form>
			<form onSubmit={handleCSVSubmit}>
				<div
					{...getRootProps()}
					className={`mt-4 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer w-full max-w-md ${
						csvFile ? 'bg-yellow-highlight bg-opacity-20' : 'bg-white'
					}`}
				>
					<input {...getInputProps()} />
					{csvFile ? (
						<div>
							<p className="text-purple-custom font-semibold w-full">{`Fichier importé : ${csvFile.name}`}</p>
						</div>
					) : isDragActive ? (
						<p className="text-purple-custom w-full">
							Déposez le fichier CSV ici...
						</p>
					) : (
						<p className="text-purple-custom w-full">
							Glissez et déposez un fichier CSV ici, ou cliquez pour
							sélectionner
						</p>
					)}
				</div>
				{message && (
					<p className="text-green-500 border border-green-500 rounded-md p-1 my-2 w-full text-center">
						{message}
					</p>
				)}
				{csvFile && (
					<button
						type="button"
						onClick={() => setCsvFile(null)}
						className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded focus:outline-none mt-2 w-full"
					>
						Supprimer le fichier
					</button>
				)}
				<button
					type="submit"
					className="bg-purple-custom hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none w-full mt-3 mb-16"
				>
					Importer le fichier CSV
				</button>
			</form>
		</div>
	);
};

export default AddStudent;
