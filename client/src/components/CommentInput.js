import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/postCommentsReducer';

import { Link, Typography, TextField, Button } from '@material-ui/core';
import { useCommentInputStyles } from '../styles/muiStyles';
import SendIcon from '@material-ui/icons/Send';

const CommentInput = ({ user, postId, isMobile }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const classes = useCommentInputStyles();

  if (!user) {
    return null;
  }

  const handlePostComment = async (e) => {
    e.preventDefault();

    try {
      dispatch(addComment(postId, comment));
      setComment('');
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Typography variant="body2">
        Comment as{' '}
        <Link component={RouterLink} to={`/u/${user.username}`}>
          {user.username}
        </Link>
      </Typography>
      <form className={classes.form} onSubmit={handlePostComment}>
        <TextField
          placeholder={`What are your thoughts?`}
          multiline
          required
          fullWidth
          rows={4}
          rowsMax={Infinity}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          variant="outlined"
          size={isMobile ? 'small' : 'medium'}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          className={classes.commentBtn}
          startIcon={<SendIcon />}
          size={isMobile ? 'small' : 'medium'}
        >
          Comment
        </Button>
      </form>
    </div>
  );
};

export default CommentInput;
