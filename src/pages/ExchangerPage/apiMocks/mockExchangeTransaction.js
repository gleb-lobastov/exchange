import { POCKET_TYPES } from '../consts';
import { EXCHANGE } from '../state/actionTypes';

export default ({
  meta: {
    pockets: {
      [POCKET_TYPES.DEBIT]: {
        accountId: debitAccountId,
        balance: supposedBalanceToWithdrawal,
      },
      [POCKET_TYPES.CREDIT]: {
        accountId: creditAccountId,
        balance: supposedBalanceToDeposit,
      },
    },
    availableAccounts,
  },
}) => ({
  type: EXCHANGE,
  payload: {
    debit: {
      accountId: debitAccountId,
      provenBalanceAfterWithdrawal:
        availableAccounts[debitAccountId].balance - supposedBalanceToWithdrawal,
    },
    credit: {
      accountId: creditAccountId,
      provenBalanceAfterDeposit:
        availableAccounts[creditAccountId].balance + supposedBalanceToDeposit,
    },
  },
});
