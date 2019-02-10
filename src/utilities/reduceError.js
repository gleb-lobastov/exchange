export default (state, { type }, errorCode) => ({
  ...state,
  lastError: {
    type,
    errorCode,
  },
});
