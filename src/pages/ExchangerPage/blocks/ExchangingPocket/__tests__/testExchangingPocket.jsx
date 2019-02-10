import React from 'react';
import { render } from 'enzyme';
import { POCKET_TYPES } from '../../../consts';
import ExchangingPocket from '../ExchangingPocket';

let availablePockets;
let availableAccounts;
beforeEach(() => {
  availableAccounts = {
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
    3: {
      accountId: 3,
      currencyCode: 'RUB',
      balance: 50000,
    },
  };
  availablePockets = {
    [POCKET_TYPES.DEBIT]: {
      pocketType: POCKET_TYPES.DEBIT,
      account: availableAccounts['1'],
      balance: 11.21342,
    },
    [POCKET_TYPES.CREDIT]: {
      pocketType: POCKET_TYPES.CREDIT,
      account: availableAccounts['2'],
      balance: 9.56783,
    },
  };
});

describe('ExchangingPocket blocks', () => {
  it('should render currency selector', () => {
    const instance = render(
      <ExchangingPocket
        availableAccounts={availableAccounts}
        pocket={availablePockets[POCKET_TYPES.DEBIT]}
      />,
    );

    expect(
      instance.find('[data-locator="exchanger-pocket-selector"]'),
    ).toHaveLength(1);
  });

  it('should render account balance', () => {
    const instance = render(
      <ExchangingPocket
        availableAccounts={availableAccounts}
        pocket={availablePockets[POCKET_TYPES.DEBIT]}
      />,
    );

    expect(
      instance.find('[data-locator="exchanger-pocket-balance-value"]'),
    ).toHaveLength(1);
  });

  it('should render exchange amount input', () => {
    const instance = render(
      <ExchangingPocket
        availableAccounts={availableAccounts}
        pocket={availablePockets[POCKET_TYPES.DEBIT]}
      />,
    );

    expect(
      instance.find('[data-locator="exchanger-pocket-input"]'),
    ).toHaveLength(1);
  });
});
