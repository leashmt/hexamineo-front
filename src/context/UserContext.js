import { createContext, useState, useEffect } from 'react';
import { checkTokenValidity } from '../api/auth';
import { jwtDecode } from 'jwt-decode';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const initializeUser = async () => {
			const token = localStorage.getItem('token');

			if (token) {
				try {
					//const valid = await checkTokenValidity(token);
					//if (valid) {
					const decodedToken = jwtDecode(token);
					if (decodedToken) {
						setUser(decodedToken);
					}
					//} else {
					//  clearUserData();
					//}
				} catch (error) {
					// console.error("Erreur lors de la vérification du token:", error);
					clearUserData();
				}
			}
			setIsLoading(false);
		};

		initializeUser();
	}, []);

	const clearUserData = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setUser(null);
	};

	return (
		<UserContext.Provider value={{ user, setUser, clearUserData, isLoading }}>
			{children}
		</UserContext.Provider>
	);
};
