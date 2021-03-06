import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { UpvoteButton, DownvoteButton } from './VoteButtons';
import CommentsAndButtons from './CommentAndButtons';
import ReplyAndButtons from './ReplyAndButtons';
import {
  toggleCommentUpvote,
  toggleCommentDownvote,
  toggleReplyUpvote,
  toggleReplyDownvote,
} from '../reducers/postCommentsReducer';
import { notify } from '../reducers/notificationReducer';
import TimeAgo from 'timeago-react';
import getErrorMsg from '../utils/getErrorMsg';

import { Typography, Link } from '@material-ui/core';
import { usePostCommentsStyles } from '../styles/muiStyles';
import ForumIcon from '@material-ui/icons/Forum';

const CommentsDisplay = ({ comments, postId, isMobile }) => {
  const classes = usePostCommentsStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
      dispatch(notify(getErrorMsg(err), 'error'));
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
      dispatch(notify(getErrorMsg(err), 'error'));
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
      dispatch(notify(getErrorMsg(err), 'error'));
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
      dispatch(notify(getErrorMsg(err), 'error'));
    }
  };

  const commentDetails = (by, comment) => {
    return (
      <>
        <Typography variant="caption">
          <Link component={RouterLink} to={`/u/${by.username}`}>
            {by.username}
          </Link>
          {` ${comment.pointsCount} ${
            comment.pointsCount === 1 ? 'point' : 'points'
          } • `}
          <TimeAgo datetime={new Date(comment.createdAt)} />
          {comment.createdAt !== comment.updatedAt && (
            <em>
              {' • edited'} <TimeAgo datetime={new Date(comment.updatedAt)} />
            </em>
          )}
        </Typography>
      </>
    );
  };

  return (
    <div className={classes.commentsContainer}>
      {comments.length !== 0 ? (
        comments.map((c) => (
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
                {commentDetails(c.commentedBy, c)}
                <CommentsAndButtons
                  isMobile={isMobile}
                  comment={c}
                  postId={postId}
                  user={user}
                />
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
                  {commentDetails(r.repliedBy, r)}
                  <ReplyAndButtons
                    isMobile={isMobile}
                    reply={r}
                    postId={postId}
                    commentId={c.id}
                    user={user}
                  />
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className={classes.noCommentsBanner}>
          <ForumIcon color="primary" fontSize="large" />
          <Typography variant="h5" color="secondary">
            No Comments Yet
          </Typography>
          <Typography variant="h6" color="secondary">
            Be the first to share what you think!
          </Typography>
        </div>
      )}
    </div>
  );
};

export default CommentsDisplay;
