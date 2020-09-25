import React from 'react';
import propTypes from 'prop-types';

import { Alert, AlertTitle } from '@material-ui/lab';
import { useAlertStyles } from '../styles/muiStyles';

const AlertMessage = ({ severity, message, clearError, title }) => {
  const classes = useAlertStyles();

  return (
    <div className={classes.root}>
      <Alert severity={severity} onClose={clearError}>
        <AlertTitle>{title || 'Error'}</AlertTitle>
        {message}
      </Alert>
    </div>
  );
};

AlertMessage.propTypes = {
  severity: propTypes.string.isRequired,
  message: propTypes.string.isRequired,
  clearError: propTypes.func.isRequired,
  title: propTypes.string,
};

export default AlertMessage;
