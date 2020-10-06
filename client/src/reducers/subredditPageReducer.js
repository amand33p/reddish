import subredditService from '../services/subreddits';
import postService from '../services/posts';

const subredditPageReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_SUBREDDIT':
      return action.payload;
    case 'TOGGLE_SUBPAGE_VOTE':
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

export const fetchSubreddit = (subredditName) => {
  return async (dispatch) => {
    const subreddit = await subredditService.getSubreddit(subredditName);

    dispatch({
      type: 'FETCH_SUBREDDIT',
      payload: subreddit,
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

export default subredditPageReducer;
