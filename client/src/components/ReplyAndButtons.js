import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editReply, deleteReply } from '../reducers/postCommentsReducer';
import { notify } from '../reducers/notificationReducer';
import DeleteDialog from './DeleteDialog';
import getErrorMsg from '../utils/getErrorMsg';

import { TextField, Button, Typography } from '@material-ui/core';
import { useCommentAndBtnsStyles } from '../styles/muiStyles';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';

const ReplyAndButtons = ({ isMobile, reply, postId, commentId, user }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [editInput, setEditInput] = useState(reply.replyBody);
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const classes = useCommentAndBtnsStyles();

  const handleEditReply = async () => {
    try {
      setSubmitting(true);
      await dispatch(editReply(postId, commentId, reply.id, editInput));
      setSubmitting(false);
      setEditOpen(false);
      dispatch(notify(`Reply edited!`, 'success'));
    } catch (err) {
      setSubmitting(false);
      dispatch(notify(getErrorMsg(err), 'error'));
    }
  };

  const handleReplyDelete = async () => {
    try {
      await dispatch(deleteReply(postId, commentId, reply.id));
      dispatch(notify(`Reply deleted!`, 'success'));
    } catch (err) {
      dispatch(notify(getErrorMsg(err), 'error'));
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
              disabled={submitting}
            >
              {submitting ? 'Updating' : 'Update'}
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
