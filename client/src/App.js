import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/userReducer';
import { clearNotif } from './reducers/notificationReducer';
import NavBar from './components/NavBar';
import ToastNotif from './components/ToastNotif';

import { Paper } from '@material-ui/core/';
import { useMainPaperStyles } from './styles/muiStyles';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

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
        main: '#941a1c',
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Paper className={classes.root} elevation={0}>
        {notification && (
          <ToastNotif
            open={!!notification}
            handleClose={() => dispatch(clearNotif())}
            severity={notification.severity}
            message={notification.message}
          />
        )}
        <NavBar />
      </Paper>
    </ThemeProvider>
  );
};

export default App;
