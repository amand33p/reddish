import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';
import subReducer from './reducers/subReducer';
import postCommentsReducer from './reducers/postCommentsReducer';
import userPageReducer from './reducers/userPageReducer';
import subPageReducer from './reducers/subPageReducer';
import searchReducer from './reducers/searchReducer';
import themeReducer from './reducers/themeReducer';

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  posts: postReducer,
  postComments: postCommentsReducer,
  subs: subReducer,
  userPage: userPageReducer,
  subPage: subPageReducer,
  search: searchReducer,
  darkMode: themeReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
