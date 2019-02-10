import mockExchangeTransaction from '../../apiMocks/mockExchangeTransaction';
import { POCKET_TYPES } from '../../consts';
import {
  setPocketAccount,
  setPocketBalance,
  updateExchangeRate,
  swapPockets,
  exchange,
} from '../actionCreators';
import pocketsReducer from '../reducer/pocketsReducer';

const NOT_INITIAL_ACCOUNT_ID = 3;

let pocketsInitialState;
const exchangeRate = 127.221992;
beforeEach(() => {
  pocketsInitialState = {
    [POCKET_TYPES.DEBIT]: {
      balance: 100,
      accountId: 1,
    },
    [POCKET_TYPES.CREDIT]: {
      balance: 200,
      accountId: 2,
    },
  };
});

describe('setPocketAccount', () => {
  it('should change debit pocket account', () => {
    const accountId = NOT_INITIAL_ACCOUNT_ID;
    const { [POCKET_TYPES.DEBIT]: nextDebitPocketState } = pocketsReducer(
      pocketsInitialState,
      setPocketAccount(accountId, {
        targetPocketType: POCKET_TYPES.DEBIT,
        activePocketType: POCKET_TYPES.DEBIT,
        exchangeRate,
      }),
    );

    expect(nextDebitPocketState).toEqual(
      expect.objectContaining({ accountId }),
    );
  });

  it('should change credit pocket account', () => {
    const accountId = NOT_INITIAL_ACCOUNT_ID;
    const { [POCKET_TYPES.CREDIT]: nextCreditPocketState } = pocketsReducer(
      pocketsInitialState,
      setPocketAccount(accountId, {
        targetPocketType: POCKET_TYPES.CREDIT,
        activePocketType: POCKET_TYPES.DEBIT,
        exchangeRate,
      }),
    );

    expect(nextCreditPocketState).toEqual(
      expect.objectContaining({ accountId }),
    );
  });

  it('should swap pockets if targetPocket accountId is same as other pocket accountId ', () => {
    const nextPocketsState = pocketsReducer(
      pocketsInitialState,
      setPocketAccount(pocketsInitialState[POCKET_TYPES.CREDIT].accountId, {
        targetPocketType: POCKET_TYPES.DEBIT,
        activePocketType: POCKET_TYPES.DEBIT,
        exchangeRate,
      }),
    );

    expect(nextPocketsState).toEqual({
      [POCKET_TYPES.DEBIT]: expect.objectContaining({
        accountId: pocketsInitialState[POCKET_TYPES.CREDIT].accountId,
      }),
      [POCKET_TYPES.CREDIT]: expect.objectContaining({
        accountId: pocketsInitialState[POCKET_TYPES.DEBIT].accountId,
      }),
    });
  });
});

describe('setPocketBalance', () => {
  it('should update pocket balance', () => {
    const balance = 14124;
    const { [POCKET_TYPES.DEBIT]: nextDebitPocketState } = pocketsReducer(
      pocketsInitialState,
      setPocketBalance(balance, {
        targetPocketType: POCKET_TYPES.DEBIT,
        exchangeRate,
      }),
    );

    expect(nextDebitPocketState).toEqual(expect.objectContaining({ balance }));
  });

  it('should recalculate other pocket balance', () => {
    const balance = 2123;

    // Round value of balance / exchangeRate;
    const expectedDebitBalance = 16.69;

    const { [POCKET_TYPES.DEBIT]: nextDebitPocketState } = pocketsReducer(
      pocketsInitialState,
      setPocketBalance(balance, {
        targetPocketType: POCKET_TYPES.CREDIT,
        exchangeRate,
      }),
    );

    expect(nextDebitPocketState).toEqual(
      expect.objectContaining({ balance: expectedDebitBalance }),
    );
  });
});

describe('updateExchangeRate', () => {
  it('should recalculate credit pocket balance if debit pocket was in focus', () => {
    // Round value of pocketsInitialState[POCKET_TYPES.DEBIT].balance * exchangeRate;
    const expectedCreditBalance = 12722.2;

    const { [POCKET_TYPES.CREDIT]: nextCreditPocketState } = pocketsReducer(
      pocketsInitialState,
      updateExchangeRate(exchangeRate, {
        activePocketType: POCKET_TYPES.DEBIT,
      }),
    );

    expect(nextCreditPocketState).toEqual(
      expect.objectContaining({ balance: expectedCreditBalance }),
    );
  });

  it('should recalculate debit pocket balance if credit pocket was in focus', () => {
    // Round value of pocketsInitialState[POCKET_TYPES.CREDIT].balance / exchangeRate;
    const expectedDebitBalance = 1.57;

    const { [POCKET_TYPES.DEBIT]: nextDebitPocketState } = pocketsReducer(
      pocketsInitialState,
      updateExchangeRate(exchangeRate, {
        activePocketType: POCKET_TYPES.CREDIT,
      }),
    );

    expect(nextDebitPocketState).toEqual(
      expect.objectContaining({ balance: expectedDebitBalance }),
    );
  });
});

describe('swapPockets', () => {
  it('should exchange accountId`s', () => {
    const nextPocketsState = pocketsReducer(
      pocketsInitialState,
      swapPockets({
        activePocketType: POCKET_TYPES.DEBIT,
        exchangeRate,
      }),
    );

    expect(nextPocketsState).toEqual({
      [POCKET_TYPES.DEBIT]: expect.objectContaining({
        accountId: pocketsInitialState[POCKET_TYPES.CREDIT].accountId,
      }),
      [POCKET_TYPES.CREDIT]: expect.objectContaining({
        accountId: pocketsInitialState[POCKET_TYPES.DEBIT].accountId,
      }),
    });
  });
});

describe('exchange', () => {
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

  it('should reset pockets balance after exchange', () => {
    expect(
      pocketsReducer(
        pocketsInitialState,
        mockExchangeTransaction(
          exchange(pocketsInitialState, accountsInitialState),
        ),
      ),
    ).toEqual({
      [POCKET_TYPES.DEBIT]: expect.objectContaining({
        balance: 0,
      }),
      [POCKET_TYPES.CREDIT]: expect.objectContaining({
        balance: 0,
      }),
    });
  });

  it('should preserve pockets accountId', () => {
    expect(
      pocketsReducer(
        pocketsInitialState,
        mockExchangeTransaction(
          exchange(pocketsInitialState, accountsInitialState),
        ),
      ),
    ).toEqual({
      [POCKET_TYPES.DEBIT]: expect.objectContaining({
        accountId: pocketsInitialState[POCKET_TYPES.DEBIT].accountId,
      }),
      [POCKET_TYPES.CREDIT]: expect.objectContaining({
        accountId: pocketsInitialState[POCKET_TYPES.CREDIT].accountId,
      }),
    });
  });
});
