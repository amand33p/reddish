import postService from '../services/posts';

const postPageReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_POST_COMMENTS':
      return action.payload;
    case 'CREATE_NEW_POST':
      return state;
    case 'UPDATE_POST':
      return state;
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

export default postPageReducer;
