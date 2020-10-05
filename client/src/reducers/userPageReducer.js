import userService from '../services/user';

const userPageReducer = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return action.payload;
    default:
      return state;
  }
};

export const fetchUser = (username) => {
  return async (dispatch) => {
    const user = await userService.getUser(username);

    dispatch({
      type: 'FETCH_USER',
      payload: user,
    });
  };
};

export default userPageReducer;
