import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import DeleteDialog from './DeleteDialog';
import AddPostModal from './AddPostModal';
import { removePost } from '../reducers/postReducer';

import { IconButton, Menu } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const EditDeleteMenu = ({ id, title, postType, subreddit }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <div>
          <AddPostModal
            actionType="edit"
            handleMenuClose={handleClose}
            postToEditType={postType}
            postToEditTitle={title}
            postToEditSub={subreddit}
            postToEditId={id}
          />
        </div>
        <DeleteDialog
          title={title}
          handleDelete={handleDeletePost}
          handleMenuClose={handleClose}
        />
      </Menu>
    </div>
  );
};

export default EditDeleteMenu;
