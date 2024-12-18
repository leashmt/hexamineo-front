import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const AddStudent = () => {
	const [csvFile, setCsvFile] = useState(null);
	const [message, setMessage] = useState('');
	const [student, setStudent] = useState({
		nom: '',
		prenom: '',
		dateDeNaissance: '',
	});

	const handleChange = e => {
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
				},
				body: JSON.stringify(student),
			});

			console.log('Réponse du serveur :', response);

			if (response.ok) {
				// todo Message de validation
				setStudent({
					nom: '',
					prenom: '',
					dateDeNaissance: '',
					// niveau: '',
				});
			} else {
				alert('Une erreur est survenue');
			}
		} catch (error) {
			console.error('Erreur réseau ou serveur :', error);
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
				body: formData,
			});

			if (response.ok) {
				setMessage('Fichier CSV importé et traité avec succès');
				setCsvFile(null);
			} else {
				setMessage("Erreur lors de l'importation du fichier");
			}
		} catch (error) {
			console.error('Erreur:', error);
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

				<div className="mb-6">
					<label
						htmlFor="dateNaissance text-start"
						className="block text-purple-custom text-sm font-bold mb-2 text-start"
					>
						Niveau :
					</label>
					<select
						id="niveau"
						name="niveau"
						value={student.niveau}
						onChange={handleChange}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
					>
						<option value="">Non renseigné</option>
						<option value="FirstSection">1ère section maternelle</option>
						<option value="SecondSection">2ème section maternelle</option>
						<option value="ThirdSection">3ème section maternelle</option>
						<option value="CP">CP</option>
						<option value="CE1">CE1</option>
						<option value="CE2">CE2</option>
						<option value="CM1">CM1</option>
						<option value="CM2">CM2</option>
					</select>
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
						<p className="text-purple-custom font-semibold">{`Fichier importé : ${csvFile.name}`}</p>
					) : isDragActive ? (
						<p className="text-purple-custom">
							Déposez le fichier CSV ici...
						</p>
					) : (
						<p className="text-purple-custom">
							Glissez et déposez un fichier CSV ici, ou cliquez pour
							sélectionner
						</p>
					)}
				</div>
				{message && <p>{message}</p>}
				<button type="submit" style={{ marginTop: '10px' }}>
					Importer le fichier CSV
				</button>
			</form>
		</div>
	);
};

export default AddStudent;
