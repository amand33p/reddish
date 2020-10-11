import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AuthFormModal from './AuthFormModal';
import { getCircularAvatar } from '../utils/cloudinaryTransform';
import storageService from '../utils/localStorage';

import {
  Button,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  ListItemIcon,
} from '@material-ui/core';
import { useUserMenuStyles } from '../styles/muiStyles';
import FilterVintageIcon from '@material-ui/icons/FilterVintage';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import FaceIcon from '@material-ui/icons/Face';

const DesktopUserMenu = ({ user, handleLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useUserMenuStyles();

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

  return (
    <div>
      {(storageService.loadUser() || user) && user ? (
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
              <Typography variant="caption">
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
            <MenuItem>
              <ListItemIcon>
                <FaceIcon style={{ marginRight: 7 }} /> Change Avatar
              </ListItemIcon>
            </MenuItem>
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <PowerSettingsNewIcon style={{ marginRight: 7 }} /> Logout
              </ListItemIcon>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <AuthFormModal />
      )}
    </div>
  );
};

export default DesktopUserMenu;
