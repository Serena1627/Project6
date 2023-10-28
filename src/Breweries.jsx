import React, { useState, useEffect } from 'react';
import BrewerySearch from './BrewerySearch';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Chart from 'chart.js';

function BreweriesList() {
  const [breweries, setBreweries] = useState([]);
  const [filteredBreweries, setFilteredBreweries] = useState([]);
  const [breweryCount, setBreweryCount] = useState(0);
  const [averageBreweriesPerState, setAverageBreweriesPerState] = useState(0);
  const [selectedType, setSelectedType] = useState('');
  const [selectedCity, setSelectedCity] = useState(''); 
  const [cityWithMostBreweries, setCityWithMostBreweries] = useState('');

  const handleSearch = (query) => {
    const filtered = breweries.filter((brewery) =>
      brewery.name.toLowerCase().includes(query.toLowerCase())
    );
    applyFilters(filtered);
  };

  const applyFilters = (data) => {
    let filteredData = data;

    if (selectedType) {
      filteredData = filteredData.filter((brewery) => brewery.brewery_type === selectedType);
    }

    if (selectedCity) {
      filteredData = filteredData.filter((brewery) => brewery.city.toLowerCase() === selectedCity.toLowerCase());
    }

    setFilteredBreweries(filteredData);
  };

  useEffect(() => {
    async function fetchBreweries() {
      try {
        const response = await fetch('https://api.openbrewerydb.org/v1/breweries');
        if (response.ok) {
          const data = await response.json();
          setBreweries(data);
          setBreweryCount(data.length);

          const states = [...new Set(data.map((brewery) => brewery.state))];
          const totalBreweriesPerState = states.map((state) => ({
            state,
            count: data.filter((brewery) => brewery.state === state).length,
          }));
          const totalBreweries = totalBreweriesPerState.reduce((acc, curr) => acc + curr.count, 0);
          setAverageBreweriesPerState(totalBreweries / states.length);

          const cities = [...new Set(data.map((brewery) => brewery.city))];
          let mostBreweries = 0;
          let cityWithMost = '';
          cities.forEach((city) => {
            const count = data.filter((brewery) => brewery.city === city).length;
            if (count > mostBreweries) {
              mostBreweries = count;
              cityWithMost = city;
            }
          });
          setCityWithMostBreweries(cityWithMost);


          applyFilters(data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchBreweries();
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  return (
    <div>
      <h1>List of Breweries</h1>
      <p>Total Number of Breweries: {breweryCount}</p>
      <p>Average Breweries Per State: {averageBreweriesPerState.toFixed(0)}</p>
      <p>City with the Most Breweries: {cityWithMostBreweries}</p>
      <BrewerySearch onSearch={handleSearch} />
      <div>
        <label htmlFor="brewery_type">Filter by Brewery Type:</label>
        <select id="brewery_type" value={selectedType} onChange={handleTypeChange}>
          <option value="">All Types</option>
          <option value="micro">Microbrewery</option>
          <option value="nano">Nanobrewery</option>
          <option value="regional">Regional Brewery</option>
          <option value="brewpub">Brewpub</option>
          <option value="large">Large Brewery</option>
          <option value="planning">Planning</option>
          <option value="bar">Bar</option>
          <option value="contract">Contract Brewing Company</option>
          <option value="proprietor">Proprietorship</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div>
        <label htmlFor="breweryCity">Filter by City:</label>
        <select id="breweryCity" value={selectedCity} onChange={handleCityChange}>
          <option value="">All Cities</option>
          {breweries.map((brewery) => (
            <option key={brewery.id} value={brewery.city}>
              {brewery.city}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Breweries by State</h2>
        {/* Use the BreweryChart component here and pass the required prop */}
        <BreweryChart breweriesByState={breweriesByState} />
      </div>
      <ul>
        {filteredBreweries.map((brewery) => (
          <li key={brewery.id}>
            <Link to={`/${brewery.id}`}>{brewery.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BreweriesList;
