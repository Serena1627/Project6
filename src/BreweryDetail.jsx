import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BreweryDetail() {
  const { id } = useParams(); // Extract the brewery ID from the URL parameter
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    // Fetch the details of the brewery with the given ID
    async function fetchBreweryDetails() {
      try {
        const response = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBrewery(data);
        } else {
          console.error('Failed to fetch brewery details');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchBreweryDetails();
  }, [id]);

  return (
    <div>
      <h2>Brewery Details</h2>
      {brewery ? (
        <div>
          <h3>{brewery.name}</h3>
          <p>Type: {brewery.brewery_type}</p>
          <p>City: {brewery.city}</p>
          <p>State: {brewery.state}</p>
          {/* Add more details as needed */}
        </div>
      ) : (
        <p>Loading brewery details...</p>
      )}
    </div>
  );
}

export default BreweryDetail;