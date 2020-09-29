import axios from 'axios';
import backendUrl from '../backendUrl';
import authService from './auth';

const baseUrl = `${backendUrl}/api/subreddits`;
const token = authService.token;

const setConfig = () => {
  return {
    headers: { 'x-auth-token': token },
  };
};

const getAllSubreddits = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getAllSubreddits };
