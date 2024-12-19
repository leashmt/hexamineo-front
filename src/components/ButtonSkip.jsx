import React from 'react';

const ButtonSkip = ({ updateStudentStatus, student }) => {
	const handleSkipGrade = async () => {
		try {
			const response = await fetch(
				`http://localhost:3001/api/eleves/${student._id}/skip-grade`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					},
				}
			);
			if (response.ok) {
				updateStudentStatus(student._id, 'skip');
			} else {
				console.error('Erreur lors de la mise à jour du statut de l’élève');
			}
		} catch (error) {
			console.error('Erreur de réseau:', error);
		}
	};

	return (
		<button
			onClick={handleSkipGrade}
			className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 w-2/5"
		>
			Saut de classe
		</button>
	);
};

export default ButtonSkip;
