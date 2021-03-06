import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addReply,
  editComment,
  deleteComment,
} from '../reducers/postCommentsReducer';
import { notify } from '../reducers/notificationReducer';
import DeleteDialog from './DeleteDialog';
import getErrorMsg from '../utils/getErrorMsg';

import { TextField, Button, Typography } from '@material-ui/core';
import { useCommentAndBtnsStyles } from '../styles/muiStyles';
import ReplyIcon from '@material-ui/icons/Reply';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';

const CommentAndButtons = ({ isMobile, comment, postId, user }) => {
  const classes = useCommentAndBtnsStyles();
  const dispatch = useDispatch();
  const [replyOpen, setReplyOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [replyInput, setReplyInput] = useState('');
  const [editInput, setEditInput] = useState(comment.commentBody);
  const [submitting, setSubmitting] = useState(false);

  const handlePostReply = async () => {
    try {
      setSubmitting(true);
      await dispatch(addReply(postId, comment.id, replyInput));
      setSubmitting(false);
      setReplyOpen(false);
      setReplyInput('');
      dispatch(notify(`Reply submitted!`, 'success'));
    } catch (err) {
      setSubmitting(false);
      dispatch(notify(getErrorMsg(err), 'error'));
    }
  };

  const handleEditComment = async () => {
    try {
      setSubmitting(true);
      await dispatch(editComment(postId, comment.id, editInput));
      setSubmitting(false);
      setEditOpen(false);
      dispatch(notify(`Comment edited!`, 'success'));
    } catch (err) {
      setSubmitting(false);
      dispatch(notify(getErrorMsg(err), 'error'));
    }
  };

  const handleCommentDelete = async () => {
    try {
      await dispatch(deleteComment(postId, comment.id));
      dispatch(notify(`Comment deleted!`, 'success'));
    } catch (err) {
      dispatch(notify(getErrorMsg(err), 'error'));
    }
  };

  return (
    <div>
      {!editOpen ? (
        <Typography variant="body2">{comment.commentBody}</Typography>
      ) : (
        <div className={classes.inputDiv}>
          <TextField
            multiline
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
              onClick={handleEditComment}
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
      <div className={classes.btnBar}>
        {user && (
          <Button
            size="small"
            color="inherit"
            startIcon={<ReplyIcon />}
            className={classes.btnStyle}
            onClick={() => setReplyOpen((prevState) => !prevState)}
          >
            Reply
          </Button>
        )}
        {user && user.id === comment.commentedBy.id && (
          <>
            <Button
              size="small"
              color="inherit"
              startIcon={<EditIcon />}
              className={classes.btnStyle}
              onClick={() => setEditOpen((prevState) => !prevState)}
            >
              Edit
            </Button>
            <DeleteDialog type="comment" handleDelete={handleCommentDelete} />
          </>
        )}
      </div>
      {replyOpen && (
        <div className={classes.inputDiv}>
          <TextField
            placeholder={`Reply to ${comment.commentedBy.username}'s comment`}
            multiline
            required
            fullWidth
            rows={4}
            rowsMax={Infinity}
            value={replyInput}
            onChange={(e) => setReplyInput(e.target.value)}
            variant="outlined"
            size={isMobile ? 'small' : 'medium'}
          />
          <div className={classes.submitBtns}>
            <Button
              onClick={() => setReplyOpen(false)}
              color="primary"
              variant="outlined"
              size="small"
              className={classes.cancelBtn}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePostReply}
              color="primary"
              variant="contained"
              startIcon={<SendIcon />}
              size="small"
              disabled={submitting}
            >
              {submitting ? 'Replying' : 'Reply'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentAndButtons;
