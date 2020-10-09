import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PostFormModal from './PostFormModal';
import PostList from './PostList';
import PostCommentsPage from './PostCommentsPage';
import UserPage from './UserPage';
import SubredditPage from './SubredditPage';
import SubInfoPanel from './SubInfoPanel';

import { Container } from '@material-ui/core/';
import { useMainPaperStyles } from '../styles/muiStyles';

const Routes = () => {
  const classes = useMainPaperStyles();

  return (
    <Switch>
      <Route exact path="/">
        <Container disableGutters maxWidth="lg" className={classes.homepage}>
          <div className={classes.postsPanel}>
            <PostFormModal />
            <PostList />
          </div>
          <SubInfoPanel />
        </Container>
      </Route>
      <Route exact path="/comments/:id">
        <PostCommentsPage />
      </Route>
      <Route exact path="/u/:username">
        <UserPage />
      </Route>
      <Route exact path="/r/:subreddit">
        <SubredditPage />
      </Route>
    </Switch>
  );
};

export default Routes;
