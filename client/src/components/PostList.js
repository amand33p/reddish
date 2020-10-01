import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from './PostCard';

import { usePostListStyles } from '../styles/muiStyles';

const PostList = () => {
  const posts = useSelector((state) => state.posts);

  const classes = usePostListStyles();

  return (
    <div>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostList;
