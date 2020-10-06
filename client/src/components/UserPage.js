import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../reducers/userPageReducer';
import { getCircularAvatar } from '../utils/cloudinaryTransform';
import UserPostCard from './UserPostCard';

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

const UserPage = () => {
  const userInfo = useSelector((state) => state.userPage);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { username } = useParams();

  useEffect(() => {
    if (!userInfo || userInfo.username !== username) {
      const getUser = async () => {
        try {
          dispatch(fetchUser(username));
        } catch (err) {
          console.log(err.response.data.message);
        }
      };
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const classes = useUserPageStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  if (!userInfo) {
    return null;
  }

  return (
    <Container disableGutters>
      <Paper variant="outlined" className={classes.mainPaper}>
        <Paper className={classes.userInfoWrapper} variant="outlined">
          <div className={classes.avatarWrapper}>
            {userInfo.avatar && userInfo.avatar.exists ? (
              <Avatar
                alt={userInfo.username}
                src={getCircularAvatar(userInfo.avatar.imageLink)}
                className={classes.avatar}
              />
            ) : (
              <Avatar
                style={{ backgroundColor: '#941a1c' }}
                className={classes.avatar}
              >
                <h1>{userInfo.username[0]}</h1>
              </Avatar>
            )}
            <Typography variant="h6" color="secondary">
              u/{userInfo.username}
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
                  {String(new Date(userInfo.createdAt))
                    .split(' ')
                    .slice(1, 4)
                    .join(' ')}
                </Typography>
              </div>
              <div className={classes.twoItemsDiv}>
                <Typography variant="body1" color="secondary">
                  <strong>{userInfo.posts.length}</strong> Posts
                </Typography>
                <Typography variant="body1" color="secondary">
                  <strong>{userInfo.totalComments}</strong> Comments
                </Typography>
              </div>
            </div>
            <div className={classes.itemWrapper}>
              <div className={classes.twoItemsDiv}>
                <Typography variant="body1" color="secondary">
                  Karma
                </Typography>
                <Typography variant="h6" color="secondary">
                  {userInfo.karmaPoints.commentKarma +
                    userInfo.karmaPoints.postKarma}
                </Typography>
              </div>
              <div className={classes.twoItemsDiv}>
                <Typography variant="body1" color="secondary">
                  Post Karma <strong>{userInfo.karmaPoints.postKarma}</strong>
                </Typography>
                <Typography variant="body1" color="secondary">
                  Comment Karma{' '}
                  <strong>{userInfo.karmaPoints.commentKarma}</strong>
                </Typography>
              </div>
            </div>
          </div>
        </Paper>
        <div className={classes.postsPaper}>
          {userInfo.posts.map((p) => (
            <UserPostCard key={p.id} post={p} user={user} isMobile={isMobile} />
          ))}
        </div>
      </Paper>
    </Container>
  );
};

export default UserPage;
