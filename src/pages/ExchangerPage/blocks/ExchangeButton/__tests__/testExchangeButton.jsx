import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { POCKET_TYPES } from '../../../consts';
import { ExchangerContext } from '../../../context/exchangerContext';
import { EXCHANGE_REQUEST } from '../../../state/actionTypes';
import ExchangeButton from '../ExchangeButton';

afterEach(cleanup);

describe('ExchangeButton', () => {
  it('should handle click', () => {
    const dispatch = jest.fn();
    const availableAccounts = {
      1: { accountId: 1, currencyCode: 'USD', balance: 1000 },
      2: { accountId: 2, currencyCode: 'EUR', balance: 2000 },
    };
    const pockets = {
      [POCKET_TYPES.DEBIT]: { accountId: 1, balance: 11.21342 },
      [POCKET_TYPES.CREDIT]: { accountId: 2, balance: 9.56783 },
    };

    const { getByTestId } = render(
      <ExchangerContext.Provider value={{ dispatch }}>
        <ExchangeButton
          pockets={pockets}
          availableAccounts={availableAccounts}
        />
      </ExchangerContext.Provider>,
    );

    fireEvent.click(getByTestId('exchanger-action-button'));

    expect(dispatch.mock.calls).toHaveLength(1);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: EXCHANGE_REQUEST,
      meta: { pockets, availableAccounts },
    });
  });
});
