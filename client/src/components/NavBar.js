import React, { useState } from 'react';
import AuthFormModal from './AuthFormModal';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Link,
} from '@material-ui/core';

import { useNavStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import RedditIcon from '@material-ui/icons/Reddit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useNavStyles();

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const mobileMenu = () => {
    return (
      <div>
        <MenuItem onClick={() => handleClose()}>Login/Register</MenuItem>
      </div>
    );
  };

  const desktopMenu = () => {
    return (
      <>
        <AuthFormModal />
      </>
    );
  };

  return (
    <div className={classes.main}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <div className={classes.topLeftButton}>
            <div className={classes.logoWrapper}>
              <Typography variant="h6" className={classes.logo} color="primary">
                <RedditIcon className={classes.logoIcon} color="primary" />
                Readify
              </Typography>
              <Typography variant="caption" color="secondary">
                Made with <FavoriteIcon style={{ fontSize: 12 }} /> by
                <Link
                  href={'https://github.com/amand33p'}
                  color="inherit"
                  target="_blank"
                  rel="noopener"
                >
                  <strong>{` amand33p`}</strong>
                </Link>
              </Typography>
            </div>
          </div>
          {isMobile ? (
            <>
              <IconButton onClick={handleMenu} color="primary">
                <MoreVertIcon color="primary" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {mobileMenu()}
              </Menu>
            </>
          ) : (
            <>{desktopMenu()}</>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
