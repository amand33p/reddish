const router = require('express').Router();
const User = require('../models/user');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: 'posts',
    select: '-upvotedBy -downvotedBy',
    populate: { path: 'subreddit', select: 'subredditName' },
  });

  res.json(user);
});

module.exports = router;
