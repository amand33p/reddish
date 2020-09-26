import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleUpvote, toggleDownvote } from '../reducers/postReducer';
import AuthFormModal from './AuthFormModal';

import { Paper, Checkbox, Typography, useMediaQuery } from '@material-ui/core';
import { useCardStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MessageIcon from '@material-ui/icons/Message';

const PostCard = ({ post }) => {
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
  } = post;

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isUpvoted = user && upvotedBy.includes(user.id);
  const isDownvoted = user && downvotedBy.includes(user.id);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useCardStyles(isUpvoted, isDownvoted)();

  const handleUpvoteToggle = async () => {
    try {
      if (isUpvoted) {
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== user.id);
        await dispatch(toggleUpvote(id, updatedUpvotedBy, downvotedBy));
      } else {
        const updatedUpvotedBy = [...upvotedBy, user.id];
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== user.id);
        await dispatch(toggleUpvote(id, updatedUpvotedBy, updatedDownvotedBy));
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleDownvoteToggle = async () => {
    try {
      if (isDownvoted) {
        const updatedDownvotedBy = downvotedBy.filter((d) => d !== user.id);
        await dispatch(toggleDownvote(id, updatedDownvotedBy, upvotedBy));
      } else {
        const updatedDownvotedBy = [...downvotedBy, user.id];
        const updatedUpvotedBy = upvotedBy.filter((u) => u !== user.id);
        await dispatch(
          toggleDownvote(id, updatedDownvotedBy, updatedUpvotedBy)
        );
      }
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <Paper className={classes.root} variant="outlined">
      <div className={classes.votesWrapper}>
        {user ? (
          <Checkbox
            checked={isUpvoted}
            icon={<ArrowUpwardIcon style={{ color: '#b2b2b2' }} />}
            checkedIcon={<ArrowUpwardIcon style={{ color: '#FF8b60' }} />}
            onChange={handleUpvoteToggle}
            size={isMobile && 'small'}
          />
        ) : (
          <AuthFormModal type="upvote" />
        )}
        <Typography variant="body1" className={classes.points}>
          {pointsCount}
        </Typography>
        {user ? (
          <Checkbox
            checked={isDownvoted}
            icon={<ArrowDownwardIcon style={{ color: '#b2b2b2' }} />}
            checkedIcon={<ArrowDownwardIcon style={{ color: '#9494FF' }} />}
            onChange={handleDownvoteToggle}
            size={isMobile && 'small'}
          />
        ) : (
          <AuthFormModal type="downvote" />
        )}
      </div>
      <div className={classes.thumbnailWrapper}>
        {postType === 'Text' ? (
          <Paper elevation={0} square className={classes.thumbnail}>
            <MessageIcon
              fontSize="inherit"
              className={classes.thumbnailIcon}
              style={{ color: '#787878' }}
            />
          </Paper>
        ) : null}
      </div>
    </Paper>
  );
};

export default PostCard;
