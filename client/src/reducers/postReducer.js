import postService from '../services/posts';

const postReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_POSTS':
      return action.payload;
    case 'TOGGLE_UPVOTE':
      return state.map((s) =>
        s.id !== action.payload.id ? s : { ...s, ...action.payload.data }
      );
    case 'TOGGLE_DOWNVOTE':
      return state.map((s) =>
        s.id !== action.payload.id ? s : { ...s, ...action.payload.data }
      );
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

export const toggleUpvote = (id, upvotedBy, downvotedBy) => {
  return async (dispatch) => {
    let pointsCount = upvotedBy.length - downvotedBy.length;
    if (pointsCount < 0) {
      pointsCount = 0;
    }

    const payload = { id, data: { upvotedBy, pointsCount, downvotedBy } };

    dispatch({
      type: 'TOGGLE_UPVOTE',
      payload,
    });

    await postService.upvote(id);
  };
};

export const toggleDownvote = (id, downvotedBy, upvotedBy) => {
  return async (dispatch) => {
    let pointsCount = upvotedBy.length - downvotedBy.length;
    if (pointsCount < 0) {
      pointsCount = 0;
    }

    const payload = { id, data: { upvotedBy, pointsCount, downvotedBy } };

    dispatch({
      type: 'TOGGLE_DOWNVOTE',
      payload,
    });

    await postService.downvote(id);
  };
};

export default postReducer;
