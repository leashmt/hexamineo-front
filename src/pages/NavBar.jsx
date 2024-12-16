import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-black relative">
      <header className="absolute top-0 w-full py-4 flex justify-center">
        <nav className="flex space-x-6 text-lg">
          <Link to="/" className="hover:underline">
            Accueil
          </Link>
          <Link to="/example" className="hover:underline">
            Example
          </Link>
          <Link to="/register" className="hover:underline">
            Inscription
          </Link>
          <Link to="/login" className="hover:underline">
            Connexion
          </Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
};

export default NavBar;
