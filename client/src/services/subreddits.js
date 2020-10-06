import axios from 'axios';
import backendUrl from '../backendUrl';
import { token } from './auth';

const baseUrl = `${backendUrl}/api/subreddits`;

const setConfig = () => {
  return {
    headers: { 'x-auth-token': token },
  };
};

const getAllSubreddits = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getSubreddit = async (subredditName) => {
  const response = await axios.get(`${baseUrl}/${subredditName}`);
  return response.data;
};

const subscribeSub = async (id) => {
  const response = await axios.post(
    `${baseUrl}/${id}/subscribe`,
    null,
    setConfig()
  );
  return response.data;
};

export default { getAllSubreddits, getSubreddit, subscribeSub };
