import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSubreddit,
  toggleUpvote,
  toggleDownvote,
  toggleSubscribe,
  editDescription,
  loadSubPosts,
} from '../reducers/subredditPageReducer';
import SortTabBar from './SortTabBar';
import PostCard from './PostCard';
import PostFormModal from './PostFormModal';

import {
  Container,
  Paper,
  Typography,
  Button,
  Link,
  TextField,
} from '@material-ui/core';
import { useSubredditPageStyles } from '../styles/muiStyles';
import CakeIcon from '@material-ui/icons/Cake';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import CheckIcon from '@material-ui/icons/Check';
import GroupIcon from '@material-ui/icons/Group';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import AutorenewIcon from '@material-ui/icons/Autorenew';

const SubredditPage = () => {
  const sub = useSelector((state) => state.subredditPage);
  const user = useSelector((state) => state.user);
  const [editOpen, setEditOpen] = useState(false);
  const [descInput, setDescInput] = useState('');
  const [sortBy, setSortBy] = useState('hot');
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const { subreddit } = useParams();
  const dispatch = useDispatch();
  const classes = useSubredditPageStyles();

  useEffect(() => {
    if (!sub || sub.subDetails.subredditName !== subreddit) {
      const getSubreddit = async () => {
        try {
          dispatch(fetchSubreddit(subreddit, 'hot'));
        } catch (err) {
          console.log(err.message);
        }
      };
      getSubreddit();
    }

    if (sub) {
      setDescInput(sub.subDetails.description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sub]);

  if (!sub) {
    return null;
  }

  const {
    subredditName,
    subscribedBy,
    subscriberCount,
    description,
    admin,
    createdAt,
    id,
  } = sub.subDetails;

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

  const handleEditDescription = () => {
    try {
      dispatch(editDescription(id, descInput));
      setEditOpen(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleSortChange = async (e, newValue) => {
    try {
      await dispatch(fetchSubreddit(subreddit, newValue));
      setSortBy(newValue);
      if (page !== 1) {
        setPage(1);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleLoadPosts = async () => {
    try {
      setLoadingMore(true);
      await dispatch(loadSubPosts(subreddit, sortBy, page + 1));
      setPage((prevState) => prevState + 1);
      setLoadingMore(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Container disableGutters>
      <Paper variant="outlined" className={classes.mainPaper}>
        <Paper variant="outlined" className={classes.subInfoWrapper}>
          <div className={classes.firstPanel}>
            <Typography variant="h6" color="secondary">
              r/{subredditName}
            </Typography>
            <div className={classes.description}>
              {!editOpen ? (
                <Typography variant="body1">{description}</Typography>
              ) : (
                <div className={classes.inputDiv}>
                  <TextField
                    multiline
                    required
                    fullWidth
                    rows={2}
                    rowsMax={Infinity}
                    value={descInput}
                    onChange={(e) => setDescInput(e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                  <div className={classes.submitBtns}>
                    <Button
                      onClick={() => setEditOpen(false)}
                      color="primary"
                      variant="outlined"
                      size="small"
                      className={classes.cancelBtn}
                      style={{ padding: '0em' }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleEditDescription}
                      color="primary"
                      variant="outlined"
                      size="small"
                      style={{ padding: '0em' }}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              )}
              {user && user.id === admin.id && !editOpen && (
                <Button
                  onClick={() => setEditOpen((prevState) => !prevState)}
                  size="small"
                  variant="outlined"
                  color="primary"
                  style={{ padding: '0em', marginLeft: '0.5em' }}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              )}
            </div>
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
          <div className={classes.secondPanel}>
            {user && (
              <Button
                color="primary"
                variant="contained"
                startIcon={isSubscribed ? <CheckIcon /> : <AddIcon />}
                className={classes.joinBtn}
                onClick={handleSubJoin}
              >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
              </Button>
            )}
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
        <SortTabBar sortBy={sortBy} handleSortChange={handleSortChange} />
        <div>
          {sub.posts.results.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              toggleUpvote={toggleUpvote}
              toggleDownvote={toggleDownvote}
            />
          ))}
        </div>
        {sub && sub.posts && 'next' in sub.posts && (
          <div className={classes.loadBtnWrapper}>
            <Button
              color="primary"
              variant="outlined"
              size="large"
              onClick={handleLoadPosts}
              startIcon={<AutorenewIcon />}
              className={classes.loadBtn}
            >
              {loadingMore ? 'Loading more posts...' : 'Load more'}
            </Button>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default SubredditPage;
