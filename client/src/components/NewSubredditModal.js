import React, { useState } from 'react';
import SubredditForm from './SubredditForm';

import { DialogTitle } from './CustomDialogTitle';
import { Dialog, DialogContent, Button } from '@material-ui/core';
import { useDialogStyles } from '../styles/muiStyles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const NewSubredditModal = () => {
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
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        classes={{ paper: classes.dialogWrapper }}
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
