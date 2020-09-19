const mongoose = require('mongoose');
const schemaCleaner = require('../utils/schemaCleaner');

const replySchema = new mongoose.Schema({
  repliedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  replyBody: {
    type: String,
    trim: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const commentSchema = new mongoose.Schema({
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  commentBody: {
    type: String,
    trim: true,
  },
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 40,
      trim: true,
    },
    postType: {
      type: String,
      required: true,
    },
    textSubmission: {
      type: String,
      trim: true,
    },
    linkSubmission: {
      type: String,
      trim: true,
    },
    imageSubmission: {
      imageLink: {
        type: String,
        trim: true,
      },
      imageId: {
        type: String,
        trim: true,
      },
    },
    subreddit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subreddit',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    upvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    downvotedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    pointsCount: {
      type: Number,
      required: true,
      default: 1,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

// replaces _id with id, convert id to string from ObjectID and deletes __v
schemaCleaner(postSchema);
schemaCleaner(commentSchema);
schemaCleaner(replySchema);

module.exports = mongoose.model('Post', postSchema);
