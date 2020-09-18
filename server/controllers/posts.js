const router = require('express').Router();
const Post = require('../models/post');
const Subreddit = require('../models/subreddit');
const User = require('../models/user');
const postTypeValidator = require('../utils/postTypeValidator');
const { auth } = require('../utils/middleware');
const { cloudinary } = require('../utils/config');

router.get('/', async (_req, res) => {
  const allPosts = await Post.find({})
    .populate('author', { username: 1 })
    .populate('subreddit', { subredditName: 1 });

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
  const targetSubreddit = await Subreddit.findById(subreddit);

  if (!targetSubreddit) {
    return res.status(404).send({
      message: `Subreddit with ID: '${subreddit}'  does not exist in database.`,
    });
  }

  if (!author) {
    return res
      .status(404)
      .send({ message: 'User does not exist in database.' });
  }

  const newPost = new Post({
    title,
    subreddit,
    author: author._id,
    upvotedBy: [author._id],
    pointsCount: 1,
    ...validatedFields,
  });

  if (postType === 'Image') {
    const uploadedImage = await cloudinary.uploader.upload(
      imageSubmission,
      {
        upload_preset: 'readify',
      },
      (error) => {
        if (error) return res.status(401).send({ message: error.message });
      }
    );

    newPost.imageSubmission = {
      imageLink: uploadedImage.url,
      imageId: uploadedImage.public_id,
    };
  }

  const savedPost = await newPost.save();

  targetSubreddit.posts = targetSubreddit.posts.concat(savedPost._id);
  await targetSubreddit.save();

  author.posts = author.posts.concat(savedPost._id);
  await author.save();

  const postToSend = await savedPost
    .populate('author', { username: 1 })
    .populate('subreddit', { subredditName: 1 })
    .execPopulate();

  res.status(201).json(postToSend);
});

module.exports = router;
