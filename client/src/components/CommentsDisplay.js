import React from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { UpvoteButton, DownvoteButton } from './VoteButtons';
import ReactTimeAgo from 'react-time-ago';

import { Divider, Typography, Link } from '@material-ui/core';
import { usePostCommentsStyles } from '../styles/muiStyles';

const CommentsDisplay = ({ comments }) => {
  const user = useSelector((state) => state.user);
  const classes = usePostCommentsStyles();

  const handleCommentUpvote = () => {};

  const handleCommentDownvote = () => {};

  const handleReplyUpvote = () => {};

  const handleReplyDownvote = () => {};

  const commentDetails = (by, comment, body) => {
    return (
      <div>
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
      </div>
    );
  };

  return (
    <div className={classes.commentsContainer}>
      <Divider className={classes.divider} />
      {comments.map((c) => (
        <div key={c.id} className={classes.wholeComment}>
          <div className={classes.commentWrapper}>
            <div className={classes.commentVotesWrapper}>
              <UpvoteButton
                user={user}
                body={c}
                handleUpvote={handleCommentUpvote}
              />
              <DownvoteButton
                user={user}
                body={c}
                handleDownvote={handleCommentDownvote}
              />
            </div>
            <div className={classes.commentDetails}>
              {commentDetails(c.commentedBy, c, c.commentBody)}
            </div>
          </div>
          {c.replies.map((r) => (
            <div key={r.id} className={classes.replyWrapper}>
              <div className={classes.commentVotesWrapper}>
                <UpvoteButton
                  user={user}
                  body={r}
                  handleUpvote={handleReplyUpvote}
                />
                <DownvoteButton
                  user={user}
                  body={r}
                  handleDownvote={handleReplyDownvote}
                />
              </div>
              <div className={classes.commentDetails}>
                {commentDetails(r.repliedBy, r, r.replyBody)}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CommentsDisplay;
