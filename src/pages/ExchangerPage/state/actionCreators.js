import {
  SET_POCKET_ACCOUNT,
  SET_POCKET_BALANCE,
  UPDATE_EXCHANGE_RATE,
  SWAP_POCKETS,
  EXCHANGE_REQUEST,
} from './actionTypes';

export const setPocketAccount = (nextAccountId, { targetPocketType }) => ({
  type: SET_POCKET_ACCOUNT,
  payload: nextAccountId,
  meta: { targetPocketType },
});

export const setPocketBalance = (
  nextBalance,
  { targetPocketType, exchangeRate },
) => ({
  type: SET_POCKET_BALANCE,
  payload: nextBalance,
  meta: { targetPocketType, exchangeRate },
});

export const updateExchangeRate = (exchangeRate, { invariablePocketType }) => ({
  type: UPDATE_EXCHANGE_RATE,
  payload: exchangeRate,
  meta: { invariablePocketType },
});

export const swapPockets = () => ({
  type: SWAP_POCKETS,
});

export const exchange = (pockets, availableAccounts) => ({
  type: EXCHANGE_REQUEST,
  meta: { pockets, availableAccounts },
});
