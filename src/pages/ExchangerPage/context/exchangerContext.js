import React from 'react';
import { memoizeByLastArgs } from 'utilities/memo';

export const ExchangerContext = React.createContext({});
export const memoizeContext = memoizeByLastArgs(
  (activePocketType, dispatch, exchangeRate, setActivePocketType) => ({
    activePocketType,
    dispatch,
    exchangeRate,
    setActivePocketType,
  }),
);
