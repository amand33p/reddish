import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReply } from '../reducers/postCommentsReducer';

import { TextField, Button } from '@material-ui/core';
import { useReplyInputStyles } from '../styles/muiStyles';
import ReplyIcon from '@material-ui/icons/Reply';
import SendIcon from '@material-ui/icons/Send';

const ReplyInput = ({ isMobile, replyTo, commentId, postId }) => {
  const [inputOpen, setInputOpen] = useState(false);
  const [reply, setReply] = useState('');
  const dispatch = useDispatch();

  const classes = useReplyInputStyles();

  const handlePostReply = async (e) => {
    e.preventDefault();

    try {
      dispatch(addReply(postId, commentId, reply));
      setInputOpen(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <Button
        size="small"
        color="inherit"
        startIcon={<ReplyIcon />}
        className={classes.openBtn}
        onClick={() => setInputOpen((prevState) => !prevState)}
      >
        Reply
      </Button>
      {inputOpen && (
        <form className={classes.form} onSubmit={handlePostReply}>
          <TextField
            placeholder={`Reply to ${replyTo}'s comment`}
            multiline
            required
            fullWidth
            rows={4}
            rowsMax={Infinity}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.replyBtn}
            startIcon={<SendIcon />}
            size="small"
          >
            Reply
          </Button>
        </form>
      )}
    </div>
  );
};

export default ReplyInput;
