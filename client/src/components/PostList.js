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
import LoadMoreButton from './LoadMoreButton';
import LoadingSpinner from './LoadingSpinner';
import getErrorMsg from '../utils/getErrorMsg';

import { Typography } from '@material-ui/core';
import { usePostListStyles } from '../styles/muiStyles';

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
      dispatch(notify(getErrorMsg(err), 'error'));
    }
  };

  const handleLoadPosts = async () => {
    try {
      setLoadingMore(true);
      await dispatch(loadMorePosts(sortBy, page + 1));
      setPage((prevState) => prevState + 1);
      setLoadingMore(false);
    } catch (err) {
      setLoadingMore(false);
      dispatch(notify(getErrorMsg(err), 'error'));
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
        <LoadingSpinner text={'Fetching posts. Wait a sec.'} />
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
        <LoadMoreButton
          handleLoadPosts={handleLoadPosts}
          loading={loadingMore}
        />
      )}
    </div>
  );
};

export default PostList;
