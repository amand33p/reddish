import axios from 'axios';
import backendUrl from '../backendUrl';
import authService from './auth';

const baseUrl = `${backendUrl}/api/posts`;
const token = authService.token;

const setConfig = () => {
  return {
    headers: { 'x-auth-token': token },
  };
};

const getNewPosts = async () => {
  const response = await axios.get(`${baseUrl}/new`);
  return response.data;
};

const upvotePost = async (id) => {
  const response = await axios.post(
    `${baseUrl}/${id}/upvote`,
    null,
    setConfig()
  );
  return response.data;
};

const downvotePost = async (id) => {
  const response = await axios.post(
    `${baseUrl}/${id}/downvote`,
    null,
    setConfig()
  );
  return response.data;
};

const deletePost = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, setConfig());
  return response.data;
};

export default { getNewPosts, upvotePost, downvotePost, deletePost };
