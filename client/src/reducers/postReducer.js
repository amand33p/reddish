import postService from '../services/posts';

const postReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return action.payload;
    case 'LOAD_MORE_POSTS':
      return {
        ...action.payload,
        results: [...state.results, ...action.payload.results],
      };
    case 'TOGGLE_VOTE':
      return {
        ...state,
        results: state.results.map((r) =>
          r.id !== action.payload.id ? r : { ...r, ...action.payload.data }
        ),
      };
    case 'DELETE_POST':
      return {
        ...state,
        results: state.results.filter((r) => r.id !== action.payload),
      };
    default:
      return state;
  }
};

export const fetchPosts = (sortBy) => {
  return async (dispatch) => {
    let posts;

    if (sortBy !== 'subscribed') {
      posts = await postService.getPosts(sortBy, 10, 1);
    } else {
      posts = await postService.getSubPosts(10, 1);
    }

    dispatch({
      type: 'SET_POSTS',
      payload: posts,
    });
  };
};

export const loadMorePosts = (sortBy, page) => {
  return async (dispatch) => {
    let posts;
    if (sortBy !== 'subscribed') {
      posts = await postService.getPosts(sortBy, 10, page);
    } else {
      posts = await postService.getSubPosts(10, page);
    }

    dispatch({
      type: 'LOAD_MORE_POSTS',
      payload: posts,
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
      type: 'TOGGLE_VOTE',
      payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
    });

    await postService.downvotePost(id);
  };
};

export const removePost = (id) => {
  return async (dispatch) => {
    await postService.deletePost(id);

    dispatch({
      type: 'DELETE_POST',
      payload: id,
    });
  };
};

export default postReducer;
