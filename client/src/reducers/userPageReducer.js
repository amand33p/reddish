import userService from '../services/user';
import postService from '../services/posts';

const userPageReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return action.payload;
    case 'TOGGLE_USERPAGE_VOTE':
      return {
        ...state,
        posts: state.posts.map((p) =>
          p.id !== action.payload.id ? p : { ...p, ...action.payload.data }
        ),
      };
    default:
      return state;
  }
};

export const fetchUser = (username) => {
  return async (dispatch) => {
    const user = await userService.getUser(username);

    dispatch({
      type: 'FETCH_USER',
      payload: user,
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
      type: 'TOGGLE_USERPAGE_VOTE',
      payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
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
      type: 'TOGGLE_USERPAGE_VOTE',
      payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
    });

    await postService.downvotePost(id);
  };
};

export default userPageReducer;
