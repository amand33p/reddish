import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { logoutUser } from '../reducers/userReducer';
import MobileUserMenu from './MobileUserMenu';
import DesktopUserMenu from './DesktopUserMenu';
import SearchBar from './SearchBar';

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

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <div className={classes.leftPortion}>
            <div className={classes.logoWrapper}>
              <Button
                className={classes.logo}
                color="primary"
                component={RouterLink}
                to="/"
                startIcon={<RedditIcon fontSize="large" />}
              >
                readify
              </Button>
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
            <SearchBar />
          </div>
          {isMobile ? (
            <MobileUserMenu user={user} handleLogout={handleLogout} />
          ) : (
            <DesktopUserMenu user={user} handleLogout={handleLogout} />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
