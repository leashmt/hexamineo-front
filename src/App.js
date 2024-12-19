import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import NavBar from './pages/NavBar';
import AddStudent from './pages/AddStudent';
import AddTeacher from './pages/AddTeacher';
import CloseYear from './pages/CloseYear';
import CloseYearConfirmation from './pages/CloseYearConfirmation';
import Example from './pages/Example';
import Classes from './pages/Classes';
import ProfessorDistribution from './pages/ProfessorDistribution';
import Archives from './pages/Archives';
import Dashboard from './pages/Dashboard';
import Authentification from "./pages/Authentification";


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
				element: <Classes />,
			},
			{
				path: '/professorDistribution',
				element: <ProfessorDistribution />,
			},
			{
				path: '/addStudent',
				element: <AddStudent />,
			},
			{
				path: '/addTeacher',
				element: <AddTeacher />,
			},
			{
				path: '/archives',
				element: <Archives />,
			},
			{
				path: '/closeYear',
				element: <CloseYear />,
			},
			{
				path: '/closeYearConfirmation',
				element: <CloseYearConfirmation />,
			},
			{
				path: '/dashboard',
				element: <Dashboard />,
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
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
