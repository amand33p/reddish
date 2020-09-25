import React from 'react';
import { useSelector } from 'react-redux';
import PostCard from './PostCard';

const PostsList = () => {
  const posts = useSelector((state) => state.posts);

  return (
    <div>
      {posts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostsList;
