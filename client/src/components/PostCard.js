import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { toggleUpvote, toggleDownvote } from '../reducers/postReducer';
import AuthFormModal from './AuthFormModal';
import EditDeleteMenu from './EditDeleteMenu';
import getEditedThumbail from '../utils/cloudinaryTransform';
import { trimLink, prettifyLink, fixUrl } from '../utils/formatUrl';
import ReactTimeAgo from 'react-time-ago';

import {
  Paper,
  Checkbox,
  Typography,
  useMediaQuery,
  CardMedia,
  Tooltip,
  Link,
  Button,
} from '@material-ui/core';
import { useCardStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MessageIcon from '@material-ui/icons/Message';
import LinkIcon from '@material-ui/icons/Link';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CommentIcon from '@material-ui/icons/Comment';

const PostCard = ({ post }) => {
  const {
    id,
    title,
    postType,
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

  const linkToShow =
    postType === 'Link'
      ? linkSubmission
      : postType === 'Image'
      ? imageSubmission.imageLink
      : '';
  const formattedLink = trimLink(prettifyLink(linkToShow));

  return (
    <Paper className={classes.root} variant="outlined">
      <div className={classes.votesWrapper}>
        {user ? (
          <Checkbox
            checked={isUpvoted}
            icon={<ArrowUpwardIcon style={{ color: '#b2b2b2' }} />}
            checkedIcon={<ArrowUpwardIcon style={{ color: '#FF8b60' }} />}
            onChange={handleUpvoteToggle}
            size={isMobile ? 'small' : 'medium'}
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
            size={isMobile ? 'small' : 'medium'}
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
        ) : postType === 'Link' ? (
          <a href={fixUrl(linkSubmission)} target="_noblank">
            <Paper elevation={0} square className={classes.thumbnail}>
              <LinkIcon
                fontSize="inherit"
                className={classes.thumbnailIcon}
                style={{ color: '#787878' }}
              />
            </Paper>
          </a>
        ) : (
          <Paper elevation={0} square className={classes.thumbnail}>
            <CardMedia
              className={classes.thumbnail}
              image={getEditedThumbail(imageSubmission.imageLink)}
              title={title}
              component="a"
              href={imageSubmission.imageLink}
              target="_noblank"
            />
          </Paper>
        )}
      </div>
      <div className={classes.postInfoWrapper}>
        <Typography variant="h6" className={classes.title}>
          {title}{' '}
          <Typography variant="caption" color="primary" className={classes.url}>
            <Link
              href={
                postType === 'Link'
                  ? fixUrl(linkSubmission)
                  : postType === 'Image'
                  ? imageSubmission.imageLink
                  : ''
              }
            >
              {formattedLink}
              {postType === 'Text' ? null : (
                <OpenInNewIcon fontSize="inherit" />
              )}
            </Link>
          </Typography>
        </Typography>
        <Typography variant="subtitle2">
          <Link component={RouterLink} to={`/r/${subreddit.subredditName}`}>
            r/{subreddit.subredditName}
          </Link>
          <Typography variant="caption" className={classes.userAndDate}>
            Posted by{' '}
            <Link component={RouterLink} to={`/u/${author.username}`}>
              u/{author.username}
            </Link>{' '}
            •{' '}
            <Tooltip title={String(new Date(createdAt))}>
              <span>
                <ReactTimeAgo date={new Date(createdAt)} />
              </span>
            </Tooltip>
          </Typography>
        </Typography>
        <div className={classes.bottomBtns}>
          <Button
            startIcon={<CommentIcon />}
            className={classes.commentsBtn}
            component={RouterLink}
            to={`/comments/${id}`}
            size={isMobile ? 'small' : 'medium'}
          >
            {commentCount} comments
          </Button>
          {user && user.id === author.id && (
            <EditDeleteMenu id={id} isMobile={isMobile} title={title} />
          )}
        </div>
      </div>
    </Paper>
  );
};

export default PostCard;
