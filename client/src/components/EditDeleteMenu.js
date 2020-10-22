import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import DeleteDialog from './DeleteDialog';
import PostFormModal from './PostFormModal';
import { removePost } from '../reducers/postReducer';
import { notify } from '../reducers/notificationReducer';

import { IconButton, Menu } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const EditDeleteMenu = ({
  id,
  title,
  postType,
  subreddit,
  buttonType,
  textSubmission,
  linkSubmission,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async () => {
    try {
      handleClose();
      await dispatch(removePost(id));
      if (location.pathname !== '/') {
        history.push('/');
      }
      dispatch(notify(`Post deleted!`, 'success'));
    } catch (err) {
      if (err.response.data && err.response.data.message) {
        dispatch(notify(`${err.response.data.message}`, 'error'));
      } else {
        dispatch(notify(`Something went wrong.`, 'error'));
      }
    }
  };

  return (
    <div>
      {buttonType === 'buttonGroup' ? (
        <div style={{ display: 'flex' }}>
          <PostFormModal
            actionType="edit"
            handleMenuClose={handleClose}
            postToEditType={postType}
            postToEditTitle={title}
            postToEditSub={subreddit}
            postToEditId={id}
            textSubmission={textSubmission}
            linkSubmission={linkSubmission}
          />
          <DeleteDialog
            title={title}
            handleDelete={handleDeletePost}
            handleMenuClose={handleClose}
          />
        </div>
      ) : (
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
              <PostFormModal
                actionType="edit"
                handleMenuClose={handleClose}
                postToEditType={postType}
                postToEditTitle={title}
                postToEditSub={subreddit}
                postToEditId={id}
                textSubmission={textSubmission}
                linkSubmission={linkSubmission}
              />
            </div>
            <DeleteDialog
              title={title}
              handleDelete={handleDeletePost}
              handleMenuClose={handleClose}
            />
          </Menu>
        </div>
      )}
    </div>
  );
};

export default EditDeleteMenu;
