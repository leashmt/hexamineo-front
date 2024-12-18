import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CloseYear = () => {
  const [newEleveAdded, setNewEleveAdded] = useState(false);
  const [classValidate, setClassValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatus = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        setNewEleveAdded(true); 
        setClassValidate(true); 
      } catch (error) {
        console.error("Erreur pendant le chargement des données", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatus();
  }, []);

  const handleCloseYear = () => {
    if (newEleveAdded && classValidate) {
      console.log("Année clôturée");
      navigate('/closeYearConfirmation'); 
    }
  };

  const StatusIndicator = ({ status }) => (
    <div className="relative inline-block mr-3 w-8 h-8 flex items-center justify-center">
      {isLoading ? (
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-solid border-purple-custom border-t-transparent"></div>
      ) : (
        <span className={`absolute inset-0 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`}></span>
      )}
    </div>
  );

  return (
    <div class="flex flex-col items-center justify-center pt-[50px]">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-purple-custom text-center">Clôture de l'année scolaire</h1>

        <div className="mb-8 flex items-center justify-start">
          <StatusIndicator status={newEleveAdded} />
          <span className="text-lg font-semibold">Ajout des nouveaux élèves</span>
        </div>

        <div className="mb-8 flex items-center justify-start">
          <StatusIndicator status={classValidate} />
          <span className="text-lg font-semibold">Validation de toutes les classes actuelles</span>
        </div>

        <div className="mt-10">
          <button 
            onClick={handleCloseYear}
            disabled={!(newEleveAdded && classValidate)}
            className={`w-full py-3 px-6 text-white font-bold rounded-lg ${
              newEleveAdded && classValidate
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Clôturer l'année
          </button>
        </div>
      </div>
    </div>
  );
};

export default CloseYear;
