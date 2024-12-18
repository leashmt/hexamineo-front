import React from 'react';

const ButtonReset = ({ updateStudentStatus, student }) => {
	return (
		<button
			onClick={() => updateStudentStatus(student._id, 'pass')}
			className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 w-2/5"
		>
			Annuler
		</button>
	);
};

export default ButtonReset;
