import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AuthFormModal from './AuthFormModal';
import NewSubredditModal from './NewSubredditModal';
import UpdateAvatarModal from './UpdateAvatarModal';
import DarkModeMenuItem from './DarkModeMenuItem';
import { getCircularAvatar } from '../utils/cloudinaryTransform';
import storageService from '../utils/localStorage';

import {
  Button,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  ListItemIcon,
  Divider,
} from '@material-ui/core';
import { useUserMenuStyles } from '../styles/muiStyles';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const DesktopUserMenu = ({ user, handleLogout }) => {
  const classes = useUserMenuStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    handleLogout();
  };

  const loggedUser = storageService.loadUser() || user;

  return (
    <div>
      {loggedUser ? (
        <>
          <Button onClick={handleMenu} className={classes.userBtn}>
            {user.avatar && user.avatar.exists ? (
              <Avatar
                alt={user.username}
                src={getCircularAvatar(user.avatar.imageLink)}
                variant="rounded"
                className={classes.avatar}
              />
            ) : (
              <Avatar
                style={{ backgroundColor: '#941a1c' }}
                variant="rounded"
                className={classes.avatar}
              >
                {user.username[0]}
              </Avatar>
            )}
            <div>
              <Typography color="secondary">{user.username}</Typography>
              <Typography variant="caption" className={classes.karmaWrapper}>
                <FilterVintageIcon
                  fontSize="inherit"
                  style={{ marginRight: '0.2em' }}
                  color="secondary"
                />
                {user.karma} karma
              </Typography>
            </div>
          </Button>
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
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              component={RouterLink}
              to={`/u/${user.username}`}
              onClick={handleClose}
            >
              <ListItemIcon>
                <AccountCircleIcon style={{ marginRight: 7 }} /> My Profile
              </ListItemIcon>
            </MenuItem>
            <NewSubredditModal type="menu" handleCloseMenu={handleClose} />
            <UpdateAvatarModal handleCloseMenu={handleClose} user={user} />
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <PowerSettingsNewIcon style={{ marginRight: 7 }} /> Logout
              </ListItemIcon>
            </MenuItem>
            <Divider variant="middle" />
            <DarkModeMenuItem closeMenu={handleClose} />
          </Menu>
        </>
      ) : (
        <div className={classes.navItems}>
          <AuthFormModal />
          <DarkModeMenuItem closeMenu={handleClose} navItem={true} />
        </div>
      )}
    </div>
  );
};

export default DesktopUserMenu;
