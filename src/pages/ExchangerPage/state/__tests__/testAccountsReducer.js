import { exchange } from '../actionCreators';
import mockExchangeTransaction from '../../apiMocks/mockExchangeTransaction';
import accountsReducer from '../reducer/accountsReducer';

let accountsInitialState;
beforeEach(() => {
  accountsInitialState = {
    1: {
      accountId: 1,
      currencyCode: 'USD',
      balance: 1000,
    },
    2: {
      accountId: 2,
      currencyCode: 'EUR',
      balance: 2000,
    },
  };
});

describe('exchange', () => {
  it('should change accounts balance by provided values', () => {
    const debitAccountId = 1;
    const creditAccountId = 2;

    const toWithdraw = 200;
    const toDeposit = 300;

    const expectedBalanceAfterWithdrawal =
      accountsInitialState[debitAccountId].balance - toWithdraw;
    const expectedBalanceAfterDeposit =
      accountsInitialState[creditAccountId].balance + toDeposit;

    const nextAccountsState = accountsReducer(
      accountsInitialState,
      mockExchangeTransaction(
        exchange(
          {
            debit: { accountId: debitAccountId, balance: toWithdraw },
            credit: { accountId: creditAccountId, balance: toDeposit },
          },
          accountsInitialState,
        ),
      ),
    );

    expect(nextAccountsState).toEqual({
      [debitAccountId]: expect.objectContaining({
        balance: expectedBalanceAfterWithdrawal,
      }),
      [creditAccountId]: expect.objectContaining({
        balance: expectedBalanceAfterDeposit,
      }),
    });
  });
});
