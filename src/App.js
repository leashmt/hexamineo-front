import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import NavBar from "./pages/NavBar";
import Example from "./pages/Example";
import Classes from "./pages/Classes";


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
        path: "/example",
        element: <Example/>
      },
      {
        path: "/classes",
        element: <Classes/>
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
