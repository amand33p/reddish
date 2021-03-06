import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUpvote, toggleDownvote } from '../reducers/userPageReducer';
import { notify } from '../reducers/notificationReducer';
import { UpvoteButton, DownvoteButton } from './VoteButtons';
import TimeAgo from 'timeago-react';
import ReactHtmlParser from 'react-html-parser';
import { trimLink, prettifyLink, fixUrl } from '../utils/formatUrl';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CommentIcon from '@material-ui/icons/Comment';
import getErrorMsg from '../utils/getErrorMsg';

import { Paper, Typography, Link, Button } from '@material-ui/core';
import { useUserPostCardStyles } from '../styles/muiStyles';

const UserPostCard = ({ post, user, isMobile }) => {
  const classes = useUserPostCardStyles();
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state);

  const {
    id,
    title,
    postType,
    textSubmission,
    linkSubmission,
    imageSubmission,
    subreddit,
    author,
    upvotedBy,
    downvotedBy,
    pointsCount,
    commentCount,
    createdAt,
    updatedAt,
  } = post;

  const isUpvoted = user && upvotedBy.includes(user.id);
  const isDownvoted = user && downvotedBy.includes(user.id);

  const handleUpvoteToggle = async () => {
    try {
      if (isUpvoted) {
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== user.id);
        dispatch(toggleUpvote(id, updatedUpvotedBy, downvotedBy));
      } else {
        const updatedUpvotedBy = [...upvotedBy, user.id];
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== user.id);
        dispatch(toggleUpvote(id, updatedUpvotedBy, updatedDownvotedBy));
      }
    } catch (err) {
      dispatch(notify(getErrorMsg(err), 'error'));
    }
  };

  const handleDownvoteToggle = async () => {
    try {
      if (isDownvoted) {
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== user.id);
        dispatch(toggleDownvote(id, updatedDownvotedBy, upvotedBy));
      } else {
        const updatedDownvotedBy = [...downvotedBy, user.id];
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== user.id);
        dispatch(toggleDownvote(id, updatedDownvotedBy, updatedUpvotedBy));
      }
    } catch (err) {
      dispatch(notify(getErrorMsg(err), 'error'));
    }
  };

  const formattedLink =
    postType === 'Link' && trimLink(prettifyLink(linkSubmission), 70);

  const trimmedText =
    textSubmission &&
    (textSubmission.length < 100
      ? textSubmission
      : textSubmission.slice(0, 100).concat('....'));

  return (
    <Paper variant="outlined" className={classes.mainPaper}>
      <div className={classes.votesWrapper}>
        <UpvoteButton
          user={user}
          body={post}
          handleUpvote={handleUpvoteToggle}
          size={isMobile ? 'small' : 'medium'}
        />
        <Typography
          variant="body1"
          style={{
            color: isUpvoted
              ? '#FF8b60'
              : isDownvoted
              ? '#9494FF'
              : darkMode
              ? '#e4e4e4'
              : '#333',
            fontWeight: 600,
          }}
        >
          {pointsCount}
        </Typography>
        <DownvoteButton
          user={user}
          body={post}
          handleDownvote={handleDownvoteToggle}
          size={isMobile ? 'small' : 'medium'}
        />
      </div>
      <div
        className={classes.postInfo}
        component={RouterLink}
        to={`/comments/${id}`}
      >
        <Typography variant="subtitle2">
          <Link component={RouterLink} to={`/r/${subreddit.subredditName}`}>
            {`r/${subreddit.subredditName} `}
          </Link>
          <Typography variant="caption" className={classes.userAndDate}>
            • Posted by
            <Link component={RouterLink} to={`/u/${author.username}`}>
              {` u/${author.username} `}
            </Link>
            • <TimeAgo datetime={new Date(createdAt)} />
            {createdAt !== updatedAt && (
              <em>
                {' • edited'} <TimeAgo datetime={new Date(updatedAt)} />
              </em>
            )}
          </Typography>
        </Typography>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
        {postType === 'Text' ? (
          <Typography variant="body1">
            {ReactHtmlParser(trimmedText)}
          </Typography>
        ) : postType === 'Image' ? (
          <a
            href={imageSubmission.imageLink}
            alt={title}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.imagePost}
          >
            <img
              alt={title}
              src={imageSubmission.imageLink}
              className={classes.image}
            />
          </a>
        ) : (
          <Link href={fixUrl(linkSubmission)}>
            {formattedLink} <OpenInNewIcon fontSize="inherit" />
          </Link>
        )}
        <div>
          <Button
            color="primary"
            size="small"
            startIcon={<CommentIcon />}
            className={classes.commentsBtn}
            component={RouterLink}
            to={`/comments/${id}`}
          >
            {commentCount} Comments
          </Button>
        </div>
      </div>
    </Paper>
  );
};

export default UserPostCard;
