import axios from 'axios';
import backendUrl from '../backendUrl';

const baseUrl = `${backendUrl}/api/posts`;

let token = null;

const setToken = (newToken) => {
  token = newToken;
};

const setConfig = () => {
  return {
    headers: { 'x-auth-token': token },
  };
};

const getNewPosts = async () => {
  const response = await axios.get(`${baseUrl}/new`);
  return response.data;
};

export default { setToken, getNewPosts };
