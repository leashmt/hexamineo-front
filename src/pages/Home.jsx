import {useNavigate} from "react-router-dom"
import Button from "../components/Button"

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="flex-grow flex py-12">
          <div className="w-1/2 flex items-center justify-center">
            <h1 className="text-4xl font-bold">Bienvenue !</h1>
          </div>
    
          <div className="w-1/2 flex flex-col items-center justify-center p-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Que souhaitez-vous faire ?</h2>
          <div className="space-y-4 w-full max-w-xs">
            <Button label="Ajouter un élève" onClick={() => navigate("/addStudent")} />
            <Button label="Ajouter un professeur" onClick={() => navigate("/addTeacher")} />
            <Button label="Ajouter une classe" onClick={() => navigate("/addClasses")} />
            <Button label="Visualiser les classes" onClick={() => navigate("/classes")} />
            <Button label="Archives" onClick={() => navigate("/archives")} />
            <Button label="Clôturer l'année" color="bg-yellow-highlight" onClick={() => navigate("/closeYear")} /></div>
          </div>
        </div>
    )
}

export default Home