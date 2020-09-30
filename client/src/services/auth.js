import axios from 'axios';
import backendUrl from '../backendUrl';

export let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const login = async (credentials) => {
  const response = await axios.post(`${backendUrl}/api/login`, credentials);
  return response.data;
};

const signup = async (enteredData) => {
  const response = await axios.post(`${backendUrl}/api/signup`, enteredData);
  return response.data;
};

export default { setToken, login, signup };
