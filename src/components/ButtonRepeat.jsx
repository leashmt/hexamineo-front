import React from 'react';

const ButtonRepeat = ({ updateStudentStatus, student }) => {
	return (
		<button
			onClick={() => updateStudentStatus(student._id, 'repeat')}
			className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 w-2/5"
		>
			Redoublement
		</button>
	);
};

export default ButtonRepeat;
