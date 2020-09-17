const router = require('express').Router();
const User = require('../models/user');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
});

module.exports = router;
