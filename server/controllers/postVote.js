const Post = require('../models/post');
const User = require('../models/user');
const pointsCalculator = require('../utils/pointsCalculator');

const upvotePost = async (req, res) => {
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

    author.karmaPoints.postKarma--;
  } else {
    post.upvotedBy = post.upvotedBy.concat(user._id);
    post.downvotedBy = post.downvotedBy.filter(
      (d) => d.toString() !== user._id.toString()
    );

    author.karmaPoints.postKarma++;
  }

  const calcluatedData = pointsCalculator(
    post.upvotedBy.length,
    post.downvotedBy.length,
    post.createdAt
  );

  post.pointsCount = calcluatedData.pointsCount;
  post.voteRatio = calcluatedData.voteRatio;
  post.hotAlgo = calcluatedData.hotAlgo;
  post.controversialAlgo = calcluatedData.controversialAlgo;

  await post.save();
  await author.save();

  res.status(201).end();
};

const downvotePost = async (req, res) => {
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

    author.karmaPoints.postKarma++;
  } else {
    post.downvotedBy = post.downvotedBy.concat(user._id);
    post.upvotedBy = post.upvotedBy.filter(
      (u) => u.toString() !== user._id.toString()
    );

    author.karmaPoints.postKarma--;
  }

  const calcluatedData = pointsCalculator(
    post.upvotedBy.length,
    post.downvotedBy.length,
    post.createdAt
  );

  post.pointsCount = calcluatedData.pointsCount;
  post.voteRatio = calcluatedData.voteRatio;
  post.hotAlgo = calcluatedData.hotAlgo;
  post.controversialAlgo = calcluatedData.controversialAlgo;

  await post.save();
  await author.save();

  res.status(201).end();
};

module.exports = { upvotePost, downvotePost };
