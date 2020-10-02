import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import AuthFormModal from './AuthFormModal';
import ReactTimeAgo from 'react-time-ago';

import { Divider, Typography, Checkbox, Link } from '@material-ui/core';
import { usePostCommentsStyles } from '../styles/muiStyles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const CommentsDisplay = ({ comments }) => {
  const user = useSelector((state) => state.user);
  const classes = usePostCommentsStyles();

  const handleUpvoteToggle = () => {};

  const handleDownvoteToggle = () => {};

  const upvoteButton = (comment) => {
    return user ? (
      <Checkbox
        checked={comment.upvotedBy.includes(user.id)}
        icon={<ArrowUpwardIcon style={{ color: '#b2b2b2' }} />}
        checkedIcon={<ArrowUpwardIcon style={{ color: '#FF8b60' }} />}
        onChange={handleUpvoteToggle}
        size="small"
      />
    ) : (
      <AuthFormModal type="upvote" />
    );
  };

  const downvoteButton = (comment) => {
    return user ? (
      <Checkbox
        checked={comment.downvotedBy.includes(user.id)}
        icon={<ArrowDownwardIcon style={{ color: '#b2b2b2' }} />}
        checkedIcon={<ArrowDownwardIcon style={{ color: '#9494FF' }} />}
        onChange={handleDownvoteToggle}
        size="small"
      />
    ) : (
      <AuthFormModal type="downvote" />
    );
  };

  const commentDetails = (by, comment, body) => {
    return (
      <>
        <Typography variant="caption">
          <Link component={RouterLink} to={`/u/${by.username}`}>
            {by.username}
          </Link>
          {` ${comment.pointsCount} ${
            comment.pointsCount === 1 ? 'point' : 'points'
          } • `}
          <ReactTimeAgo date={new Date(comment.createdAt)} />

          {comment.createdAt !== comment.updatedAt && (
            <em>
              {' • edited'} <ReactTimeAgo date={new Date(comment.updatedAt)} />
            </em>
          )}
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </>
    );
  };

  return (
    <div className={classes.commentsContainer}>
      <Divider className={classes.divider} />
      {comments.map((c) => (
        <div key={c.id} className={classes.commentWrapper}>
          <div className={classes.commentVotesWrapper}>
            {upvoteButton(c)}
            {downvoteButton(c)}
          </div>
          <div className={classes.commentDetails}>
            {commentDetails(c.commentedBy, c, c.commentBody)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsDisplay;
