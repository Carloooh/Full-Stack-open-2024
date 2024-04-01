import React from 'react';
import personService from '../services/persons';

const Persons = ({ persons, setPersons, handleNotification }) => {

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          handleNotification(`Deleted ${name}`);
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            handleNotification(`Person ${name} has already been deleted`, true);
            setPersons(persons.filter(person => person.id !== id));
          } else {
            handleNotification(`Failed to delete ${name}, ${error}`, true);
          }
        });
    }
  };

  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default Persons