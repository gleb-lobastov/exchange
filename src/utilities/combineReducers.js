export default reducers => (state = {}, action) =>
  Object.keys(reducers).reduce((memo, key) => {
    const reducer = reducers[key];
    // eslint-disable-next-line no-param-reassign
    memo[key] = reducer(state[key], action);
    return memo;
  }, {});
