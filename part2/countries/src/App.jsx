import React, { useState, useEffect } from 'react';
import CountrySearch from './components/CountrySearch';
import CountryList from './components/CountryList';
import CountryInfo from './components/CountryInfo';
import CountryWeather from './components/CountryWeather';
import countriesService from './services/countries';
import weatherService from './services/weather';

const App = () => {
  const [country, setCountry] = useState('');
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countriesService.getAll()
      .then(data => {
        setAllCountries(data);
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
        setAllCountries([]);
      });
  }, []);

  useEffect(() => {
    if (country.trim() === '') {
      setFilteredCountries([]);
      return;
    }

    const filtered = allCountries.filter(c => c.name.common.toLowerCase().includes(country.toLowerCase()));
    setFilteredCountries(filtered);
    
    if (filtered.length === 1) {
      setSelectedCountry(filtered[0]);
    } else {
      setSelectedCountry(null);
    }
  }, [country, allCountries]);

  useEffect(() => {
    if (selectedCountry) {
      weatherService.getWeather(selectedCountry.capital[0])
        .then(data => {
          setWeather(data);
        })
        .catch(error => {
          console.error('Error fetching weather:', error);
          setWeather(null);
        });
    }
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    const inputText = event.target.value;
    setCountry(inputText);
  };

  const showCountryDetails = (country) => { setSelectedCountry(country); };

  const hideCountryDetails = () => {
    setSelectedCountry(null);
    setWeather(null);
  };

  return (
    <div>
      <h1>Country Info</h1>
      <CountrySearch value={country} onChange={handleCountryChange} />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <>
          {selectedCountry && (
            <div>
              <button onClick={hideCountryDetails}>Hide Info</button>
              <CountryInfo country={selectedCountry} />
              {weather && <CountryWeather weather={weather} />}
            </div>
          )}
          {!selectedCountry && (
            <CountryList countries={filteredCountries} showCountryDetails={showCountryDetails} />
          )}
        </>
      )}
    </div>
  );
};

export default App;