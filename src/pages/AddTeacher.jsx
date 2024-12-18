import React, { useState } from 'react';

function AddTeacher() {
	const [student, setStudent] = useState({
		nom: '',
		prenom: '',
		email: '',
		classe: '',
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setStudent(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = e => {
		e.preventDefault();
		// Ajouter l'envoie en base de donnée
		console.log(student);
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
						htmlFor="nom"
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
						htmlFor="nom"
						className="block text-purple-custom text-sm font-bold mb-2 text-start"
					>
						Classe :
					</label>
					<input
						type="text"
						id="classe"
						name="classe"
						value={student.classe}
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
						type="text"
						id="email"
						name="email"
						value={student.dateNaissance}
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
