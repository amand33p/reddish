import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSubscribe } from '../reducers/subReducer';
import { notify } from '../reducers/notificationReducer';
import SubFormModal from './SubFormModal';
import LoadingSpinner from './LoadingSpinner';
import getErrorMsg from '../utils/getErrorMsg';
import storageService from '../utils/localStorage';

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

const TopSubsPanel = () => {
  const { subs, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const classes = useSubPanelStyles();
  const theme = useTheme();
  const isNotDesktop = useMediaQuery(theme.breakpoints.down('md'));

  if (isNotDesktop) {
    return null;
  }

  const loggedUser = storageService.loadUser() || user;

  const loadingSubs = !subs || !subs.topSubs;

  const isSubscribed = (subscribedBy, user) => {
    return subscribedBy.includes(user.id);
  };

  const handleJoinSub = async (id, subscribedBy, subredditName) => {
    try {
      let updatedSubscribedBy;

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
      dispatch(notify(getErrorMsg(err), 'error'));
    }
  };

  return (
    <Paper variant="outlined" className={classes.mainPaper}>
      <Paper variant="outlined" className={classes.listPaper}>
        <Typography variant="h5" color="secondary" className={classes.title}>
          Top Subreddishes
        </Typography>
        {loadingSubs ? (
          <LoadingSpinner text="Fetching subs data..." />
        ) : (
          subs.topSubs.map((s, i) => (
            <div key={s.id} className={classes.listWrapper}>
              <Typography variant="body2" className={classes.listItem}>
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
              {loggedUser && (
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
          ))
        )}
      </Paper>
      {loggedUser && <SubFormModal />}
    </Paper>
  );
};

export default TopSubsPanel;
