import { EXCHANGE } from '../actionTypes';

export default (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case EXCHANGE: {
      const {
        payload: {
          debit: { accountId: debitAccountId, provenBalanceAfterWithdrawal },
          credit: { accountId: creditAccountId, provenBalanceAfterDeposit },
        },
      } = action;

      return {
        ...state,
        [debitAccountId]: {
          ...state[debitAccountId],
          balance: provenBalanceAfterWithdrawal,
        },
        [creditAccountId]: {
          ...state[creditAccountId],
          balance: provenBalanceAfterDeposit,
        },
      };
    }

    default:
      return state;
  }
};
