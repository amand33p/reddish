import axios from 'axios';
import backendUrl from '../backendUrl';

const login = async (credentials) => {
  const response = await axios.post(`${backendUrl}/api/login`, credentials);
  return response.data;
};

const signup = async (enteredData) => {
  const response = await axios.post(`${backendUrl}/api/signup`, enteredData);
  return response.data;
};

export default { login, signup };
