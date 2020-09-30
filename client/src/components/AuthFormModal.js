import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AuthForm from './AuthForm';

import { DialogTitle } from './CustomDialogTitle';
import {
  Dialog,
  DialogContent,
  Button,
  IconButton,
  MenuItem,
  useMediaQuery,
} from '@material-ui/core';

import { useDialogStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import { useNavStyles } from '../styles/muiStyles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const AuthFormModal = ({ closeMobileMenu, type }) => {
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
      {type === 'upvote' ? (
        <IconButton
          onClick={handleClickOpen}
          fontSize={isMobile ? 'small' : 'medium'}
        >
          <ArrowUpwardIcon style={{ color: '#b2b2b2' }} />
        </IconButton>
      ) : type === 'downvote' ? (
        <IconButton
          onClick={handleClickOpen}
          fontSize={isMobile ? 'small' : 'medium'}
        >
          <ArrowDownwardIcon style={{ color: '#b2b2b2' }} />
        </IconButton>
      ) : isMobile ? (
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
  closeMobileMenu: PropTypes.func,
};

export default AuthFormModal;
