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

const getSubreddit = async (subredditName, sortBy, limit, page) => {
  const response = await axios.get(
    `${baseUrl}/r/${subredditName}/?sortby=${sortBy}&limit=${limit}&page=${page}`
  );
  return response.data;
};

const createSubreddit = async (subredditObj) => {
  const response = await axios.post(`${baseUrl}`, subredditObj, setConfig());
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

const subService = {
  getAllSubreddits,
  createSubreddit,
  getSubreddit,
  subscribeSub,
  updateDescription,
  getTopSubreddits,
};

export default subService;
