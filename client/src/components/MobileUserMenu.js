import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AuthFormModal from './AuthFormModal';
import NewSubredditModal from './NewSubredditModal';
import UpdateAvatarModal from './UpdateAvatarModal';
import { getCircularAvatar } from '../utils/cloudinaryTransform';
import storageService from '../utils/localStorage';

import {
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
} from '@material-ui/core';
import { useUserMenuStyles } from '../styles/muiStyles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import FaceIcon from '@material-ui/icons/Face';

const MobileUserMenu = ({ user, handleLogout }) => {
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
        <IconButton onClick={handleMenu} className={classes.userBtnMob}>
          {user.avatar && user.avatar.exists ? (
            <Avatar
              alt={user.username}
              src={getCircularAvatar(user.avatar.imageLink)}
              className={classes.avatar}
            />
          ) : (
            <Avatar
              style={{ backgroundColor: '#941a1c' }}
              className={classes.avatar}
            >
              {user.username[0]}
            </Avatar>
          )}
          <MoreVertIcon color="primary" />
        </IconButton>
      ) : (
        <IconButton onClick={handleMenu} color="primary">
          <MoreVertIcon color="primary" />
        </IconButton>
      )}
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
        {(storageService.loadUser() || user) && user ? (
          <div>
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
            <UpdateAvatarModal handleCloseMenu={handleClose} />
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <PowerSettingsNewIcon style={{ marginRight: 7 }} /> Logout
              </ListItemIcon>
            </MenuItem>
          </div>
        ) : (
          <div>
            <AuthFormModal closeMobileMenu={handleClose} />
          </div>
        )}
      </Menu>
    </div>
  );
};

export default MobileUserMenu;
