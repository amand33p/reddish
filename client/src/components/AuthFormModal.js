import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AuthForm from './AuthForm';

import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  IconButton,
  MenuItem,
  useMediaQuery,
} from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';

import { useDialogStyles } from '../styles/muiStyles';
import { withStyles, useTheme } from '@material-ui/core/styles';
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

const AuthFormModal = ({ closeMobileMenu }) => {
  const [open, setOpen] = useState(false);

  const classes = useDialogStyles();
  const classesBtn = useNavStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMobileMenu = () => {
    handleClickOpen();
    closeMobileMenu();
  };

  return (
    <div>
      {isMobile ? (
        <MenuItem onClick={handleMobileMenu}>Login/Register</MenuItem>
      ) : (
        <Button
          color="primary"
          onClick={handleClickOpen}
          className={classesBtn.navButtons}
        >
          Login/Register
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        classes={{ paper: classes.dialogWrapper }}
      >
        <DialogTitle onClose={handleClose}></DialogTitle>
        <DialogContent>
          <AuthForm closeModal={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

AuthFormModal.propTypes = {
  closeMobileMenu: PropTypes.func.isRequired,
};

export default AuthFormModal;
