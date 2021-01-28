const express = require('express');
const { auth } = require('../utils/middleware');
const {
  getSubreddits,
  getSubredditPosts,
  getTopSubreddits,
  createNewSubreddit,
  editSubDescription,
  subscribeToSubreddit,
} = require('../controllers/subreddit');

const router = express.Router();

router.get('/', getSubreddits);
router.get('/r/:subredditName', getSubredditPosts);
router.get('/top10', getTopSubreddits);
router.post('/', auth, createNewSubreddit);
router.patch('/:id', auth, editSubDescription);
router.post('/:id/subscribe', auth, subscribeToSubreddit);

module.exports = router;
