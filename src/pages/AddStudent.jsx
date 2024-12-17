import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const AddStudent = () => {
	const [csvFile, setCsvFile] = useState(null);
	const [message, setMessage] = useState('');
	const [student, setStudent] = useState({
		nom: 'Léa',
		prenom: 'Schmitt',
		dateDeNaissance: '',
		// niveau: '',
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
		<div className="flex-grow flex py-12">
			<form onSubmit={handleSubmit}>
				<h2 className="text-2xl font-semibold text-gray-700 mb-6">
					Ajouter un élève
				</h2>

				<div>
					<label htmlFor="nom">Nom :</label>
					<input
						type="text"
						id="nom"
						name="nom"
						value={student.nom}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label htmlFor="prenom">Prénom :</label>
					<input
						type="text"
						id="prenom"
						name="prenom"
						value={student.prenom}
						onChange={handleChange}
						required
					/>
				</div>

				<div>
					<label htmlFor="dateDeNaissance">Date de naissance :</label>
					<input
						type="date"
						id="dateDeNaissance"
						name="dateDeNaissance"
						value={student.dateDeNaissance}
						onChange={handleChange}
						required
					/>
				</div>
				{/* 
				<div>
					<label htmlFor="niveau">Niveau :</label>
					<select
						id="niveau"
						name="niveau"
						value={student.niveau}
						onChange={handleChange}
						required
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
				</div> */}

				<button type="submit">Inscrire l'élève</button>
			</form>
			<form onSubmit={handleCSVSubmit}>
				<div
					{...getRootProps()}
					style={{
						border: '2px dashed #cccccc',
						borderRadius: '4px',
						padding: '20px',
						textAlign: 'center',
						cursor: 'pointer',
						marginTop: '20px',
						backgroundColor: csvFile ? '#e6ffe6' : 'white',
					}}
				>
					<input {...getInputProps()} />
					{csvFile
						? `Fichier importé : ${csvFile.name}`
						: isDragActive
						? 'Déposez le fichier CSV ici...'
						: 'Glissez et déposez un fichier CSV ici, ou cliquez pour sélectionner'}
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
