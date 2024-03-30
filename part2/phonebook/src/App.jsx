import React, { useState, useEffect } from 'react';
import AddPerson from './components/AddPerson';
import Persons from './components/Persons';
import Filter from './components/Filter';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState('');
  const [notification, setNotification] = useState({ message: null, isError: false });

  useEffect(() => {
    personService.getAll()
      .then(data => setPersons(data))
      .catch(error => {
        handleNotification(`Failed to fetch data, ${error}`, true);
      });
  }, []);

  const personsToShow = !filter
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(nameFilter.toLowerCase()));

    const handleNotification = (message, isError = false) => {
      setNotification({ message, isError });
      setTimeout(() => {
        setNotification({ message: null, isError: false });
      }, 3000);
    };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} isError={notification.isError}/>
      <Filter setFilter={setFilter} setNameFilter={setNameFilter} />
      <AddPerson persons={persons} setPersons={setPersons} handleNotification={handleNotification}/>
      <Persons persons={personsToShow} setPersons={setPersons} handleNotification={handleNotification}/>
    </div>
  );
};

export default App;