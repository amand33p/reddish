const getErrorMsg = (err) => {
  if (err?.response?.data?.message) {
    return err.response.data.message;
  } else if (err?.message === 'Network Error') {
    return err.message;
  } else {
    return 'Something went wrong.';
  }
};

export default getErrorMsg;
