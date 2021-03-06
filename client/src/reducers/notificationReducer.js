const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload;
    case 'CLEAR_NOTIFICATION':
      return null;
    default:
      return state;
  }
};

let timeoutID = null;

export const notify = (message, severity) => {
  const duration = severity === 'error' ? 15 : 5;

  return (dispatch) => {
    clearTimeout(timeoutID);

    dispatch({
      type: 'SET_NOTIFICATION',
      payload: { message, severity },
    });

    timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      });
    }, duration * 1000);
  };
};

export const clearNotif = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_NOTIFICATION',
    });
  };
};

export default notificationReducer;
