import { Link, Outlet } from 'react-router-dom';
import footerImage from '../imgs/footer-little-prince.png';

const NavBar = () => {
	return (
		<div className="bg-white-background min-h-screen flex flex-col">
			<header className="py-4 shadow-lg">
				<nav className="flex justify-center space-x-6 text-lg">
					<div className="flex space-x-8">
						<Link to="/" className="hover:text-yellow-highlight">
							Accueil
						</Link>
						<Link to="/addStudent" className="hover:text-yellow-highlight">
							Ajouter des élèves
						</Link>
						<Link to="/addTeacher" className="hover:text-yellow-highlight">
							Ajouter des professeurs
						</Link>
						<Link to="/classes" className="hover:text-yellow-highlight">
							Visualiser les classes
						</Link>
						<Link to="/archives" className="hover:text-yellow-highlight">
							Archives
						</Link>
						<Link
							to="/professorDistribution"
							className="hover:text-yellow-highlight"
						>
							Répartition des professeurs
						</Link>
						<Link to="/auth" className="hover:text-yellow-highlight">
							Login/Register
						</Link>
					</div>
				</nav>
			</header>
			<main className="flex-grow">
				<Outlet />
			</main>
			<div className="w-full">
				<img
					src={footerImage}
					alt="Silhouette du petit prince"
					className="w-full object-cover"
				/>
			</div>
			<footer className="w-full bg-purple-custom text-white py-4">
				<div className="container mx-auto">
					<p>@2024 Hexamineo. Tous droits réservés.</p>
				</div>
			</footer>
		</div>
	);
};

export default NavBar;
