import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './reducers/userReducer';
import { initPosts } from './reducers/postReducer';
import { setSubredditList } from './reducers/subredditReducer';
import { clearNotif } from './reducers/notificationReducer';
import NavBar from './components/NavBar';
import ToastNotif from './components/ToastNotif';
import PostsList from './components/PostsList';
import AddPostModal from './components/AddPostModal';

import { Paper, Container } from '@material-ui/core/';
import customTheme from './styles/customTheme';
import { useMainPaperStyles } from './styles/muiStyles';
import { ThemeProvider } from '@material-ui/core/styles';

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(setUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const setPostsandSubreddits = async () => {
      try {
        dispatch(initPosts());
        dispatch(setSubredditList());
      } catch (err) {
        console.log(err.message);
      }
    };

    setPostsandSubreddits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Container disableGutters maxWidth="lg" className={classes.container}>
          {user && <AddPostModal />}
          <PostsList />
        </Container>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
