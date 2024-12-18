import React from 'react';

const ButtonSkip = ({ updateStudentStatus, student }) => {
	return (
		<button
			onClick={() => updateStudentStatus(student._id, 'skip')}
			className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 w-2/5"
		>
			Saut de classe
		</button>
	);
};

export default ButtonSkip;
