import React from 'react';

const ButtonReset = ({ updateStudentStatus, student }) => {
	const handleResetGrade = async () => {
		try {
			const response = await fetch(
				`http://localhost:3001/api/eleves/${student._id}/reset-grade`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			if (response.ok) {
				updateStudentStatus(student._id, 'pass');
			} else {
				console.error('Erreur lors de la mise à jour du statut de l’élève');
			}
		} catch (error) {
			console.error('Erreur de réseau:', error);
		}
	};

	return (
		<button
			onClick={handleResetGrade}
			className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 w-2/5"
		>
			Annuler
		</button>
	);
};

export default ButtonReset;
