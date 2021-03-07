import subService from '../services/subs';
import postService from '../services/posts';

const subPageReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_SUB':
      return action.payload;
    case 'LOAD_SUB_POSTS':
      return {
        ...state,
        posts: {
          ...action.payload.posts,
          results: [...state.posts.results, ...action.payload.posts.results],
        },
      };
    case 'TOGGLE_SUBPAGE_VOTE':
      return {
        ...state,
        posts: {
          ...state.posts,
          results: state.posts.results.map((p) =>
            p.id !== action.payload.id ? p : { ...p, ...action.payload.data }
          ),
        },
      };
    case 'SUBSCRIBE_SUB':
      return {
        ...state,
        subDetails: { ...state.subDetails, ...action.payload },
      };
    case 'EDIT_DESCRIPTION':
      return {
        ...state,
        subDetails: { ...state.subDetails, description: action.payload },
      };
    default:
      return state;
  }
};

export const fetchSub = (subredditName, sortBy) => {
  return async (dispatch) => {
    const sub = await subService.getSubreddit(subredditName, sortBy, 10, 1);

    dispatch({
      type: 'FETCH_SUB',
      payload: sub,
    });
  };
};

export const loadSubPosts = (subredditName, sortBy, page) => {
  return async (dispatch) => {
    const sub = await subService.getSubreddit(subredditName, sortBy, 10, page);

    dispatch({
      type: 'LOAD_SUB_POSTS',
      payload: sub,
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
      type: 'TOGGLE_SUBPAGE_VOTE',
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
      type: 'TOGGLE_SUBPAGE_VOTE',
      payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
    });

    await postService.downvotePost(id);
  };
};

export const toggleSubscribe = (id, subscribedBy) => {
  return async (dispatch) => {
    const subscriberCount = subscribedBy.length;

    dispatch({
      type: 'SUBSCRIBE_SUB',
      payload: { subscribedBy, subscriberCount },
    });

    await subService.subscribeSub(id);
  };
};

export const editDescription = (id, description) => {
  return async (dispatch) => {
    await subService.updateDescription(id, { description });

    dispatch({
      type: 'EDIT_DESCRIPTION',
      payload: description,
    });
  };
};

export default subPageReducer;
