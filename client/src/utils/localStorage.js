const storageKeyToken = 'readifyUserKey';
const storageKeyDarkMode = 'readifyDarkMode';

const saveUser = (user) =>
  localStorage.setItem(storageKeyToken, JSON.stringify(user));

const loadUser = () => JSON.parse(localStorage.getItem(storageKeyToken));

const logoutUser = () => localStorage.removeItem(storageKeyToken);

const saveDarkMode = (boolean) =>
  localStorage.setItem(storageKeyDarkMode, boolean);

const loadDarkMode = () => localStorage.getItem(storageKeyDarkMode);

const storage = {
  saveUser,
  loadUser,
  logoutUser,
  saveDarkMode,
  loadDarkMode,
};

export default storage;
