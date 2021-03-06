import subService from '../services/subs';

const subredditReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_ALL_SUBS_LIST':
      return { ...state, allSubs: action.payload };
    case 'SET_TOP_SUBS_LIST':
      return { ...state, topSubs: action.payload };
    case 'SUBSCRIBE_SUB_FROM_LIST':
      return {
        ...state,
        topSubs: state.topSubs.map((t) =>
          t.id !== action.payload.id ? t : { ...t, ...action.payload.data }
        ),
      };
    case 'ADD_NEW_SUB':
      return {
        ...state,
        allSubs: [...state.allSubs, action.payload],
      };
    default:
      return state;
  }
};

export const setSubredditList = () => {
  return async (dispatch) => {
    const subreddits = await subService.getAllSubreddits();

    dispatch({
      type: 'SET_ALL_SUBS_LIST',
      payload: subreddits,
    });
  };
};

export const setTopSubsList = () => {
  return async (dispatch) => {
    const top10Subs = await subService.getTopSubreddits();

    dispatch({
      type: 'SET_TOP_SUBS_LIST',
      payload: top10Subs,
    });
  };
};

export const toggleSubscribe = (id, subscribedBy) => {
  return async (dispatch) => {
    const subscriberCount = subscribedBy.length;

    dispatch({
      type: 'SUBSCRIBE_SUB_FROM_LIST',
      payload: { id, data: { subscribedBy, subscriberCount } },
    });

    await subService.subscribeSub(id);
  };
};

export const addNewSubreddit = (subredditObj) => {
  return async (dispatch) => {
    const createdSubreddit = await subService.createSubreddit(subredditObj);

    dispatch({
      type: 'ADD_NEW_SUB',
      payload: {
        subredditName: createdSubreddit.subredditName,
        id: createdSubreddit.id,
      },
    });
  };
};

export default subredditReducer;
