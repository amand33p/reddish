import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/userReducer';
import { fetchPosts } from './reducers/postReducer';
import { setSubredditList, setTopSubsList } from './reducers/subredditReducer';
import { setDarkMode } from './reducers/themeReducer';
import { notify } from './reducers/notificationReducer';
import NavBar from './components/NavBar';
import ToastNotif from './components/ToastNotif';
import Routes from './components/Routes';

import { Paper } from '@material-ui/core/';
import customTheme from './styles/customTheme';
import { useMainPaperStyles } from './styles/muiStyles';
import { ThemeProvider } from '@material-ui/core/styles';

const App = () => {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state);

  useEffect(() => {
    dispatch(setUser());
    const setPostsAndSubreddits = async () => {
      try {
        dispatch(fetchPosts('hot'));
        dispatch(setSubredditList());
        dispatch(setTopSubsList());
        dispatch(setDarkMode());
      } catch (err) {
        if (err.response.data && err.response.data.message) {
          dispatch(notify(`${err.response.data.message}`, 'error'));
        } else {
          dispatch(notify(`Something went wrong.`, 'error'));
        }
      }
    };
    setPostsAndSubreddits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = useMainPaperStyles();

  return (
    <ThemeProvider theme={customTheme(darkMode)}>
      <Paper className={classes.root} elevation={0}>
        <ToastNotif />
        <NavBar />
        <Routes />
      </Paper>
    </ThemeProvider>
  );
};

export default App;
