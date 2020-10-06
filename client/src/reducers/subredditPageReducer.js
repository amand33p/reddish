import subredditService from '../services/subreddits';

const subredditPageReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_SUBREDDIT':
      return action.payload;
    default:
      return state;
  }
};

export const fetchSubreddit = (subredditName) => {
  return async (dispatch) => {
    const subreddit = await subredditService.getSubreddit(subredditName);

    dispatch({
      type: 'FETCH_SUBREDDIT',
      payload: subreddit,
    });
  };
};

export default subredditPageReducer;
