import React, { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSubreddit,
  toggleUpvote,
  toggleDownvote,
  toggleSubscribe,
} from '../reducers/subredditPageReducer';
import PostCard from './PostCard';
import PostFormModal from './PostFormModal';

import { Container, Paper, Typography, Button, Link } from '@material-ui/core';
import { useSubredditPageStyles } from '../styles/muiStyles';
import CakeIcon from '@material-ui/icons/Cake';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import CheckIcon from '@material-ui/icons/Check';
import GroupIcon from '@material-ui/icons/Group';
import AddIcon from '@material-ui/icons/Add';

const SubredditPage = () => {
  const subredditInfo = useSelector((state) => state.subredditPage);
  const user = useSelector((state) => state.user);
  const { subreddit } = useParams();
  const dispatch = useDispatch();
  const classes = useSubredditPageStyles();

  useEffect(() => {
    if (!subredditInfo || subredditInfo.subredditName !== subreddit) {
      const getSubreddit = async () => {
        try {
          dispatch(fetchSubreddit(subreddit));
        } catch (err) {
          console.log(err.message);
        }
      };
      getSubreddit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subredditInfo]);

  if (!subredditInfo) {
    return null;
  }

  const {
    subredditName,
    subscribedBy,
    subscriberCount,
    description,
    admin,
    createdAt,
    posts,
    id,
  } = subredditInfo;

  const isSubscribed = user && subscribedBy.includes(user.id);

  const handleSubJoin = async () => {
    try {
      let updatedSubscribedBy = [];

      if (isSubscribed) {
        updatedSubscribedBy = subscribedBy.filter((s) => s !== user.id);
      } else {
        updatedSubscribedBy = [...subscribedBy, user.id];
      }
      dispatch(toggleSubscribe(id, updatedSubscribedBy));
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Container disableGutters>
      <Paper variant="outlined" className={classes.mainPaper}>
        <Paper variant="outlined" className={classes.subInfoWrapper}>
          <div>
            <Typography variant="h6" color="secondary">
              r/{subredditName}
            </Typography>
            <Typography variant="body1">{description}</Typography>
            <Typography
              variant="body2"
              className={classes.iconText}
              color="secondary"
            >
              <CakeIcon /> Created
              {' ' +
                String(new Date(createdAt)).split(' ').slice(1, 4).join(' ')}
            </Typography>
            <Typography
              variant="body2"
              color="secondary"
              className={classes.iconText}
            >
              <SupervisorAccountIcon />
              Admin:
              <Link
                component={RouterLink}
                to={`/u/${admin.username}`}
                style={{ marginLeft: '0.3em' }}
              >
                u/{admin.username}
              </Link>
            </Typography>
          </div>
          <div className={classes.flexItem}>
            <Button
              color="primary"
              variant="contained"
              size="large"
              startIcon={isSubscribed ? <CheckIcon /> : <AddIcon />}
              className={classes.joinBtn}
              onClick={handleSubJoin}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </Button>
            <Typography
              variant="body1"
              color="primary"
              className={classes.iconText}
            >
              <GroupIcon />
              {subscriberCount} subscribers
            </Typography>
          </div>
        </Paper>
        <PostFormModal fromSubreddit={{ subredditName, id }} />
        <div>
          {posts.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              toggleUpvote={toggleUpvote}
              toggleDownvote={toggleDownvote}
            />
          ))}
        </div>
      </Paper>
    </Container>
  );
};

export default SubredditPage;
