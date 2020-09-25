import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/userReducer';
import { initPosts } from './reducers/postReducer';
import { clearNotif } from './reducers/notificationReducer';
import NavBar from './components/NavBar';
import ToastNotif from './components/ToastNotif';
import PostsList from './components/PostsList';

import { Paper } from '@material-ui/core/';
import customTheme from './styles/customTheme';
import { useMainPaperStyles } from './styles/muiStyles';
import { ThemeProvider } from '@material-ui/core/styles';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(setUser());
    dispatch(initPosts());
  }, []);

  const classes = useMainPaperStyles();

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
        <PostsList />
      </Paper>
    </ThemeProvider>
  );
};

export default App;
