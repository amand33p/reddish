import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import postReducer from './reducers/postReducer';

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  posts: postReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
