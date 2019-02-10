import React from 'react';
import { mount, render } from 'enzyme';
import AccountSelector from '../AccountSelector';

let availableAccounts;
beforeEach(() => {
  availableAccounts = {
    1: { accountId: 1, currencyCode: 'USD' },
    2: { accountId: 2, currencyCode: 'EUR' },
    3: { accountId: 3, currencyCode: 'RUB' },
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
      instance
        .find('[data-locator^="exchanger-pocket-selector-option"]')
        .text(),
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
        .map(node => node.text()),
    ).toEqual(['EUR', 'RUB', 'USD']);
  });
});
