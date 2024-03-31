import React from 'react';

const CountryList = ({ countries, showCountryDetails }) => {
  return (
    <ul>
      {countries.map(country => (
        <li key={country.name.common}>
          {country.name.common} <button onClick={() => showCountryDetails(country)}>Show Info</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;