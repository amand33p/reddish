import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  ListItemIcon,
  Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const DeleteDialog = ({ title, handleDelete, handleMenuClose }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    handleMenuClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
          <DeleteIcon style={{ marginRight: 10 }} />
          <Typography>Delete</Typography>
        </ListItemIcon>
      </MenuItem>
      <Dialog open={open} keepMounted onClose={handleClose}>
        <DialogTitle>Delete Post?</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Are you sure you want to delete your post titled '{title}'? You
            can't undo this.
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
            Delete Post
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
