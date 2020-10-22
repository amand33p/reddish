import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotif } from '../reducers/notificationReducer';

import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const ToastNotif = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  const { message, severity } = notification;
  const open = !!notification;
  const duration = 5;

  const handleNotifClose = () => {
    dispatch(clearNotif());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration * 1000}
      onClose={handleNotifClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleNotifClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotif;
