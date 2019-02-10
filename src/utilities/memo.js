/* eslint-disable import/prefer-default-export */
export const memoizeByLastArgs = fn => {
  let initialized = false;
  let lastResult;
  let lastArgs;
  return (...args) => {
    if (
      !initialized ||
      args.length !== lastArgs.length ||
      !args.every((arg, index) => arg === lastArgs[index])
    ) {
      initialized = true;
      lastArgs = args;
      lastResult = fn(...args);
    }
    return lastResult;
  };
};
