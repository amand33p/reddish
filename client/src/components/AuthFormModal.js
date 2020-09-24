import React, { useState } from 'react';
import AuthForm from './AuthForm';

import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  IconButton,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import { withStyles } from '@material-ui/core/styles';
import { useNavStyles } from '../styles/muiStyles';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.primary.main,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const AuthFormModal = () => {
  const [open, setOpen] = useState(false);

  const classes = useNavStyles();

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
        onClick={handleClickOpen}
        className={classes.navButtons}
      >
        Login/Register
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogTitle onClose={handleClose}></DialogTitle>
        <DialogContent>
          <AuthForm closeModal={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthFormModal;
