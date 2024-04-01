import React, { useState } from 'react';
import personService from '../services/persons';

const AddPerson = ({ persons, setPersons, handleNotification }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      const confirmed = window.confirm(`${newName} is already added to the phonebook, replace the phone number with a new one?`);

      if (!confirmed) { return; }
      
      personService.update(existingPerson.id, { ...existingPerson, number: newNumber })
        .then(updatedPerson => {
          setPersons(persons.map(person =>
            person.id !== updatedPerson.id ? person : updatedPerson
          ));
          setNewName('');
          setNewNumber('');
          handleNotification(`Updated ${updatedPerson.name}`);
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            handleNotification(`Person ${newName} does not exist`, true);
          } else {
            handleNotification(`Failed to update person, ${error.response.data.error}`, true);
          }
        });
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };

      personService.create(personObject)
        .then(data => {
          setPersons([...persons, data]);
          setNewName('');
          setNewNumber('');
          handleNotification(`Added ${data.name}`);
        })
        .catch(error => {
          handleNotification(`Failed to add person, ${error.response.data.error}`, true);
        });
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default AddPerson;