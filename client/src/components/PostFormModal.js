import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PostForm from './PostForm';
import HideOnScroll from './HideOnScroll';
import { getCircularAvatar } from '../utils/cloudinaryTransform';

import { DialogTitle, DialogContent } from './CustomDialogTitle';
import {
  Dialog,
  Button,
  Fab,
  IconButton,
  Paper,
  Avatar,
  useMediaQuery,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';
import { useDialogStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ImageIcon from '@material-ui/icons/Image';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';

const AddPostModal = ({
  actionType,
  handleMenuClose,
  postToEditType,
  postToEditTitle,
  postToEditSub,
  postToEditId,
  textSubmission,
  linkSubmission,
  fromSubreddit,
}) => {
  const [open, setOpen] = useState(false);
  const [postType, setPostType] = useState('Text');
  const user = useSelector((state) => state.user);

  const classes = useDialogStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextPost = () => {
    setPostType('Text');
    handleClickOpen();
  };

  const handleImagePost = () => {
    setPostType('Image');
    handleClickOpen();
  };

  const handleLinkPost = () => {
    setPostType('Link');
    handleClickOpen();
  };

  const handleMenuClick = () => {
    handleClickOpen();
    handleMenuClose();
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      {actionType === 'edit' ? (
        <MenuItem onClick={handleMenuClick}>
          <ListItemIcon>
            <EditIcon style={{ marginRight: 7 }} />
            Edit Post
          </ListItemIcon>
        </MenuItem>
      ) : isMobile ? (
        <HideOnScroll>
          <Fab
            className={classes.fab}
            color="primary"
            onClick={handleClickOpen}
          >
            <PostAddIcon />
          </Fab>
        </HideOnScroll>
      ) : (
        <Paper variant="outlined" className={classes.createPostWrapper}>
          {user.avatar && user.avatar.exists ? (
            <Avatar
              alt={user.username}
              src={getCircularAvatar(user.avatar.imageLink)}
            />
          ) : (
            <Avatar className={classes.defaultAvatar}>
              {user.username[0]}
            </Avatar>
          )}
          <Button
            color="primary"
            variant="outlined"
            onClick={handleTextPost}
            fullWidth
            className={classes.createBtn}
            startIcon={<PostAddIcon />}
            size="large"
          >
            Create Post
          </Button>
          <div className={classes.iconGroup}>
            <IconButton onClick={handleImagePost}>
              <ImageIcon color="primary" />
            </IconButton>
            <IconButton onClick={handleLinkPost}>
              <LinkIcon color="primary" />
            </IconButton>
          </div>
        </Paper>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialogWrapper }}
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle onClose={handleClose}>
          {actionType === 'edit' ? 'Update your post' : 'Add a new post'}
        </DialogTitle>
        <DialogContent>
          <PostForm
            actionType={actionType}
            postType={postType}
            postToEditType={postToEditType}
            postToEditTitle={postToEditTitle}
            postToEditSub={postToEditSub}
            postToEditId={postToEditId}
            textSubmission={textSubmission}
            linkSubmission={linkSubmission}
            fromSubreddit={fromSubreddit}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPostModal;
