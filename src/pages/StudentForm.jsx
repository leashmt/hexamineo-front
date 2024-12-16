import React, { useState } from 'react';

function StudentForm() {
  const [student, setStudent] = useState({
    nom: '',
    prenom: '',
    dateNaissance: '',
    niveau: '',
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
      <h2>Inscription d'un nouvel élève</h2>
      
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
        <label htmlFor="dateNaissance">Date de naissance :</label>
        <input
          type="date"
          id="dateNaissance"
          name="dateNaissance"
          value={student.dateNaissance}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="niveau">Niveau :</label>
        <select
          id="niveau"
          name="niveau"
          value={student.niveau}
          onChange={handleChange}
          required
        >
          <option value="">Sélectionnez un niveau</option>
          <option value="FirstSection">1ère section maternelle</option>
          <option value="SecondSection">2ème section maternelle</option>
          <option value="ThirdSection">3ème section maternelle</option>
          <option value="CP">CP</option>
          <option value="CE1">CE1</option>
          <option value="CE2">CE2</option>
          <option value="CM1">CM1</option>
          <option value="CM2">CM2</option>
        </select>
      </div>
      <button type="submit">Inscrire l'élève</button>
    </form>
  );
}

export default StudentForm;
