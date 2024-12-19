import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from "./context/UserContext"
import './App.css';
import Home from './pages/Home';
import NavBar from './pages/NavBar';
import AddStudent from './pages/AddStudent';
import AddTeacher from './pages/AddTeacher';
import CloseYear from './pages/CloseYear';
import CloseYearConfirmation from './pages/CloseYearConfirmation';
import Classes from './pages/Classes';
import ProfessorDistribution from './pages/ProfessorDistribution';
import Archives from './pages/Archives';
import Classe from './pages/Classe';
import Dashboard from './pages/Dashboard';
import Authentification from "./pages/Authentification";
import PrivateRoute from './components/PrivateRoute';

const router = createBrowserRouter([
	{
		path: '/',
		element: <NavBar />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/classes',
				element: (<PrivateRoute allowedRoles={["ADMIN", "DIRECTRICE"]} element={<Classes />} />)
			},
			{
				path: '/classe',
				element: <Classe />,
			},
			{
				path: '/classe/:niveau',
				element: <Classe />,
			},
			{
				path: '/professorDistribution',
				element: (<PrivateRoute allowedRoles={["ADMIN", "DIRECTRICE"]} element={<ProfessorDistribution />} />)
			},
			{
				path: '/addStudent',
        element: (<PrivateRoute allowedRoles={["ADMIN", "MAIRIE"]} element={<AddStudent />} />)
			},
			{
				path: '/addTeacher',
				element: (<PrivateRoute allowedRoles={["ADMIN", "MAIRIE"]} element={<AddTeacher />} />)
			},
			{
				path: '/archives',
				element: (<PrivateRoute allowedRoles={["ADMIN", "MAIRIE"]} element={<Archives />} />)
			},
			{
				path: '/closeYear',
				element: (<PrivateRoute allowedRoles={["ADMIN", "DIRECTRICE"]} element={<CloseYear />} />)
			},
			{
				path: '/closeYearConfirmation',
				element: (<PrivateRoute allowedRoles={["ADMIN", "DIRECTRICE"]} element={<CloseYearConfirmation />} />)
			},
			{
				path: '/dashboard',
				element: (<PrivateRoute allowedRoles={["ADMIN"]} element={<Dashboard />} />),
			},
      {
				path: '/auth',
				element: <Authentification />,
			},
		],
	},
]);

function App() {
	return (
		<div className="App">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
		</div>
	);
}

export default App;
