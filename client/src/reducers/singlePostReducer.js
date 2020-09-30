import postService from '../services/posts';

const singlePostReducer = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_NEW_POST':
      return state;
    default:
      return state;
  }
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

export default singlePostReducer;
