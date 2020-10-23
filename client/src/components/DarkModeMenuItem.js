import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode } from '../reducers/themeReducer';

import { MenuItem, ListItemIcon, IconButton } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';

const DarkModeMenuItem = ({ closeMenu, navItem }) => {
  const { darkMode } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDarkMode = () => {
    dispatch(toggleDarkMode(!darkMode));
    closeMenu();
  };

  if (navItem) {
    return (
      <IconButton color="primary" onClick={handleDarkMode}>
        {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    );
  }

  return (
    <MenuItem onClick={handleDarkMode}>
      <ListItemIcon>
        {darkMode ? (
          <Brightness4Icon style={{ marginRight: 7 }} />
        ) : (
          <Brightness7Icon style={{ marginRight: 7 }} />
        )}
        Dark Mode: {darkMode ? ' ON' : ' OFF'}
      </ListItemIcon>
    </MenuItem>
  );
};

export default DarkModeMenuItem;
