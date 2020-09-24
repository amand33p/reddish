import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './reducers/userReducer';
import NavBar from './components/NavBar';

import { Paper } from '@material-ui/core/';
import { useMainPaperStyles } from './styles/muiStyles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUser());
  }, []);

  const classes = useMainPaperStyles();

  const customTheme = createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#FF5700',
      },
      secondary: {
        main: '#b33d00',
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Paper className={classes.root} elevation={0}>
        <NavBar />
      </Paper>
    </ThemeProvider>
  );
};

export default App;
