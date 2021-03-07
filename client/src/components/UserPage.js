import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, loadUserPosts } from '../reducers/userPageReducer';
import { notify } from '../reducers/notificationReducer';
import { getCircularAvatar } from '../utils/cloudinaryTransform';
import UserPostCard from './UserPostCard';
import ErrorPage from './ErrorPage';
import LoadMoreButton from './LoadMoreButton';
import LoadingSpinner from './LoadingSpinner';
import getErrorMsg from '../utils/getErrorMsg';

import {
  Container,
  Paper,
  useMediaQuery,
  Typography,
  Avatar,
} from '@material-ui/core';
import { useUserPageStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import CakeIcon from '@material-ui/icons/Cake';
import PersonIcon from '@material-ui/icons/Person';

const UserPage = () => {
  const classes = useUserPageStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const { username } = useParams();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userPage);
  const user = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        await dispatch(fetchUser(username));
        setPageLoading(false);
      } catch (err) {
        setPageError(getErrorMsg(err), 'error');
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  if (pageError) {
    return (
      <Container disableGutters>
        <Paper variant="outlined" className={classes.mainPaper}>
          <ErrorPage errorMsg={pageError} />
        </Paper>
      </Container>
    );
  }

  if (!userInfo || pageLoading) {
    return (
      <Container disableGutters>
        <Paper variant="outlined" className={classes.mainPaper}>
          <LoadingSpinner text="Fetching user data..." />
        </Paper>
      </Container>
    );
  }

  const {
    avatar,
    username: userName,
    createdAt,
    posts,
    totalComments,
    karmaPoints,
  } = userInfo.userDetails;

  const handleLoadPosts = async () => {
    try {
      setLoadingMore(true);
      await dispatch(loadUserPosts(username, page + 1));
      setPage((prevState) => prevState + 1);
      setLoadingMore(false);
    } catch (err) {
      dispatch(notify(getErrorMsg(err), 'error'));
    }
  };

  return (
    <Container disableGutters>
      <Paper variant="outlined" className={classes.mainPaper}>
        <Paper className={classes.userInfoWrapper} variant="outlined">
          <div className={classes.avatarWrapper}>
            {avatar && avatar.exists ? (
              <Avatar
                alt={userName}
                src={getCircularAvatar(avatar.imageLink)}
                className={classes.avatar}
              />
            ) : (
              <Avatar
                style={{ backgroundColor: '#941a1c' }}
                className={classes.avatar}
              >
                <h1>{userName[0]}</h1>
              </Avatar>
            )}
            <Typography variant="h6" color="secondary">
              u/{userName}
            </Typography>
          </div>
          <div className={classes.rightWrapper}>
            <div className={classes.itemWrapper}>
              <div className={classes.twoItemsDiv}>
                <Typography variant="body1" color="secondary">
                  Cake Day
                </Typography>
                <Typography
                  variant="h6"
                  color="secondary"
                  className={classes.cakeDay}
                >
                  <CakeIcon />
                  {String(new Date(createdAt)).split(' ').slice(1, 4).join(' ')}
                </Typography>
              </div>
              <div className={classes.twoItemsDiv}>
                <Typography variant="body1" color="secondary">
                  <strong>{posts.length}</strong> Posts
                </Typography>
                <Typography variant="body1" color="secondary">
                  <strong>{totalComments}</strong> Comments
                </Typography>
              </div>
            </div>
            <div className={classes.itemWrapper}>
              <div className={classes.twoItemsDiv}>
                <Typography variant="body1" color="secondary">
                  Karma
                </Typography>
                <Typography variant="h6" color="secondary">
                  {karmaPoints.commentKarma + karmaPoints.postKarma}
                </Typography>
              </div>
              <div className={classes.twoItemsDiv}>
                <Typography variant="body1" color="secondary">
                  Post Karma <strong>{karmaPoints.postKarma}</strong>
                </Typography>
                <Typography variant="body1" color="secondary">
                  Comment Karma <strong>{karmaPoints.commentKarma}</strong>
                </Typography>
              </div>
            </div>
          </div>
        </Paper>
        <div className={classes.postsPaper}>
          {userInfo.posts.results.length !== 0 ? (
            userInfo.posts.results.map((p) => (
              <UserPostCard
                key={p.id}
                post={p}
                user={user}
                isMobile={isMobile}
              />
            ))
          ) : (
            <div className={classes.noPosts}>
              <PersonIcon color="primary" fontSize="large" />
              <Typography variant="h5" color="secondary">
                <strong>u/{userName}</strong> has not made any posts yet
              </Typography>
            </div>
          )}
        </div>
        {'next' in userInfo.posts && (
          <LoadMoreButton
            handleLoadPosts={handleLoadPosts}
            loading={loadingMore}
          />
        )}
      </Paper>
    </Container>
  );
};

export default UserPage;
