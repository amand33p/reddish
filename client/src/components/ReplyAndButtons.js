import React, { useState } from 'react';
import { editReply, deleteReply } from '../reducers/postCommentsReducer';
import { useDispatch } from 'react-redux';
import DeleteDialog from './DeleteDialog';

import { TextField, Button, Typography } from '@material-ui/core';
import { useCommentAndBtnsStyles } from '../styles/muiStyles';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';

const ReplyAndButtons = ({ isMobile, reply, postId, commentId, user }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editInput, setEditInput] = useState(reply.replyBody);
  const dispatch = useDispatch();
  const classes = useCommentAndBtnsStyles();

  const handleEditReply = async () => {
    try {
      dispatch(editReply(postId, commentId, reply.id, editInput));
      setEditOpen(false);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  const handleReplyDelete = async () => {
    try {
      dispatch(deleteReply(postId, commentId, reply.id));
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  return (
    <div>
      {!editOpen ? (
        <Typography variant="body2">{reply.replyBody}</Typography>
      ) : (
        <div className={classes.inputDiv}>
          <TextField
            multiline
            required
            fullWidth
            rows={2}
            rowsMax={Infinity}
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
          />
          <div className={classes.submitBtns}>
            <Button
              onClick={() => setEditOpen(false)}
              color="primary"
              variant="outlined"
              size="small"
              className={classes.cancelBtn}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditReply}
              color="primary"
              variant="contained"
              startIcon={<SendIcon />}
              size="small"
            >
              Update
            </Button>
          </div>
        </div>
      )}
      {user && user.id === reply.repliedBy.id && (
        <div className={classes.btnBar}>
          <Button
            size="small"
            color="inherit"
            startIcon={<EditIcon />}
            className={classes.btnStyle}
            onClick={() => setEditOpen((prevState) => !prevState)}
          >
            Edit
          </Button>
          <DeleteDialog type="comment" handleDelete={handleReplyDelete} />
        </div>
      )}
    </div>
  );
};

export default ReplyAndButtons;
