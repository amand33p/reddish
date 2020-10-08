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
  const response = await axios.get(`${baseUrl}/r/${subredditName}`);
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

const updateDescription = async (id, descriptionObj) => {
  const response = await axios.patch(
    `${baseUrl}/${id}`,
    descriptionObj,
    setConfig()
  );
  return response.data;
};

const getTopSubreddits = async () => {
  const response = await axios.get(`${baseUrl}/top10`);
  return response.data;
};

export default {
  getAllSubreddits,
  getSubreddit,
  subscribeSub,
  updateDescription,
  getTopSubreddits,
};
