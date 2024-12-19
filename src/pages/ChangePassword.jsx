import React, { useState } from 'react';

const ChangePassword = () => {
	const [passwordData, setPasswordData] = useState({
		email: '',
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	});
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	const handleChange = e => {
		setMessage('');
		setError('');
		const { name, value } = e.target;
		setPasswordData(prevState => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async e => {
		e.preventDefault();

		if (passwordData.newPassword !== passwordData.confirmPassword) {
			setError('Les nouveaux mots de passe ne correspondent pas.');
			return;
		}

		try {
			const response = await fetch('http://localhost:3001/api/change-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(passwordData),
			});

			if (response.ok) {
				setMessage('Mot de passe modifié avec succès.');
				setPasswordData({
					email: '',
					oldPassword: '',
					newPassword: '',
					confirmPassword: '',
				});
			} else {
				setError('Erreur lors de la modification du mot de passe.');
			}
		} catch (error) {
			console.error('Erreur réseau ou serveur :', error);
			setError('Impossible de se connecter au serveur.');
		}
	};

	return (
		<div className="flex flex-col items-center justify-center pt-[50px]">
			<form
				onSubmit={handleSubmit}
				className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
			>
				<h2 className="text-2xl font-bold mb-6 text-purple-custom text-center">
					Changer le mot de passe
				</h2>
				{message && (
					<p className="text-green-500 border border-green-500 rounded-md p-1 mb-2 w-full text-center">
						{message}
					</p>
				)}
				{error && (
					<p className="text-red-500 border border-red-500 rounded-md p-1 mb-2 w-full text-center">
						{error}
					</p>
				)}
				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-purple-custom text-sm font-bold mb-2 text-start"
					>
						Adresse email :
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={passwordData.email}
						onChange={handleChange}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="oldPassword"
						className="block text-purple-custom text-sm font-bold mb-2 text-start"
					>
						Ancien mot de passe :
					</label>
					<input
						type="password"
						id="oldPassword"
						name="oldPassword"
						value={passwordData.oldPassword}
						onChange={handleChange}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="newPassword"
						className="block text-purple-custom text-sm font-bold mb-2 text-start"
					>
						Nouveau mot de passe :
					</label>
					<input
						type="password"
						id="newPassword"
						name="newPassword"
						value={passwordData.newPassword}
						onChange={handleChange}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="confirmPassword"
						className="block text-purple-custom text-sm font-bold mb-2 text-start"
					>
						Confirmer le nouveau mot de passe :
					</label>
					<input
						type="password"
						id="confirmPassword"
						name="confirmPassword"
						value={passwordData.confirmPassword}
						onChange={handleChange}
						required
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
					/>
				</div>

				<button
					type="submit"
					className="bg-purple-custom hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none w-full"
				>
					Modifier le mot de passe
				</button>
			</form>
		</div>
	);
};

export default ChangePassword;
