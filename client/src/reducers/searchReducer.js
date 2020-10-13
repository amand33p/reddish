import postService from '../services/posts';

const searchReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return action.payload;
    case 'TOGGLE_SEARCH_VOTE':
      return {
        ...state,
        results: state.results.map((r) =>
          r.id !== action.payload.id ? r : { ...r, ...action.payload.data }
        ),
      };
    case 'LOAD_SEARCH_POSTS':
      return {
        ...action.payload,
        results: [...state.results, ...action.payload.results],
      };
    default:
      return state;
  }
};

export const setSearchResults = (query) => {
  return async (dispatch) => {
    const results = await postService.getSearchResults(query, 10, 1);

    dispatch({
      type: 'SET_SEARCH_RESULTS',
      payload: results,
    });
  };
};

export const loadSearchPosts = (query, page) => {
  return async (dispatch) => {
    const results = await postService.getSearchResults(query, 10, page);

    dispatch({
      type: 'LOAD_SEARCH_POSTS',
      payload: results,
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
      type: 'TOGGLE_SEARCH_VOTE',
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
      type: 'TOGGLE_SEARCH_VOTE',
      payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
    });

    await postService.downvotePost(id);
  };
};

export default searchReducer;
