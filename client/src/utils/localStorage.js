const storageKeyToken = 'readifyUserKey';
const storageKeyDarkMode = 'readifyDarkMode';

const saveUser = (user) =>
  localStorage.setItem(storageKeyToken, JSON.stringify(user));

const loadUser = () => JSON.parse(localStorage.getItem(storageKeyToken));

const logoutUser = () => localStorage.removeItem(storageKeyToken);

const saveDarkMode = (boolean) =>
  localStorage.setItem(storageKeyDarkMode, boolean);

const loadDarkMode = () => localStorage.getItem(storageKeyDarkMode);

export default {
  saveUser,
  loadUser,
  logoutUser,
  saveDarkMode,
  loadDarkMode,
};
