import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from './PostCard';
import { toggleUpvote, toggleDownvote } from '../reducers/postReducer';

import { usePostListStyles } from '../styles/muiStyles';

const PostList = () => {
  const posts = useSelector((state) => state.posts);

  const classes = usePostListStyles();

  return (
    <div>
      {posts.map((post) => (
        <PostCard
          post={post}
          key={post.id}
          toggleUpvote={toggleUpvote}
          toggleDownvote={toggleDownvote}
        />
      ))}
    </div>
  );
};

export default PostList;
