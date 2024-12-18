import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import NavBar from './pages/NavBar';
import AddStudent from './pages/AddStudent';
import AddTeacher from './pages/AddTeacher';
import Classes from './pages/Classes';
import Archives from './pages/Archives';

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
				path: '/addStudent',
				element: <AddStudent />,
			},
			{
				path: '/addTeacher',
				element: <AddTeacher />,
			},
			{
				path: '/classes',
				element: <Classes />,
			},
			{
				path: '/archives',
				element: <Archives />,
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
