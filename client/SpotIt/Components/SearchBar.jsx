import React from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  return (
    <div className='searchBar'>
      <input type="text" className="searchInput" placeholder="Search..." />
      <button className="searchButton">
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchBar;
