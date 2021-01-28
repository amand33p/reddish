const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { SECRET } = require('../utils/config');

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    username: { $regex: new RegExp('^' + username + '$', 'i') },
  });

  if (!user) {
    return res
      .status(400)
      .send({ message: 'No account with this username has been registered.' });
  }

  const credentialsValid = await bcrypt.compare(password, user.passwordHash);

  if (!credentialsValid) {
    return res.status(401).send({ message: 'Invalid username or password.' });
  }

  const payloadForToken = {
    id: user._id,
  };

  const token = jwt.sign(payloadForToken, SECRET);

  res.status(200).json({
    token,
    username: user.username,
    id: user._id,
    avatar: user.avatar,
    karma: user.karmaPoints.postKarma + user.karmaPoints.commentKarma,
  });
};

const signupUser = async (req, res) => {
  const { username, password } = req.body;

  if (!password || password.length < 6) {
    return res
      .status(400)
      .send({ message: 'Password needs to be atleast 6 characters long.' });
  }

  if (!username || username.length > 20 || username.length < 3) {
    return res
      .status(400)
      .send({ message: 'Username character length must be in range of 3-20.' });
  }

  const existingUser = await User.findOne({
    username: { $regex: new RegExp('^' + username + '$', 'i') },
  });

  if (existingUser) {
    return res.status(400).send({
      message: `Username '${username}' is already taken. Choose another one.`,
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  const payloadForToken = {
    id: savedUser._id,
  };

  const token = jwt.sign(payloadForToken, SECRET);

  res.status(200).json({
    token,
    username: savedUser.username,
    id: savedUser._id,
    avatar: savedUser.avatar,
    karma: 0,
  });
};

module.exports = { loginUser, signupUser };
