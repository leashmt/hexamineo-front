import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
				path: '/classe',
				element: <Classe />,
			},
			{
				path: '/classe/:niveau',
				element: <Classe />,
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
