import React from 'react';
import propTypes from 'prop-types';

import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const ToastNotif = ({ open, handleClose, severity, message }) => {
  const duration = 5;

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration * 1000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

ToastNotif.propTypes = {
  open: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  severity: propTypes.string.isRequired,
  message: propTypes.string.isRequired,
};

export default ToastNotif;
