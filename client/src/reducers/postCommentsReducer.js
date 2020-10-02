import postService from '../services/posts';

const postPageReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_POST_COMMENTS':
      return action.payload;
    case 'CREATE_NEW_POST':
      return action.payload;
    case 'UPDATE_POST':
      return action.payload;
    case 'TOGGLE_UPVOTE':
      return { ...state, ...action.payload };
    case 'TOGGLE_DOWNVOTE':
      return { ...state, ...action.payload };
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
      type: 'TOGGLE_UPVOTE',
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
      type: 'TOGGLE_DOWNVOTE',
      payload: { upvotedBy, pointsCount, downvotedBy },
    });

    await postService.downvotePost(id);
  };
};

export default postPageReducer;
