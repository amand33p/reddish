import subredditService from '../services/subreddits';

const subredditReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ALL_SUBS_LIST':
      return { ...state, allSubs: action.payload };
    case 'SET_TOP_SUBS_LIST':
      return { ...state, topSubs: action.payload };
    default:
      return state;
  }
};

export const setSubredditList = () => {
  return async (dispatch) => {
    const subreddits = await subredditService.getAllSubreddits();

    dispatch({
      type: 'SET_ALL_SUBS_LIST',
      payload: subreddits,
    });
  };
};

export const setTopSubsList = () => {
  return async (dispatch) => {
    const top10Subs = await subredditService.getTopSubreddits();

    dispatch({
      type: 'SET_TOP_SUBS_LIST',
      payload: top10Subs,
    });
  };
};

export default subredditReducer;
