import React from 'react';
import { mount, render } from 'enzyme';
import AccountSelector from '../AccountSelector';

let availableAccounts;
beforeEach(() => {
  availableAccounts = {
    1: { accountId: 1, currencyCode: 'USD', balance: 1 },
    2: { accountId: 2, currencyCode: 'EUR', balance: 1 },
    3: { accountId: 3, currencyCode: 'RUB', balance: 1 },
  };
});

describe('AccountSelector', () => {
  it('should render selected pocket currency code in closed state', () => {
    const instance = render(
      <AccountSelector
        selectedAccountId={1}
        availableAccounts={availableAccounts}
      />,
    );

    expect(
      instance.find('[data-locator="exchanger-pocket-selected-option"]').text(),
    ).toEqual('USD');
  });

  it('should render suggested currencies in opened state', () => {
    const instance = mount(
      <AccountSelector
        MenuProps={{
          // used to find root of opened modal, and filter only menu elements
          classes: { paper: 'openedMenuRoot' },
        }}
        open={true}
        selectedAccountId={1}
        availableAccounts={availableAccounts}
      />,
    );

    expect(
      instance
        .find('.openedMenuRoot')
        .find('[data-locator^="exchanger-pocket-selector-option"]')
        .map(node => node.text().replace(/\s/, ' ')), // replace irregular whitespaces
    ).toEqual(['EUR 1.00', 'RUB 1.00', 'USD 1.00']);
  });
});
