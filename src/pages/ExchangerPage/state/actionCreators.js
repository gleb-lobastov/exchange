import {
  SET_POCKET_ACCOUNT,
  SET_POCKET_BALANCE,
  SWAP_POCKETS,
  EXCHANGE_REQUEST,
} from './actionTypes';

export const setPocketAccount = (
  nextAccountId,
  { targetPocketType, activePocketType, exchangeRate },
) => ({
  type: SET_POCKET_ACCOUNT,
  payload: nextAccountId,
  meta: { targetPocketType, activePocketType, exchangeRate },
});

export const setPocketBalance = (
  nextBalance,
  { targetPocketType, exchangeRate },
) => ({
  type: SET_POCKET_BALANCE,
  payload: nextBalance,
  meta: { targetPocketType, exchangeRate },
});

export const swapPockets = ({ activePocketType, exchangeRate }) => ({
  type: SWAP_POCKETS,
  meta: { activePocketType, exchangeRate },
});

export const exchange = (pockets, availableAccounts) => ({
  type: EXCHANGE_REQUEST,
  meta: { pockets, availableAccounts },
});
