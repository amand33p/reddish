import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPosts,
  loadMorePosts,
  toggleUpvote,
  toggleDownvote,
} from '../reducers/postReducer';
import { notify } from '../reducers/notificationReducer';
import PostCard from './PostCard';
import SortTabBar from './SortTabBar';

import { Button, Typography, CircularProgress } from '@material-ui/core';
import { usePostListStyles } from '../styles/muiStyles';
import AutorenewIcon from '@material-ui/icons/Autorenew';

const PostList = () => {
  const [sortBy, setSortBy] = useState('hot');
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const classes = usePostListStyles();

  const handleTabChange = async (e, newValue) => {
    try {
      setPageLoading(true);
      await dispatch(fetchPosts(newValue));
      setSortBy(newValue);
      setPageLoading(false);

      if (page !== 1) {
        setPage(1);
      }
    } catch (err) {
      setPageLoading(false);
      if (err.response.data && err.response.data.message) {
        dispatch(notify(`${err.response.data.message}`, 'error'));
      } else {
        dispatch(notify(`Something went wrong.`, 'error'));
      }
    }
  };

  const handleLoadPosts = async () => {
    try {
      setLoadingMore(true);
      await dispatch(loadMorePosts(sortBy, page + 1));
      setPage((prevState) => prevState + 1);
      setLoadingMore(false);
    } catch (err) {
      if (err.response.data && err.response.data.message) {
        dispatch(notify(`${err.response.data.message}`, 'error'));
      } else {
        dispatch(notify(`Something went wrong.`, 'error'));
      }
    }
  };

  return (
    <div className={classes.root}>
      <SortTabBar
        sortBy={sortBy}
        handleTabChange={handleTabChange}
        subscribedTab={true}
        user={user}
      />
      {posts && posts.results && !pageLoading ? (
        posts.results.map((post) => (
          <PostCard
            post={post}
            key={post.id}
            toggleUpvote={toggleUpvote}
            toggleDownvote={toggleDownvote}
          />
        ))
      ) : (
        <div className={classes.loadSpinner}>
          <CircularProgress size="8em" disableShrink />
          <Typography color="primary" variant="body1">
            {`Fetching posts. Wait a sec.`}
          </Typography>
        </div>
      )}
      {sortBy === 'subscribed' && posts.results.length === 0 && (
        <div className={classes.noSubscribedPosts}>
          <Typography variant="h5" color="secondary">
            No Posts Found
          </Typography>
          <Typography variant="h6" color="secondary">
            Subscribe to more subs if you haven't!
          </Typography>
        </div>
      )}
      {posts && 'next' in posts && !pageLoading && (
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
    </div>
  );
};

export default PostList;
