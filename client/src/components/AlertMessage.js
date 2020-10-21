import React from 'react';
import propTypes from 'prop-types';

import { Alert, AlertTitle } from '@material-ui/lab';
import { useAlertStyles } from '../styles/muiStyles';

const AlertMessage = ({ severity, error, clearError }) => {
  const classes = useAlertStyles();

  if (!error) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Alert severity={severity} onClose={clearError}>
        <AlertTitle>Error</AlertTitle>
        {error}
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
