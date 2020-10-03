import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { UpvoteButton, DownvoteButton } from './VoteButtons';
import ReplyInput from './ReplyInput';
import {
  toggleCommentUpvote,
  toggleCommentDownvote,
  toggleReplyUpvote,
  toggleReplyDownvote,
} from '../reducers/postCommentsReducer';
import ReactTimeAgo from 'react-time-ago';

import { Divider, Typography, Link } from '@material-ui/core';
import { usePostCommentsStyles } from '../styles/muiStyles';

const CommentsDisplay = ({ comments, postId, isMobile }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const classes = usePostCommentsStyles();

  const handleCommentUpvote = async (commentId) => {
    const { upvotedBy, downvotedBy } = comments.find((c) => c.id === commentId);

    try {
      if (upvotedBy.includes(user.id)) {
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== user.id);
        dispatch(
          toggleCommentUpvote(postId, commentId, updatedUpvotedBy, downvotedBy)
        );
      } else {
        const updatedUpvotedBy = [...upvotedBy, user.id];
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== user.id);
        dispatch(
          toggleCommentUpvote(
            postId,
            commentId,
            updatedUpvotedBy,
            updatedDownvotedBy
          )
        );
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleCommentDownvote = async (commentId) => {
    const { upvotedBy, downvotedBy } = comments.find((c) => c.id === commentId);

    try {
      if (downvotedBy.includes(user.id)) {
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== user.id);
        dispatch(
          toggleCommentDownvote(
            postId,
            commentId,
            updatedDownvotedBy,
            upvotedBy
          )
        );
      } else {
        const updatedDownvotedBy = [...downvotedBy, user.id];
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== user.id);
        dispatch(
          toggleCommentDownvote(
            postId,
            commentId,
            updatedDownvotedBy,
            updatedUpvotedBy
          )
        );
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleReplyUpvote = async (commentId, replyId) => {
    const targetComment = comments.find((c) => c.id === commentId);
    const { upvotedBy, downvotedBy } = targetComment.replies.find(
      (r) => r.id === replyId
    );

    try {
      if (upvotedBy.includes(user.id)) {
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== user.id);
        dispatch(
          toggleReplyUpvote(
            postId,
            commentId,
            replyId,
            updatedUpvotedBy,
            downvotedBy
          )
        );
      } else {
        const updatedUpvotedBy = [...upvotedBy, user.id];
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== user.id);
        dispatch(
          toggleReplyUpvote(
            postId,
            commentId,
            replyId,
            updatedUpvotedBy,
            updatedDownvotedBy
          )
        );
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleReplyDownvote = async (commentId, replyId) => {
    const targetComment = comments.find((c) => c.id === commentId);
    const { upvotedBy, downvotedBy } = targetComment.replies.find(
      (r) => r.id === replyId
    );

    try {
      if (downvotedBy.includes(user.id)) {
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== user.id);
        dispatch(
          toggleReplyDownvote(
            postId,
            commentId,
            replyId,
            updatedDownvotedBy,
            upvotedBy
          )
        );
      } else {
        const updatedDownvotedBy = [...downvotedBy, user.id];
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== user.id);
        dispatch(
          toggleReplyDownvote(
            postId,
            commentId,
            replyId,
            updatedDownvotedBy,
            updatedUpvotedBy
          )
        );
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
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
        <div key={c.id} className={classes.wholeComment}>
          <div className={classes.commentWrapper}>
            <div className={classes.commentVotesWrapper}>
              <UpvoteButton
                user={user}
                body={c}
                handleUpvote={() => handleCommentUpvote(c.id)}
              />
              <DownvoteButton
                user={user}
                body={c}
                handleDownvote={() => handleCommentDownvote(c.id)}
              />
            </div>
            <div className={classes.commentDetails}>
              {commentDetails(c.commentedBy, c, c.commentBody)}
              <div>
                <ReplyInput
                  isMobile={isMobile}
                  replyTo={c.commentedBy.username}
                  commentId={c.id}
                  postId={postId}
                />
              </div>
            </div>
          </div>
          {c.replies.map((r) => (
            <div key={r.id} className={classes.replyWrapper}>
              <div className={classes.commentVotesWrapper}>
                <UpvoteButton
                  user={user}
                  body={r}
                  handleUpvote={() => handleReplyUpvote(c.id, r.id)}
                />
                <DownvoteButton
                  user={user}
                  body={r}
                  handleDownvote={() => handleReplyDownvote(c.id, r.id)}
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
