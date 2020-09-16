const mongoose = require('mongoose');
const schemaCleaner = require('../utils/schemaCleaner');

const commentSchema = new mongoose.Schema({
  commentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  commentBody: {
    type: String,
    required: true,
    trim: true,
  },
  replies: [
    {
      repliedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      replyBody: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 40,
      trim: true,
    },
    mainContent: {
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
        image_id: {
          type: String,
          trim: true,
        },
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
    upvoteCount: {
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

module.exports = mongoose.model('Post', postSchema);
