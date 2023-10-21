import React, { useState } from 'react';
import PropTypes from 'prop-types';

function BrewerySearch({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Brewery Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

BrewerySearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
  };
  

export default BrewerySearch;