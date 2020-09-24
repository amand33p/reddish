import authService from '../services/auth';
import storageService from '../utils/localStorage';

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

    dispatch({
      type: 'LOGIN',
      payload: user,
    });
  };
};

export const signupUser = (credentials) => {
  return async (dispatch) => {
    const user = await authService.signup(credentials);
    storageService.saveUser(user);

    dispatch({
      type: 'SIGNUP',
      payload: user,
    });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    storageService.logoutUser();

    dispatch({
      type: 'LOGOUT',
    });
  };
};

export const setUser = () => {
  return (dispatch) => {
    const loggedUser = storageService.loadUser();

    if (loggedUser) {
      dispatch({
        type: 'SET_USER',
        payload: loggedUser,
      });
    }
  };
};

export default userReducer;
