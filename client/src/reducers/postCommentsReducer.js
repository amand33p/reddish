import postService from '../services/posts';

const postPageReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_POST_COMMENTS':
      return action.payload;
    case 'CREATE_NEW_POST':
      return action.payload;
    case 'UPDATE_POST':
      return action.payload;
    case 'TOGGLE_VOTE':
      return { ...state, ...action.payload };
    case 'VOTE_COMMENT':
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id !== action.payload.commentId
            ? c
            : { ...c, ...action.payload.data }
        ),
      };
    case 'VOTE_REPLY':
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id !== action.payload.commentId
            ? c
            : {
                ...c,
                replies: c.replies.map((r) =>
                  r.id !== action.payload.replyId
                    ? r
                    : { ...r, ...action.payload.data }
                ),
              }
        ),
      };
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case 'ADD_REPLY':
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id !== action.payload.commentId
            ? c
            : { ...c, replies: [...c.replies, action.payload.addedReply] }
        ),
      };
    case 'EDIT_COMMENT':
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id !== action.payload.commentId
            ? c
            : { ...c, ...action.payload.data }
        ),
      };
    case 'DELETE_COMMENT':
      return {
        ...state,
        comments: state.comments.filter((c) => c.id !== action.payload),
      };
    case 'EDIT_REPLY':
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id !== action.payload.commentId
            ? c
            : {
                ...c,
                replies: c.replies.map((r) =>
                  r.id !== action.payload.replyId
                    ? r
                    : { ...r, ...action.payload.data }
                ),
              }
        ),
      };
    case 'DELETE_REPLY':
      return {
        ...state,
        comments: state.comments.map((c) =>
          c.id !== action.payload.commentId
            ? c
            : {
                ...c,
                replies: c.replies.filter(
                  (r) => r.id !== action.payload.replyId
                ),
              }
        ),
      };
    case 'SORT_COMMENTS':
      return {
        ...state,
        comments: state.comments.sort((a, b) => {
          switch (action.payload) {
            case 'new':
              return new Date(b.createdAt) - new Date(a.createdAt);
            case 'upvoted':
              return b.pointsCount - a.pointsCount;
            case 'downvoted':
              return a.pointsCount - b.pointsCount;
            case 'replied':
              return b.replies.length - a.replies.length;
            default:
              return new Date(a.createdAt) - new Date(b.createdAt);
          }
        }),
      };
    default:
      return state;
  }
};

export const fetchPostComments = (id) => {
  return async (dispatch) => {
    const fetchedPost = await postService.getPostComments(id);

    dispatch({
      type: 'FETCH_POST_COMMENTS',
      payload: fetchedPost,
    });
  };
};

export const createNewPost = (postObject) => {
  return async (dispatch) => {
    const addedPost = await postService.addNew(postObject);

    dispatch({
      type: 'CREATE_NEW_POST',
      payload: addedPost,
    });

    return addedPost.id;
  };
};

export const updatePost = (id, postObject) => {
  return async (dispatch) => {
    const updatedPost = await postService.editPost(id, postObject);

    dispatch({
      type: 'UPDATE_POST',
      payload: updatedPost,
    });
  };
};

export const toggleUpvote = (id, upvotedBy, downvotedBy) => {
  return async (dispatch) => {
    let pointsCount = upvotedBy.length - downvotedBy.length;
    if (pointsCount < 0) {
      pointsCount = 0;
    }

    dispatch({
      type: 'TOGGLE_VOTE',
      payload: { upvotedBy, pointsCount, downvotedBy },
    });

    await postService.upvotePost(id);
  };
};

export const toggleDownvote = (id, downvotedBy, upvotedBy) => {
  return async (dispatch) => {
    let pointsCount = upvotedBy.length - downvotedBy.length;
    if (pointsCount < 0) {
      pointsCount = 0;
    }

    dispatch({
      type: 'TOGGLE_VOTE',
      payload: { upvotedBy, pointsCount, downvotedBy },
    });

    await postService.downvotePost(id);
  };
};

export const toggleCommentUpvote = (
  postId,
  commentId,
  upvotedBy,
  downvotedBy
) => {
  return async (dispatch) => {
    const pointsCount = upvotedBy.length - downvotedBy.length;

    dispatch({
      type: 'VOTE_COMMENT',
      payload: { commentId, data: { upvotedBy, pointsCount, downvotedBy } },
    });

    await postService.upvoteComment(postId, commentId);
  };
};

export const toggleCommentDownvote = (
  postId,
  commentId,
  downvotedBy,
  upvotedBy
) => {
  return async (dispatch) => {
    const pointsCount = upvotedBy.length - downvotedBy.length;

    dispatch({
      type: 'VOTE_COMMENT',
      payload: { commentId, data: { upvotedBy, pointsCount, downvotedBy } },
    });

    await postService.downvoteComment(postId, commentId);
  };
};

export const toggleReplyUpvote = (
  postId,
  commentId,
  replyId,
  upvotedBy,
  downvotedBy
) => {
  return async (dispatch) => {
    const pointsCount = upvotedBy.length - downvotedBy.length;

    dispatch({
      type: 'VOTE_REPLY',
      payload: {
        commentId,
        replyId,
        data: { upvotedBy, pointsCount, downvotedBy },
      },
    });

    await postService.upvoteReply(postId, commentId, replyId);
  };
};

export const toggleReplyDownvote = (
  postId,
  commentId,
  replyId,
  downvotedBy,
  upvotedBy
) => {
  return async (dispatch) => {
    const pointsCount = upvotedBy.length - downvotedBy.length;

    dispatch({
      type: 'VOTE_REPLY',
      payload: {
        commentId,
        replyId,
        data: { upvotedBy, pointsCount, downvotedBy },
      },
    });

    await postService.downvoteReply(postId, commentId, replyId);
  };
};

export const addComment = (postId, comment) => {
  return async (dispatch) => {
    const addedComment = await postService.postComment(postId, { comment });

    dispatch({
      type: 'ADD_COMMENT',
      payload: addedComment,
    });
  };
};

export const addReply = (postId, commentId, reply) => {
  return async (dispatch) => {
    const addedReply = await postService.postReply(postId, commentId, {
      reply,
    });

    dispatch({
      type: 'ADD_REPLY',
      payload: { commentId, addedReply },
    });
  };
};

export const editComment = (postId, commentId, comment) => {
  return async (dispatch) => {
    await postService.updateComment(postId, commentId, { comment });
    const updatedAt = Date.now();

    dispatch({
      type: 'EDIT_COMMENT',
      payload: { commentId, data: { updatedAt, commentBody: comment } },
    });
  };
};

export const deleteComment = (postId, commentId) => {
  return async (dispatch) => {
    await postService.removeComment(postId, commentId);

    dispatch({
      type: 'DELETE_COMMENT',
      payload: commentId,
    });
  };
};

export const editReply = (postId, commentId, replyId, reply) => {
  return async (dispatch) => {
    await postService.updateReply(postId, commentId, replyId, { reply });
    const updatedAt = Date.now();

    dispatch({
      type: 'EDIT_REPLY',
      payload: { commentId, replyId, data: { updatedAt, replyBody: reply } },
    });
  };
};

export const deleteReply = (postId, commentId, replyId) => {
  return async (dispatch) => {
    await postService.removeReply(postId, commentId, replyId);

    dispatch({
      type: 'DELETE_REPLY',
      payload: { commentId, replyId },
    });
  };
};

export const sortComments = (sortBy) => {
  return (dispatch) => {
    dispatch({
      type: 'SORT_COMMENTS',
      payload: sortBy,
    });
  };
};

export default postPageReducer;
