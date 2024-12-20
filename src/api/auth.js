import axios from 'axios';

const API_URL = 'http://localhost:3001/api/auth';

export const signup = async (email, password) => {
	try {
		const response = await axios.post(`${API_URL}/signup`, {
			email,
			password,
		});
		return response;
	} catch (error) {
		// console.log(error)
		throw error;
	}
};

export const login = async (email, password) => {
	try {
		const response = await axios.post(`${API_URL}/login`, {
			email,
			password,
		});
		return response;
	} catch (error) {
		// console.log(error)
		throw error;
	}
};

export const checkTokenValidity = async token => {
	try {
		const response = await axios.get(`${API_URL}/checktoken`, {
			headers: { Authorization: token },
		});
		return response.data.valid;
	} catch (error) {
		// console.error('Erreur de validation du token', error);
		return false;
	}
};
