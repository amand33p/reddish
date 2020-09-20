const router = require('express').Router();
const Post = require('../models/post');
const User = require('../models/user');
const { auth } = require('../utils/middleware');

router.post('/:id/comment/:commentId/upvote', auth, async (req, res) => {
  const { id, commentId } = req.params;

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

  const targetComment = post.comments.find(
    (c) => c._id.toString() === commentId
  );

  if (!targetComment) {
    return res.status(404).send({
      message: `Comment with ID: '${commentId}'  does not exist in database.`,
    });
  }

  const commentAuthor = await User.findById(targetComment.commentedBy);

  if (!commentAuthor) {
    return res
      .status(404)
      .send({ message: 'Comment author does not exist in database.' });
  }

  if (targetComment.upvotedBy.includes(user._id.toString())) {
    targetComment.upvotedBy = targetComment.upvotedBy.filter(
      (u) => u.toString() !== user._id.toString()
    );

    commentAuthor.karmaPoints.commentKarma =
      commentAuthor.karmaPoints.commentKarma - 1;
  } else {
    targetComment.upvotedBy = targetComment.upvotedBy.concat(user._id);
    targetComment.downvotedBy = targetComment.downvotedBy.filter(
      (d) => d.toString() !== user._id.toString()
    );

    commentAuthor.karmaPoints.commentKarma =
      commentAuthor.karmaPoints.commentKarma + 1;
  }

  targetComment.pointsCount =
    targetComment.upvotedBy - targetComment.downvotedBy;

  post.comments = post.comments.map((c) =>
    c._id.toString() !== commentId ? c : targetComment
  );

  const savedPost = await post.save();
  const populatedPost = await savedPost
    .populate('author', 'username')
    .populate('subreddit', 'subredditName')
    .populate('comments.commentedBy', 'username')
    .populate('comments.replies.repliedBy', 'username')
    .execPopulate();

  await commentAuthor.save();

  res.status(201).json(populatedPost);
});

router.post('/:id/comment/:commentId/downvote', auth, async (req, res) => {
  const { id, commentId } = req.params;

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

  const targetComment = post.comments.find(
    (c) => c._id.toString() === commentId
  );

  if (!targetComment) {
    return res.status(404).send({
      message: `Comment with ID: '${commentId}'  does not exist in database.`,
    });
  }

  const commentAuthor = await User.findById(targetComment.commentedBy);

  if (!commentAuthor) {
    return res
      .status(404)
      .send({ message: 'Comment author does not exist in database.' });
  }

  if (targetComment.downvotedBy.includes(user._id.toString())) {
    targetComment.downvotedBy = targetComment.downvotedBy.filter(
      (d) => d.toString() !== user._id.toString()
    );

    commentAuthor.karmaPoints.commentKarma =
      commentAuthor.karmaPoints.commentKarma + 1;
  } else {
    targetComment.downvotedBy = targetComment.downvotedBy.concat(user._id);
    targetComment.upvotedBy = targetComment.upvotedBy.filter(
      (u) => u.toString() !== user._id.toString()
    );

    commentAuthor.karmaPoints.commentKarma =
      commentAuthor.karmaPoints.commentKarma - 1;
  }

  targetComment.pointsCount =
    targetComment.upvotedBy - targetComment.downvotedBy;

  post.comments = post.comments.map((c) =>
    c._id.toString() !== commentId ? c : targetComment
  );

  const savedPost = await post.save();
  const populatedPost = await savedPost
    .populate('author', 'username')
    .populate('subreddit', 'subredditName')
    .populate('comments.commentedBy', 'username')
    .populate('comments.replies.repliedBy', 'username')
    .execPopulate();

  await commentAuthor.save();

  res.status(201).json(populatedPost);
});

