const paginateResults = (page, limit, docCount) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {};

  if (endIndex < docCount) {
    results.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit,
    };
  }

  return {
    startIndex,
    endIndex,
    results,
  };
};

module.exports = paginateResults;
