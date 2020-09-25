import postService from '../services/posts';

const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_POSTS':
      return action.payload;
    default:
      return state;
  }
};

export const initPosts = () => {
  return async (dispatch) => {
    const posts = await postService.getNewPosts();
    dispatch({
      type: 'INIT_POSTS',
      payload: posts.results,
    });
  };
};

export default postReducer;
