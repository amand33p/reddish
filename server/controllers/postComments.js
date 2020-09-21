const router = require('express').Router();
const Post = require('../models/post');
const User = require('../models/user');
const { auth } = require('../utils/middleware');

router.post('/:id/comment', auth, async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).send({ message: `Comment body can't be empty.` });
  }

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

  post.comments = post.comments.concat({
    commentedBy: user._id,
    commentBody: comment,
    upvotedBy: [user._id],
    pointsCount: 1,
  });
  post.commentCount = post.commentCount + 1;
  const savedPost = await post.save();

  user.karmaPoints.commentKarma = user.karmaPoints.commentKarma + 1;
  await user.save();

  const updatedComments = {
    comments: savedPost.comments,
  };

  res.status(201).json(updatedComments);
});

router.delete('/:id/comment/:commentId', auth, async (req, res) => {
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

  if (targetComment.commentedBy.toString() !== user._id.toString()) {
    return res.status(401).send({ message: 'Access is denied.' });
  }

  post.comments = post.comments.filter((c) => c._id.toString() !== commentId);
  post.commentCount = post.commentCount - 1;

  const savedPost = await post.save();
  const updatedComments = {
    comments: savedPost.comments,
  };

  res.status(204).json(updatedComments);
});

router.patch('/:id/comment/:commentId', auth, async (req, res) => {
  const { id, commentId } = req.params;
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).send({ message: `Comment body can't be empty.` });
  }

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

  if (targetComment.commentedBy.toString() !== user._id.toString()) {
    return res.status(401).send({ message: 'Access is denied.' });
  }

  targetComment.commentBody = comment;
  targetComment.updatedAt = Date.now;

  post.comments = post.comments.map((c) =>
    c._id.toString() !== commentId ? c : targetComment
  );

  const savedPost = await post.save();
  const updatedComments = {
    comments: savedPost.comments,
  };

  res.status(202).json(updatedComments);
});

router.post('/:id/comment/:commentId/reply', auth, async (req, res) => {
  const { id, commentId } = req.params;
  const { reply } = req.body;

  if (!reply) {
    return res.status(400).send({ message: `Reply body can't be empty.` });
  }

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

  targetComment.replies = targetComment.replies.concat({
    replyBody: reply,
    repliedBy: user._id,
    upvotedBy: [user._id],
    pointsCount: 1,
  });

  post.comments = post.comments.map((c) =>
    c._id.toString() !== commentId ? c : targetComment
  );
  post.commentCount = post.commentCount + 1;
  const savedPost = await post.save();

  user.karmaPoints.commentKarma = user.karmaPoints.commentKarma + 1;
  await user.save();

  const updatedComments = {
    comments: savedPost.comments,
  };

  res.status(201).json(updatedComments);
});

router.delete(
  '/:id/comment/:commentId/reply/:replyId',
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

    if (targetReply.repliedBy.toString() !== user._id.toString()) {
      return res.status(401).send({ message: 'Access is denied.' });
    }

    targetComment.replies = targetComment.replies.filter(
      (r) => r._id.toString() !== replyId
    );

    post.comments = post.comments.map((c) =>
      c._id.toString() !== commentId ? c : targetComment
    );
    post.commentCount = post.commentCount - 1;

    const savedPost = await post.save();
    const updatedComments = {
      comments: savedPost.comments,
    };

    res.status(204).json(updatedComments);
  }
);

router.patch(
  '/:id/comment/:commentId/reply/:replyId',
  auth,
  async (req, res) => {
    const { id, commentId, replyId } = req.params;
    const { reply } = req.body;

    if (!reply) {
      return res.status(400).send({ message: `Reply body can't be empty.` });
    }

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

    if (targetReply.repliedBy.toString() !== user._id.toString()) {
      return res.status(401).send({ message: 'Access is denied.' });
    }

    targetReply.replyBody = reply;
    targetComment.updatedAt = Date.now;
    targetComment.replies = targetComment.replies.map((r) =>
      r._id.toString() !== replyId ? r : targetReply
    );

    post.comments = post.comments.map((c) =>
      c._id.toString() !== commentId ? c : targetComment
    );

    const savedPost = await post.save();
    const updatedComments = {
      comments: savedPost.comments,
    };

    res.status(202).json(updatedComments);
  }
);

module.exports = router;
