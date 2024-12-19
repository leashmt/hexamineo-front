import React, { useState } from 'react';
import { Link, Outlet } from "react-router-dom";
import footerImage from "../imgs/footer-little-prince.png";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import logo from '../imgs/logo.png';

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
  const { user } = useContext(UserContext);

	return (
		<div className="bg-white-background min-h-screen flex flex-col">
			<header className="py-4 shadow-lg relative">
				<nav className="container mx-auto flex items-center justify-between px-4">
					<div className="flex items-center">
						<Link to="/">
							<img src={logo} alt="Logo" className="h-10 mr-4" />
						</Link>
					</div>
					<div className="lg:hidden">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="text-purple-custom p-2 rounded-md focus:outline-none"
						>
							{isOpen ? '✕' : '☰'}
						</button>
					</div>

					{/* Menu pour desktop */}
					<div className="hidden lg:flex space-x-4 lg:space-x-8 items-center">
          {user ? (
              <>
                {["ADMIN", "MAIRIE"].includes(user.role) && (
                  <>
                    <Link to="/addStudent" className="hover:text-purple-custom">
                      Ajouter des élèves
                    </Link>
                    <Link to="/addTeacher" className="hover:text-purple-custom">
                      Ajouter des professeurs
                    </Link>
                    <Link to="/archives" className="hover:text-yellow-highlight">
                      Archives
                    </Link>
                  </>
                )}
                {["ADMIN", "DIRECTRICE"].includes(user.role) && (
                  <>
                    <Link to="/classes" className="hover:text-purple-custom">
                      Visualiser les classes
                    </Link>
                    <Link
                      to="/professorDistribution"
                      className="hover:text-yellow-highlight"
                    >
                      Répartition des professeurs
                    </Link>
                  </>
                )}
                {["ADMIN"].includes(user.role) && (
                  <>
                    <Link to="/dashboard" className="hover:text-yellow-highlight">
                      Dashboard
                    </Link>
                  </>
                )}
                <p className="text-gray-700">Bonjour {user.name}</p>
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="hover:text-red-500"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/auth" className="hover:text-purple-custom">
                Login
              </Link>
            )}
          </div>
				</nav>

				{/* Menu mobile */}
				<div
					className={`lg:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300 ease-in-out ${
						isOpen
							? 'max-h-96 opacity-100'
							: 'max-h-0 opacity-0 overflow-hidden'
					}`}
				>
					<div className="px-4 py-2 space-y-2">
          {user ? (
              <>
                <p className="text-purple-custom">Bonjour {user.name}</p>
                {["ADMIN", "MAIRIE"].includes(user.role) && (
                  <>
                    <Link to="/addStudent" className="block py-2 px-4 hover:bg-purple-custom hover:bg-opacity-65 rounded-md transition duration-200">
                      Ajouter des élèves
                    </Link>
                    <Link to="/addTeacher" className="block py-2 px-4 hover:bg-purple-custom hover:bg-opacity-65 rounded-md transition duration-200">
                      Ajouter des professeurs
                    </Link>
                    <Link to="/archives" className="block py-2 px-4 hover:bg-purple-custom hover:bg-opacity-65 rounded-md transition duration-200">
                      Archives
                    </Link>
                  </>
                )}
                {["ADMIN", "DIRECTRICE"].includes(user.role) && (
                  <>
                    <Link to="/classes" className="block py-2 px-4 hover:bg-purple-custom hover:bg-opacity-65 rounded-md transition duration-200">
                      Visualiser les classes
                    </Link>
                    <Link
                      to="/professorDistribution" className="block py-2 px-4 hover:bg-purple-custom hover:bg-opacity-65 rounded-md transition duration-200">
                      Répartition des professeurs
                    </Link>
                  </>
                )}
                {["ADMIN"].includes(user.role) && (
                  <>
                    <Link to="/dashboard" className="block py-2 px-4 hover:bg-purple-custom hover:bg-opacity-65 rounded-md transition duration-200">
                      Dashboard
                    </Link>
                  </>
                )}
                <button
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                  className="hover:text-red-500"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link to="/auth" className="block py-2 px-4 hover:bg-purple-custom hover:bg-opacity-65 rounded-md transition duration-200">
                Login
              </Link>
            )}
          </div>
				</div>
			</header>

			<main className="flex-grow">
				<Outlet />
			</main>
			<div className="flex w-full">
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

