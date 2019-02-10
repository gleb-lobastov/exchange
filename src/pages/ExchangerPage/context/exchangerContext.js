import React from 'react';
import { memoizeByLastArgs } from 'utilities/memo';

export const ExchangerContext = React.createContext({});
export const memoizeContext = memoizeByLastArgs((dispatch, exchangeRate) => ({
  dispatch,
  exchangeRate,
}));
