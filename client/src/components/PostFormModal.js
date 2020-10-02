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
  Typography,
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
            <EditIcon style={{ marginRight: 10 }} />
            <Typography>Edit Post</Typography>
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
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        classes={{ paper: classes.dialogWrapper }}
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle onClose={handleClose}>
          <Typography color="primary" className={classes.dialogTitle}>
            {actionType === 'edit' ? 'Update your post' : 'Add a new post'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <PostForm
            actionType={actionType}
            postType={postType}
            closeModal={handleClose}
            postToEditType={postToEditType}
            postToEditTitle={postToEditTitle}
            postToEditSub={postToEditSub}
            postToEditId={postToEditId}
            textSubmission={textSubmission}
            linkSubmission={linkSubmission}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddPostModal;
