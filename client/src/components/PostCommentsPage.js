import React, { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPostComments,
  toggleUpvote,
  toggleDownvote,
} from '../reducers/postCommentsReducer';
import AuthFormModal from './AuthFormModal';
import EditDeleteMenu from './EditDeleteMenu';
import ReactTimeAgo from 'react-time-ago';
import { trimLink, prettifyLink, fixUrl } from '../utils/formatUrl';

import {
  Container,
  Paper,
  Checkbox,
  useMediaQuery,
  Typography,
  Link,
} from '@material-ui/core';
import { usePostCommentsStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CommentIcon from '@material-ui/icons/Comment';

const PostCommentsPage = () => {
  const { id: postId } = useParams();
  const post = useSelector((state) => state.postComments);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!post || post.id !== postId) {
      dispatch(fetchPostComments(postId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const classes = usePostCommentsStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  if (!post) {
    return null;
  }

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
    comments,
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
      console.log(err.response.data.message);
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
      console.log(err.response.data.message);
    }
  };

  const formattedLink =
    postType === 'Link' && trimLink(prettifyLink(linkSubmission), 70);

  return (
    <Container>
      <Paper variant="outlined" className={classes.mainPaper}>
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
          <Typography
            variant="body1"
            className={classes.points}
            style={{
              color: isUpvoted ? '#FF8b60' : isDownvoted ? '#9494FF' : '#333',
              fontWeight: 600,
            }}
          >
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
        <div className={classes.postDetails} elevation={0}>
          <Typography variant="subtitle2">
            <Link component={RouterLink} to={`/r/${subreddit.subredditName}`}>
              {`r/${subreddit.subredditName} `}
            </Link>
            <Typography variant="caption" className={classes.userAndDate}>
              • Posted by
              <Link component={RouterLink} to={`/u/${author.username}`}>
                {` u/${author.username} `}
              </Link>
              • <ReactTimeAgo date={new Date(createdAt)} />
              {createdAt !== updatedAt && (
                <span>
                  {' • Updated:'} <ReactTimeAgo date={new Date(updatedAt)} />
                </span>
              )}
            </Typography>
          </Typography>
          <Typography variant="h5" className={classes.title}>
            {title}
          </Typography>
          {postType === 'Text' ? (
            <Typography variant="body1">{textSubmission}</Typography>
          ) : postType === 'Image' ? (
            <img
              alt={title}
              src={imageSubmission.imageLink}
              className={classes.imagePost}
            />
          ) : (
            <Link href={fixUrl(linkSubmission)}>
              {formattedLink} <OpenInNewIcon fontSize="inherit" />
            </Link>
          )}
          <div className={classes.bottomBar}>
            <Typography variant="body1" className={classes.bottomButton}>
              <CommentIcon className={classes.commentIcon} />
              {commentCount} comments
            </Typography>
            {user && user.id === author.id && (
              <EditDeleteMenu
                id={id}
                isMobile={isMobile}
                title={title}
                postType={postType}
                subreddit={subreddit}
                buttonType="buttonGroup"
                textSubmission={textSubmission}
                linkSubmission={linkSubmission}
              />
            )}
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default PostCommentsPage;
