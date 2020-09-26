import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from './PostCard';

import { Paper } from '@material-ui/core';
import { usePostsListStyles } from '../styles/muiStyles';

const PostsList = () => {
  const posts = useSelector((state) => state.posts);

  const classes = usePostsListStyles();

  return (
    <div>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostsList;
