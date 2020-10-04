import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Typography,
  ListItemIcon,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteDialog = ({ title, handleDelete, handleMenuClose, type }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    if (type !== 'comment') {
      handleMenuClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {type !== 'comment' ? (
        <MenuItem onClick={handleClickOpen}>
          <ListItemIcon>
            <DeleteIcon style={{ marginRight: 5 }} />
            <Typography variant="subtitle2">Delete</Typography>
          </ListItemIcon>
        </MenuItem>
      ) : (
        <Button
          onClick={handleClickOpen}
          size="small"
          color="inherit"
          startIcon={<DeleteIcon />}
          style={{ textTransform: 'capitalize' }}
        >
          Delete
        </Button>
      )}
      <Dialog open={open} keepMounted onClose={handleClose}>
        <DialogTitle>
          {type !== 'comment' ? 'Delete Post?' : 'Delete Comment?'}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {type !== 'comment'
              ? `Are you sure you want to delete your post titled '${title}'? You
            can't undo this.`
              : `Are you sure you want to delete your comment?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="primary"
            variant="contained"
            size="small"
          >
            {type !== 'comment' ? 'Delete Post' : 'Delete Comment'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
