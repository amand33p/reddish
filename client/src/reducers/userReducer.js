import authService from '../services/auth';
import storageService from '../utils/localStorage';
import postService from '../services/posts';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'SIGNUP':
      return action.payload;
    case 'LOGOUT':
      return null;
    case 'SET_USER':
      return action.payload;
    default:
      return state;
  }
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    const user = await authService.login(credentials);
    storageService.saveUser(user);
    postService.setToken(user.token);

    dispatch({
      type: 'LOGIN',
      payload: user,
    });

    return user;
  };
};

export const signupUser = (credentials) => {
  return async (dispatch) => {
    const user = await authService.signup(credentials);
    storageService.saveUser(user);
    postService.setToken(user.token);

    dispatch({
      type: 'SIGNUP',
      payload: user,
    });

    return user;
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    storageService.logoutUser();
    postService.setToken(null);

    dispatch({
      type: 'LOGOUT',
    });
  };
};

export const setUser = () => {
  return (dispatch) => {
    const loggedUser = storageService.loadUser();

    if (loggedUser) {
      postService.setToken(loggedUser.token);

      dispatch({
        type: 'SET_USER',
        payload: loggedUser,
      });
    }
  };
};

export default userReducer;
