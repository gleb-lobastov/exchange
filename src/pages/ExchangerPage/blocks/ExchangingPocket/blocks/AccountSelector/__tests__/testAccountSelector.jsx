import React from 'react';
import { mount, render } from 'enzyme';
import AccountSelector from '../AccountSelector';

let availableAccounts;
beforeEach(() => {
  availableAccounts = {
    USD: { currencyCode: 'USD' },
    EUR: { currencyCode: 'EUR' },
    RUB: { currencyCode: 'RUB' },
  };
});

describe('AccountSelector', () => {
  it('should render selected pocket currency code in closed state', () => {
    const instance = render(
      <AccountSelector
        selectedAccountId="USD"
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
        selectedAccountId="USD"
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
