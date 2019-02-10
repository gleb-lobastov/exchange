import {
  SET_POCKET_ACCOUNT,
  SET_POCKET_BALANCE,
  UPDATE_EXCHANGE_RATE,
  SWAP_POCKETS,
  EXCHANGE_REQUEST,
} from './actionTypes';

export const setPocketAccount = (
  nextAccountId,
  {
    targetPocketType,
    activePocketType, // used when action turned to swap pockets
  },
) => ({
  type: SET_POCKET_ACCOUNT,
  payload: nextAccountId,
  meta: { targetPocketType, activePocketType },
});

export const setPocketBalance = (
  nextBalance,
  { targetPocketType, exchangeRate },
) => ({
  type: SET_POCKET_BALANCE,
  payload: nextBalance,
  meta: { targetPocketType, exchangeRate },
});

export const updateExchangeRate = (exchangeRate, { activePocketType }) => ({
  type: UPDATE_EXCHANGE_RATE,
  payload: exchangeRate,
  meta: { activePocketType },
});

export const swapPockets = ({ activePocketType }) => ({
  type: SWAP_POCKETS,
  meta: { activePocketType },
});

export const exchange = (pockets, availableAccounts) => ({
  type: EXCHANGE_REQUEST,
  meta: { pockets, availableAccounts },
});
