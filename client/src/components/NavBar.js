import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reducers/userReducer';
import MobileUserMenu from './MobileUserMenu';
import AuthFormModal from './AuthFormModal';
import storageService from '../utils/localStorage';

import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Button,
  useMediaQuery,
} from '@material-ui/core';

import { useNavStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import RedditIcon from '@material-ui/icons/Reddit';
import FavoriteIcon from '@material-ui/icons/Favorite';

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useNavStyles();
  const userLoggedIn = storageService.loadUser() || user;

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const desktopMenu = () => {
    return userLoggedIn ? (
      <>
        <Typography color="primary">
          Welcome, {user && user.username}
        </Typography>
        <Button color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </>
    ) : (
      <>
        <AuthFormModal />
      </>
    );
  };

  return (
    <div>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <div className={classes.topLeftButton}>
            <div className={classes.logoWrapper}>
              <Typography variant="h6" className={classes.logo} color="primary">
                <RedditIcon className={classes.logoIcon} color="primary" />
                readify
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
            <MobileUserMenu user={user} handleLogout={handleLogout} />
          ) : (
            <>{desktopMenu()}</>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
