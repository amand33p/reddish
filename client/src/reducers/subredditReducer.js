import subredditService from '../services/subreddits';

const subredditReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SUBREDDIT_LIST':
      return action.payload;
    default:
      return state;
  }
};

export const setSubredditList = () => {
  return async (dispatch) => {
    const subreddits = await subredditService.getAllSubreddits();

    dispatch({
      type: 'SET_SUBREDDIT_LIST',
      payload: subreddits,
    });
  };
};

export default subredditReducer;
