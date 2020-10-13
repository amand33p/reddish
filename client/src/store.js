import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';
import subredditReducer from './reducers/subredditReducer';
import postCommentsReducer from './reducers/postCommentsReducer';
import userPageReducer from './reducers/userPageReducer';
import subredditPageReducer from './reducers/subredditPageReducer';
import searchReducer from './reducers/searchReducer';

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  posts: postReducer,
  postComments: postCommentsReducer,
  subreddits: subredditReducer,
  userPage: userPageReducer,
  subredditPage: subredditPageReducer,
  search: searchReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
