import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AddPostForm from './AddPostForm';
import HideOnScroll from './HideOnScroll';
import { getCircularAvatar } from '../utils/cloudinaryTransform';

import DialogTitle from './CustomDialogTitle';
import {
  Dialog,
  DialogContent,
  Button,
  Fab,
  IconButton,
  Paper,
  Avatar,
  useMediaQuery,
} from '@material-ui/core';
import { useDialogStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ImageIcon from '@material-ui/icons/Image';
import LinkIcon from '@material-ui/icons/Link';

const AddPostModal = () => {
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

  const handleImagePost = () => {
    setPostType('Image');
    handleClickOpen();
  };

  const handleLinkPost = () => {
    setPostType('Link');
    handleClickOpen();
  };

  return (
    <div>
      {user &&
        (isMobile ? (
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
              <Avatar style={{ backgroundColor: '#941a1c' }}>
                {user.username[0]}
              </Avatar>
            )}
            <Button
              color="primary"
              variant="outlined"
              onClick={handleClickOpen}
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
        ))}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle onClose={handleClose}></DialogTitle>
        <DialogContent>
          <AddPostForm postType={postType} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPostModal;
