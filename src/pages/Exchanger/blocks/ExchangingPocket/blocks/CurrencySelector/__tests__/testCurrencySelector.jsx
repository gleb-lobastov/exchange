import React from 'react';
import { mount, render } from 'enzyme';
import CurrencySelector from '../CurrencySelector';

describe('PocketBalance', () => {
  it('should render passed balance', () => {
    const instance = render(
      <CurrencySelector
        selectedCurrencyCode="USD"
        suggestedCurrencies={['USD', 'EUR', 'RUB']}
      />,
    );

    expect(
      instance
        .find('[data-locator^="exchanger-pocket-selector-option"]')
        .text(),
    ).toEqual('USD');
  });

  it('should render passed balance', () => {
    const suggestedCurrencies = ['USD', 'EUR', 'RUB'];
    const instance = mount(
      <CurrencySelector
        MenuProps={{
          // used to find root of opened modal, and filter only menu elements
          classes: { paper: 'openedMenuRoot' },
        }}
        open={true}
        selectedCurrencyCode="USD"
        suggestedCurrencies={suggestedCurrencies}
      />,
    );

    expect(
      instance
        .find('.openedMenuRoot')
        .find('[data-locator^="exchanger-pocket-selector-option"]')
        .map(node => node.text()),
    ).toEqual(suggestedCurrencies);
  });
});
