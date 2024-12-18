import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import NavBar from "./pages/NavBar";
import AddStudent from "./pages/AddStudent";
import AddTeacher from "./pages/AddTeacher";
import CloseYear from "./pages/CloseYear";
import CloseYearConfirmation from "./pages/CloseYearConfirmation";



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
      {
        path: "/closeYear",
        element: <CloseYear/>
      },
      {
        path: "/closeYearConfirmation" ,
        element: <CloseYearConfirmation/>
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
