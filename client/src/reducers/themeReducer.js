import storageService from '../utils/localStorage';

const themeReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return !state;
    default:
      return state;
  }
};

export const toggleDarkMode = (isDarkMode) => {
  return (dispatch) => {
    storageService.saveDarkMode(isDarkMode);

    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };
};

export const setDarkMode = () => {
  return (dispatch) => {
    const isDarkMode = storageService.loadDarkMode();

    if (isDarkMode === 'true') {
      dispatch({ type: 'TOGGLE_DARK_MODE' });
    }
  };
};

export default themeReducer;
