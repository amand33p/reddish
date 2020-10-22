import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSubscribe } from '../reducers/subredditReducer';
import { notify } from '../reducers/notificationReducer';
import NewSubredditModal from './NewSubredditModal';

import {
  Paper,
  Typography,
  useMediaQuery,
  Link,
  Button,
} from '@material-ui/core';
import { useSubPanelStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';

const SubInfoPanel = () => {
  const { subreddits, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useSubPanelStyles();
  const theme = useTheme();
  const isNotDesktop = useMediaQuery(theme.breakpoints.down('md'));

  if (isNotDesktop || !subreddits || !subreddits.topSubs) {
    return null;
  }

  const isSubscribed = (subscribedBy, user) => {
    return subscribedBy.includes(user.id);
  };

  const handleJoinSub = async (id, subscribedBy, subredditName) => {
    try {
      let updatedSubscribedBy = [];

      if (subscribedBy.includes(user.id)) {
        updatedSubscribedBy = subscribedBy.filter((s) => s !== user.id);
      } else {
        updatedSubscribedBy = [...subscribedBy, user.id];
      }
      dispatch(toggleSubscribe(id, updatedSubscribedBy));

      let message = subscribedBy.includes(user.id)
        ? `Unsubscribed from r/${subredditName}`
        : `Subscribed to r/${subredditName}!`;
      dispatch(notify(message, 'success'));
    } catch (err) {
      if (err.response.data && err.response.data.message) {
        dispatch(notify(`${err.response.data.message}`, 'error'));
      } else {
        dispatch(notify(`Something went wrong.`, 'error'));
      }
    }
  };

  return (
    <Paper variant="outlined" className={classes.mainPaper}>
      <Paper variant="outlined" className={classes.listPaper}>
        <Typography variant="h5" color="secondary" className={classes.title}>
          Top 10 subreddits
        </Typography>
        {subreddits.topSubs.map((s, i) => (
          <div key={s.id} className={classes.listWrapper}>
            <Typography variant="body1" className={classes.listItem}>
              {`${i + 1}. `}
              <Link
                component={RouterLink}
                to={`/r/${s.subredditName}`}
                color="primary"
              >
                r/{s.subredditName}
              </Link>
              {` - ${s.subscriberCount} members `}
            </Typography>
            {user && (
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={
                  isSubscribed(s.subscribedBy, user) ? (
                    <CheckIcon />
                  ) : (
                    <AddIcon />
                  )
                }
                onClick={() =>
                  handleJoinSub(s.id, s.subscribedBy, s.subredditName)
                }
              >
                {isSubscribed(s.subscribedBy, user) ? 'Joined' : 'Join'}
              </Button>
            )}
          </div>
        ))}
      </Paper>
      {user && <NewSubredditModal />}
    </Paper>
  );
};

export default SubInfoPanel;
