import React, { useState } from 'react';

function AddTeacher() {
	const [message, setMessage] = useState('');
	const [teacher, setTeacher] = useState({
		nom: '',
		prenom: '',
		email: '',
	});

	const handleChange = e => {
		setMessage('');
		const { name, value } = e.target;
		setTeacher(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			const response = await fetch('http://localhost:3001/api/professeurs', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(teacher),
			});

			if (response.ok) {
				setMessage("L'enseignant a bien été ajouté");
				setTeacher({
					nom: '',
					prenom: '',
					email: '',
				});
			} else {
				alert('Une erreur est survenue');
			}
		} catch (error) {
			console.error('Erreur réseau ou serveur :', error);
			alert('Impossible de se connecter au serveur');
		}
	};

	return (
		<div className="flex flex-col items-center justify-center pt-[50px]">
			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
			>
				<h2 className="text-2xl font-bold mb-6 text-purple-custom text-center">
					Information professeur
				</h2>

				{message && (
					<p className="text-green-500 border border-green-500 rounded-md p-1 mb-2 w-full text-center">
						{message}
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
						value={teacher.nom}
						onChange={handleChange}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="nom"
						className="block text-purple-custom text-sm font-bold mb-2 text-start"
					>
						Prénom :
					</label>
					<input
						type="text"
						id="prenom"
						name="prenom"
						value={teacher.prenom}
						onChange={handleChange}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
					/>
				</div>

				<div className="mb-6">
					<label
						htmlFor="nom"
						className="block text-purple-custom text-sm font-bold mb-2 text-start"
					>
						Email :
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={teacher.email}
						onChange={handleChange}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
					/>
				</div>
				<button
					type="submit"
					className="bg-purple-custom hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none w-full"
				>
					Ajouter le professeur
				</button>
			</form>
		</div>
	);
}

export default AddTeacher;
