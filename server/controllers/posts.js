const router = require('express').Router();
const Post = require('../models/post');
const User = require('../models/user');
const postTypeValidator = require('../utils/postTypeValidator');
const { auth } = require('../utils/middleware');
const { cloudinary } = require('../utils/config');

router.get('/', async (_req, res) => {
  const allPosts = await Post.find({});
  res.status(200).json(allPosts);
});

router.post('/', auth, async (req, res) => {
  const { title, subreddit } = req.body;

  const postSubmission = postTypeValidator(req.body);
});

module.exports = router;
