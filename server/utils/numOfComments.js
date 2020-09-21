const numOfComments = (commentsArray) => {
  const numOfReplies = commentsArray
    .map((c) => c.replies.length)
    .reduce((sum, c) => sum + c, 0);

  return commentsArray.length + numOfReplies;
};

module.exports = numOfComments;
