const router = require('express').Router();
const Post = require('../models/post');
const User = require('../models/user');
const { auth } = require('../utils/middleware');

router.post('/:id/upvote', auth, async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  const user = await User.findById(req.user);

  if (!post) {
    return res.status(404).send({
      message: `Post with ID: ${id} does not exist in database.`,
    });
  }

  if (!user) {
    return res
      .status(404)
      .send({ message: 'User does not exist in database.' });
  }

  const author = await User.findById(post.author);

  if (!author) {
    return res
      .status(404)
      .send({ message: 'Author user does not exist in database.' });
  }

  if (post.upvotedBy.includes(user._id.toString())) {
    post.upvotedBy = post.upvotedBy.filter(
      (u) => u.toString() !== user._id.toString()
    );

    author.karmaPoints.postKarma = author.karmaPoints.postKarma - 1;
  } else {
    post.upvotedBy = post.upvotedBy.concat(user._id);
    post.downvotedBy = post.downvotedBy.filter(
      (d) => d.toString() !== user._id.toString()
    );

    author.karmaPoints.postKarma = author.karmaPoints.postKarma + 1;
  }

  const calculatedPoints = post.upvotedBy.length - post.downvotedBy.length;

  if (calculatedPoints <= 0) {
    post.pointsCount = 0;
  } else {
    post.pointsCount = calculatedPoints;
  }

  await post.save();
  await author.save();
  res.status(201).end();
});

router.post('/:id/downvote', auth, async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  const user = await User.findById(req.user);

  if (!post) {
    return res.status(404).send({
      message: `Post with ID: ${id} does not exist in database.`,
    });
  }

  if (!user) {
    return res
      .status(404)
      .send({ message: 'User does not exist in database.' });
  }

  const author = await User.findById(post.author);

  if (!author) {
    return res
      .status(404)
      .send({ message: 'Author user does not exist in database.' });
  }

  if (post.downvotedBy.includes(user._id.toString())) {
    post.downvotedBy = post.downvotedBy.filter(
      (d) => d.toString() !== user._id.toString()
    );

    author.karmaPoints.postKarma = author.karmaPoints.postKarma + 1;
  } else {
    post.downvotedBy = post.downvotedBy.concat(user._id);
    post.upvotedBy = post.upvotedBy.filter(
      (u) => u.toString() !== user._id.toString()
    );

    author.karmaPoints.postKarma = author.karmaPoints.postKarma - 1;
  }

  const calculatedPoints = post.upvotedBy.length - post.downvotedBy.length;

  if (calculatedPoints <= 0) {
    post.pointsCount = 0;
  } else {
    post.pointsCount = calculatedPoints;
  }

  await post.save();
  await author.save();
  res.status(201).end();
});

module.exports = router;
