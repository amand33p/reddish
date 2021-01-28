const Subreddit = require('../models/subreddit');
const User = require('../models/user');
const Post = require('../models/post');

const paginateResults = require('../utils/paginateResults');

const getSubreddits = async (_req, res) => {
  const allSubreddits = await Subreddit.find({}).select('id subredditName');
  res.status(200).json(allSubreddits);
};

const getSubredditPosts = async (req, res) => {
  const { subredditName } = req.params;
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);
  const sortBy = req.query.sortby;

  let sortQuery;
  switch (sortBy) {
    case 'new':
      sortQuery = { createdAt: -1 };
      break;
    case 'top':
      sortQuery = { pointsCount: -1 };
      break;
    case 'best':
      sortQuery = { voteRatio: -1 };
      break;
    case 'hot':
      sortQuery = { hotAlgo: -1 };
      break;
    case 'controversial':
      sortQuery = { controversialAlgo: -1 };
      break;
    case 'old':
      sortQuery = { createdAt: 1 };
      break;
    default:
      sortQuery = {};
  }

  const subreddit = await Subreddit.findOne({
    subredditName: { $regex: new RegExp('^' + subredditName + '$', 'i') },
  }).populate('admin', 'username');

  if (!subreddit) {
    return res.status(404).send({
      message: `Subreddit '${subredditName}' does not exist on server.`,
    });
  }

  const postsCount = await Post.find({
    subreddit: subreddit.id,
  }).countDocuments();

  const paginated = paginateResults(page, limit, postsCount);
  const subredditPosts = await Post.find({ subreddit: subreddit.id })
    .sort(sortQuery)
    .select('-comments')
    .limit(limit)
    .skip(paginated.startIndex)
    .populate('author', 'username')
    .populate('subreddit', 'subredditName');

  const paginatedPosts = {
    previous: paginated.results.previous,
    results: subredditPosts,
    next: paginated.results.next,
  };

  res.status(200).json({ subDetails: subreddit, posts: paginatedPosts });
};

const getTopSubreddits = async (_req, res) => {
  const top10Subreddits = await Subreddit.find({})
    .sort({ subscriberCount: -1 })
    .limit(10)
    .select('-description -posts -admin ');

  res.status(200).json(top10Subreddits);
};

const createNewSubreddit = async (req, res) => {
  const { subredditName, description } = req.body;

  const admin = await User.findById(req.user);
  if (!admin) {
    return res
      .status(404)
      .send({ message: 'User does not exist in database.' });
  }

  const existingSubName = await Subreddit.findOne({
    subredditName: { $regex: new RegExp('^' + subredditName + '$', 'i') },
  });

  if (existingSubName) {
    return res.status(403).send({
      message: `Subreddit having same name "${subredditName}" already exists. Choose another name.`,
    });
  }

  const newSubreddit = new Subreddit({
    subredditName,
    description,
    admin: admin._id,
    subscribedBy: [admin._id],
    subscriberCount: 1,
  });

  const savedSubreddit = await newSubreddit.save();

  admin.subscribedSubs = admin.subscribedSubs.concat(savedSubreddit._id);
  await admin.save();

  return res.status(201).json(savedSubreddit);
};

const editSubDescription = async (req, res) => {
  const { description } = req.body;
  const { id } = req.params;

  if (!description) {
    return res
      .status(400)
      .send({ message: `Description body can't be empty.` });
  }

  const admin = await User.findById(req.user);
  const subreddit = await Subreddit.findById(id);

  if (!admin) {
    return res
      .status(404)
      .send({ message: 'User does not exist in database.' });
  }

  if (!subreddit) {
    return res.status(404).send({
      message: `Subreddit with ID: ${id} does not exist in database.`,
    });
  }

  if (subreddit.admin.toString() !== admin._id.toString()) {
    return res.status(401).send({ message: 'Access is denied.' });
  }

  subreddit.description = description;

  await subreddit.save();
  res.status(202).end();
};

const subscribeToSubreddit = async (req, res) => {
  const { id } = req.params;

  const subreddit = await Subreddit.findById(id);
  const user = await User.findById(req.user);

  if (subreddit.subscribedBy.includes(user._id.toString())) {
    subreddit.subscribedBy = subreddit.subscribedBy.filter(
      (s) => s.toString() !== user._id.toString()
    );

    user.subscribedSubs = user.subscribedSubs.filter(
      (s) => s.toString() !== subreddit._id.toString()
    );
  } else {
    subreddit.subscribedBy = subreddit.subscribedBy.concat(user._id);

    user.subscribedSubs = user.subscribedSubs.concat(subreddit._id);
  }

  subreddit.subscriberCount = subreddit.subscribedBy.length;

  await subreddit.save();
  await user.save();

  res.status(201).end();
};

module.exports = {
  getSubreddits,
  getSubredditPosts,
  getTopSubreddits,
  createNewSubreddit,
  editSubDescription,
  subscribeToSubreddit,
};
