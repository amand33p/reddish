import React, { useState } from 'react';
import SubredditForm from './SubredditForm';

import { DialogTitle } from './CustomDialogTitle';
import {
  Dialog,
  DialogContent,
  Button,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';
import { useDialogStyles } from '../styles/muiStyles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const NewSubredditModal = ({ type }) => {
  const [open, setOpen] = useState(false);

  const classes = useDialogStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {type !== 'menu' ? (
        <Button
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
          fullWidth
          className={classes.createSubBtn}
          size="large"
          startIcon={<AddCircleIcon />}
        >
          Create New Subreddit
        </Button>
      ) : (
        <MenuItem onClick={handleClickOpen}>
          <ListItemIcon>
            <AddCircleIcon style={{ marginRight: 7 }} />
            Create Subreddit
          </ListItemIcon>
        </MenuItem>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        classes={{ paper: classes.dialogWrapper }}
        fullWidth
      >
        <DialogTitle onClose={handleClose}></DialogTitle>
        <DialogContent>
          <SubredditForm closeModal={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewSubredditModal;
