import React, { useState } from 'react';

function ProfessorForm() {
  const [student, setStudent] = useState({
    nom: '',
    prenom: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        // Ajouter l'envoie en base de donnée
        console.log(student);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Information professeur</h2>
      
      <div>
        <label htmlFor="nom">Nom :</label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={student.nom}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="prenom">Prénom :</label>
        <input
          type="text"
          id="prenom"
          name="prenom"
          value={student.prenom}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email :</label>
        <input
          type="text"
          id="email"
          name="email"
          value={student.dateNaissance}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Inscrire l'élève</button>
    </form>
  );
}

export default ProfessorForm;
