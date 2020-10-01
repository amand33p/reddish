import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';
import subredditReducer from './reducers/subredditReducer';
import postCommentsReducer from './reducers/postCommentsReducer';

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  posts: postReducer,
  postComments: postCommentsReducer,
  subreddits: subredditReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
