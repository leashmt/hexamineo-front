import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';

const Home = () => {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const profLevel = user?.niveau
		? user.niveau.replace(/è|é/g, 'e').replace(/\s+/g, '-')
		: '';

	return (
		<div className="flex-grow flex py-12">
			<div className="w-1/2 flex items-center justify-center">
				<h1 className="text-4xl font-bold">
					{user
						? `Bienvenue ${user.name} !`
						: 'Bienvenue, veuillez vous connecter'}
				</h1>
			</div>
			<div className="w-1/2 flex flex-col items-center justify-center p-8">
				{user ? (
					<>
						<h2 className="text-2xl font-semibold text-gray-700 mb-6">
							Que souhaitez-vous faire ?
						</h2>
						<div className="space-y-4 w-full max-w-xs">
							{['ADMIN'].includes(user.role) && (
								<>
									<Button
										label="Dashboard"
										onClick={() => navigate('/dashboard')}
									/>
								</>
							)}
							{['ADMIN', 'MAIRIE'].includes(user.role) && (
								<>
									<Button
										label="Ajouter un élève"
										onClick={() => navigate('/addStudent')}
									/>
									<Button
										label="Ajouter un professeur"
										onClick={() => navigate('/addTeacher')}
									/>
									<Button
										label="Archives"
										onClick={() => navigate('/archives')}
									/>
								</>
							)}
							{['ADMIN', 'DIRECTRICE'].includes(user.role) && (
								<>
									<Button
										label="Visualiser les classes"
										onClick={() => navigate('/classes')}
									/>
									<Button
										label="Répartition des professeurs"
										onClick={() => navigate('/professorDistribution')}
									/>
									<Button
										label="Clôturer l'année"
										color="bg-yellow-highlight"
										onClick={() => navigate('/closeYear')}
									/>
								</>
							)}
							{['PROFESSEUR'].includes(user.role) && (
								<>
									<Button
										label="Voir ma classe"
										color="bg-yellow-highlight"
										onClick={() => navigate(`/classe/${profLevel}`)}
									/>
								</>
							)}
						</div>
					</>
				) : (
					<Button label="Se connecter" onClick={() => navigate('/auth')} />
				)}
			</div>
		</div>
	);
};

export default Home;
