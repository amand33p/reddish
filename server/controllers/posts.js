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
  const {
    title,
    subreddit,
    postType,
    textSubmission,
    linkSubmission,
    imageSubmission,
  } = req.body;

  const validatedFields = postTypeValidator(
    postType,
    textSubmission,
    linkSubmission,
    imageSubmission
  );

  const author = await User.findById(req.user);

  if (!author) {
    return res
      .status(404)
      .send({ message: 'User does not exist in database.' });
  }
});

module.exports = router;
