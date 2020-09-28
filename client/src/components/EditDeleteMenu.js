import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DeleteDialog from './DeleteDialog';
import { removePost } from '../reducers/postReducer';

import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import EditIcon from '@material-ui/icons/Edit';

const EditDeleteMenu = ({ id, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditPost = () => {
    handleClose();
  };

  const handleDeletePost = async () => {
    try {
      handleClose();
      dispatch(removePost(id));
    } catch (err) {
      console.log(err.response.data.error);
    }
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEditPost}>
          <ListItemIcon>
            <EditIcon style={{ marginRight: 10 }} />
            <Typography>Edit Post</Typography>
          </ListItemIcon>
        </MenuItem>
        <DeleteDialog title={title} handleDelete={handleDeletePost} />
      </Menu>
    </div>
  );
};

export default EditDeleteMenu;
