import React, { useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPostComments,
  toggleUpvote,
  toggleDownvote,
} from '../reducers/postCommentsReducer';
import { UpvoteButton, DownvoteButton } from './VoteButtons';
import EditDeleteMenu from './EditDeleteMenu';
import CommentsDisplay from './CommentsDisplay';
import ReactTimeAgo from 'react-time-ago';
import { trimLink, prettifyLink, fixUrl } from '../utils/formatUrl';
import ReactHtmlParser from 'react-html-parser';

import {
  Container,
  Paper,
  useMediaQuery,
  Typography,
  Link,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';
import { usePostCommentsStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
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
    <Container disableGutters>
      <Paper variant="outlined" className={classes.mainPaper}>
        <div className={classes.topPortion}>
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
                color: isUpvoted ? '#FF8b60' : isDownvoted ? '#9494FF' : '#333',
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
                  <em>
                    {' • edited'} <ReactTimeAgo date={new Date(updatedAt)} />
                  </em>
                )}
              </Typography>
            </Typography>
            <Typography variant="h5" className={classes.title}>
              {title}
            </Typography>
            {postType === 'Text' ? (
              <Typography variant="body1">
                {ReactHtmlParser(textSubmission)}
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
            <div className={classes.bottomBar}>
              <MenuItem className={classes.bottomButton}>
                <ListItemIcon>
                  <CommentIcon className={classes.commentIcon} />
                  <Typography variant="subtitle2">{commentCount}</Typography>
                </ListItemIcon>
              </MenuItem>
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
        </div>
        <CommentsDisplay comments={comments} />
      </Paper>
    </Container>
  );
};

export default PostCommentsPage;
