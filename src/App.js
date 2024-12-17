import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import NavBar from "./pages/NavBar";
import Example from "./pages/Example";
import AddStudent from "./pages/AddStudent";


const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    children : [
      {
        index: true,
        element: <AddStudent />
      },
      {
        path: "/example",
        element: <Example/>
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
