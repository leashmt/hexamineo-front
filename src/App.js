import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import NavBar from "./pages/NavBar";
import AddStudent from "./pages/AddStudent";
import AddTeacher from "./pages/AddTeacher";


const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children : [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/addStudent",
        element: <AddStudent/>
      },
      {
        path: "/addTeacher",
        element: <AddTeacher/>
      },
    ]
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