router.post(
  '/:id/comment/:commentId/reply/:replyId/upvote',
  auth,
  async (req, res) => {
    const { id, commentId, replyId } = req.params;

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

    const targetComment = post.comments.find(
      (c) => c._id.toString() === commentId
    );

    if (!targetComment) {
      return res.status(404).send({
        message: `Comment with ID: '${commentId}'  does not exist in database.`,
      });
    }

    const targetReply = targetComment.replies.find(
      (r) => r._id.toString() === replyId
    );

    if (!targetReply) {
      return res.status(404).send({
        message: `Reply comment with ID: '${replyId}'  does not exist in database.`,
      });
    }

    const replyAuthor = await User.findById(targetReply.repliedBy);

    if (!replyAuthor) {
      return res
        .status(404)
        .send({ message: 'Reply author does not exist in database.' });
    }

    if (targetReply.upvotedBy.includes(user._id.toString())) {
      targetReply.upvotedBy = targetReply.upvotedBy.filter(
        (u) => u.toString() !== user._id.toString()
      );

      replyAuthor.karmaPoints.commentKarma =
        replyAuthor.karmaPoints.commentKarma - 1;
    } else {
      targetReply.upvotedBy = targetReply.upvotedBy.concat(user._id);
      targetReply.downvotedBy = targetReply.downvotedBy.filter(
        (d) => d.toString() !== user._id.toString()
      );

      replyAuthor.karmaPoints.commentKarma =
        replyAuthor.karmaPoints.commentKarma + 1;
    }

    targetReply.pointsCount = targetReply.upvotedBy - targetReply.downvotedBy;

    targetComment.replies = targetComment.replies.map((r) =>
      r._id.toString() !== replyId ? r : targetReply
    );

    post.comments = post.comments.map((c) =>
      c._id.toString() !== commentId ? c : targetComment
    );

    const savedPost = await post.save();
    const populatedPost = await savedPost
      .populate('author', 'username')
      .populate('subreddit', 'subredditName')
      .populate('comments.commentedBy', 'username')
      .populate('comments.replies.repliedBy', 'username')
      .execPopulate();

    await replyAuthor.save();

    res.status(201).json(populatedPost);
  }
);

router.post(
  '/:id/comment/:commentId/reply/:replyId/downvote',
  auth,
  async (req, res) => {
    const { id, commentId, replyId } = req.params;

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

    const targetComment = post.comments.find(
      (c) => c._id.toString() === commentId
    );

    if (!targetComment) {
      return res.status(404).send({
        message: `Comment with ID: '${commentId}'  does not exist in database.`,
      });
    }

    const targetReply = targetComment.replies.find(
      (r) => r._id.toString() === replyId
    );

    if (!targetReply) {
      return res.status(404).send({
        message: `Reply comment with ID: '${replyId}'  does not exist in database.`,
      });
    }

    const replyAuthor = await User.findById(targetReply.repliedBy);

    if (!replyAuthor) {
      return res
        .status(404)
        .send({ message: 'Reply author does not exist in database.' });
    }

    if (targetReply.downvotedBy.includes(user._id.toString())) {
      targetReply.downvotedBy = targetReply.downvotedBy.filter(
        (d) => d.toString() !== user._id.toString()
      );

      replyAuthor.karmaPoints.commentKarma =
        replyAuthor.karmaPoints.commentKarma + 1;
    } else {
      targetReply.downvotedBy = targetReply.downvotedBy.concat(user._id);
      targetReply.upvotedBy = targetReply.upvotedBy.filter(
        (u) => u.toString() !== user._id.toString()
      );

      replyAuthor.karmaPoints.commentKarma =
        replyAuthor.karmaPoints.commentKarma - 1;
    }

    targetReply.pointsCount = targetReply.upvotedBy - targetReply.downvotedBy;

    targetComment.replies = targetComment.replies.map((r) =>
      r._id.toString() !== replyId ? r : targetReply
    );

    post.comments = post.comments.map((c) =>
      c._id.toString() !== commentId ? c : targetComment
    );

    const savedPost = await post.save();
    const populatedPost = await savedPost
      .populate('author', 'username')
      .populate('subreddit', 'subredditName')
      .populate('comments.commentedBy', 'username')
      .populate('comments.replies.repliedBy', 'username')
      .execPopulate();

    await replyAuthor.save();

    res.status(201).json(populatedPost);
  }
);

module.exports = router;
