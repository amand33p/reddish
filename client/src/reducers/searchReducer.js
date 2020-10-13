import postService from '../services/posts';

const searchReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return action.payload;
    default:
      return state;
  }
};

export const setSearchResults = (query) => {
  return async (dispatch) => {
    const results = await postService.getSearchResults(query);

    dispatch({
      type: 'SET_SEARCH_RESULTS',
      payload: results,
    });
  };
};

export default searchReducer;
