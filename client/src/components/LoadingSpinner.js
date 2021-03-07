import React from 'react';
import { Typography, CircularProgress } from '@material-ui/core';
import { usePostListStyles } from '../styles/muiStyles';

const LoadingSpinner = ({ text }) => {
  const classes = usePostListStyles();

  return (
    <div className={classes.loadSpinner}>
      <CircularProgress size="6em" disableShrink />
      <Typography color="primary" variant="body1">
        {text}
      </Typography>
    </div>
  );
};

export default LoadingSpinner;
