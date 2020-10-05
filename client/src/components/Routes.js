import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PostFormModal from './PostFormModal';
import PostList from './PostList';
import PostCommentsPage from './PostCommentsPage';
import UserPage from './UserPage';

import { Container } from '@material-ui/core/';
import { useMainPaperStyles } from '../styles/muiStyles';

const Routes = () => {
  const classes = useMainPaperStyles();

  return (
    <Switch>
      <Route exact path="/">
        <Container disableGutters maxWidth="lg" className={classes.container}>
          <PostFormModal />
          <PostList />
        </Container>
      </Route>
      <Route exact path="/comments/:id">
        <PostCommentsPage />
      </Route>
      <Route exact path="/u/:username">
        <UserPage />
      </Route>
    </Switch>
  );
};

export default Routes;
