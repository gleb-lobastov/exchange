// eslint-disable-next-line import/prefer-default-export
export const delay = timeInMs =>
  new Promise(resolve => setTimeout(resolve, timeInMs));
