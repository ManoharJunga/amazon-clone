import React from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import ListIcon from '@mui/icons-material/List';

function SearchBar() {
  return (
    <div className='searchBar'>
      <button className="searchButton">
        <SearchIcon />
      </button>
      <input type="text" className="searchInput" placeholder="Search..." />
      <button className="listButton">
        <ListIcon />
      </button>
      
    </div>
  );
}

export default SearchBar;
