import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { InputAdornment, IconButton, TextField } from '@material-ui/core';
import { useNavStyles } from '../styles/muiStyles';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const SearchBar = ({ isMobile, setSearchOpen }) => {
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();
  const classes = useNavStyles();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput === '') return;
    history.push(`/search/${searchInput}`);
  };

  const clearSearch = () => {
    if (isMobile) {
      setSearchOpen(false);
    }
    setSearchInput('');
  };

  return (
    <div className={classes.search}>
      <form onSubmit={handleSearch}>
        <TextField
          type="search"
          placeholder="Search for posts…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={classes.inputField}
          variant="outlined"
          margin="dense"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
            endAdornment: (searchInput || isMobile) && (
              <InputAdornment position="end">
                <IconButton color="primary" size="small" onClick={clearSearch}>
                  <HighlightOffIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
