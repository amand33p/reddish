const router = require('express').Router();
const User = require('../models/user');
const { auth } = require('../utils/middleware');
const { cloudinary } = require('../utils/config');

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).populate({
    path: 'posts',
    select: '-upvotedBy -downvotedBy',
    populate: { path: 'subreddit', select: 'subredditName' },
  });

  if (!user) {
    return res
      .status(404)
      .send({ message: 'User does not exist in database.' });
  }

  res.json(user);
});

router.post('/avatar', auth, async (req, res) => {
  const { avatarImage } = req.body;

  const user = await User.findById(req.user);

  if (!user) {
    return res
      .status(404)
      .send({ message: 'User does not exist in database.' });
  }

  const uploadedImage = await cloudinary.uploader.upload(
    avatarImage,
    {
      upload_preset: 'readify',
    },
    (error) => {
      if (error) return res.status(401).send({ message: error.message });
    }
  );

  user.avatar = {
    exists: true,
    imageLink: uploadedImage.url,
    imageId: uploadedImage.public_id,
  };

  const savedUser = await user.save();
  const populatedUser = await savedUser
    .populate({
      path: 'posts',
      select: '-upvotedBy -downvotedBy',
      populate: { path: 'subreddit', select: 'subredditName' },
    })
    .execPopulate();

  res.status(201).json(populatedUser);
});

router.delete('/avatar', auth, async (req, res) => {
  const user = await User.findById(req.user);

  if (!user) {
    return res
      .status(404)
      .send({ message: 'User does not exist in database.' });
  }

  user.avatar = {
    exists: false,
    imageLink: 'null',
    imageId: 'null',
  };

  await user.save();
  res.status(204).end();
});

module.exports = router;
