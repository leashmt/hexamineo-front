import React from 'react';

const ButtonRepeat = ({ updateStudentStatus, student }) => {
	const handleRepeatGrade = async () => {
		try {
			const response = await fetch(
				`http://localhost:3001/api/eleves/${student._id}/repeat-grade`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			console.log(response);
			if (response.ok) {
				updateStudentStatus(student._id, 'repeat');
			} else {
				console.error('Erreur lors de la mise à jour du statut de l’élève');
			}
		} catch (error) {
			console.error('Erreur de réseau:', error);
		}
	};

	return (
		<button
			onClick={handleRepeatGrade}
			className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-2/5"
		>
			Redoublement
		</button>
	);
};

export default ButtonRepeat;
