const pointsCalculator = (upvotes, downvotes, createdDate) => {
  const result = {};
  const points = upvotes - downvotes;

  if (points <= 0) {
    result.pointsCount = 0;
  } else {
    result.pointsCount = points;
  }

  const voteRatio = upvotes / downvotes;

  if (!isFinite(voteRatio)) {
    result.voteRatio = 1;
  } else {
    result.voteRatio = voteRatio;
  }

  result.hotAlgo =
    Math.log(Math.max(Math.abs(upvotes - downvotes), 1)) + createdDate / 4500;

  result.controversialAlgo =
    (upvotes + downvotes) / Math.max(Math.abs(upvotes - downvotes), 1);

  return result;
};

module.exports = pointsCalculator;
