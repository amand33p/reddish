const router = require('express').Router();
const Post = require('../models/post');

router.get('/', async (_req, res) => {
  res.status(200).send('working');
});

module.exports = router;
