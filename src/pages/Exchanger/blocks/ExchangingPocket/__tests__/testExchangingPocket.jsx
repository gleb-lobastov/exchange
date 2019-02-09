import React from 'react';
import { render } from 'enzyme';
import ExchangingPocket from '../ExchangingPocket';

let availablePockets;
beforeEach(() => {
  availablePockets = {
    USD: {
      currencyCode: 'USD',
      balance: 422.2123,
    },
    EUR: {
      currencyCode: 'EUR',
      balance: 71.7993,
    },
    RUB: {
      currencyCode: 'RUB',
      balance: 8991.8582,
    },
  };
});

describe('ExchangingPocket blocks', () => {
  it('should render currency selector', () => {
    const instance = render(
      <ExchangingPocket
        pocket={availablePockets[0]}
        availablePockets={availablePockets}
      />,
    );

    expect(
      instance.find('[data-locator="exchanger-pocket-selector"]'),
    ).toHaveLength(1);
  });

  it('should render pocket balance', () => {
    const instance = render(
      <ExchangingPocket
        pocket={availablePockets[0]}
        availablePockets={availablePockets}
      />,
    );

    expect(
      instance.find('[data-locator="exchanger-pocket-balance-value"]'),
    ).toHaveLength(1);
  });

  it('should render exchange amount input', () => {
    const instance = render(
      <ExchangingPocket
        pocket={availablePockets[0]}
        availablePockets={availablePockets}
      />,
    );

    expect(
      instance.find('[data-locator="exchanger-pocket-input"]'),
    ).toHaveLength(1);
  });
});
