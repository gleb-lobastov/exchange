import React from 'react';
import { shallow } from 'enzyme';
import ExchangeRateMonitor from '../ExchangeRateMonitor';

describe('ExchangeRateMonitor', () => {
  let props;
  beforeEach(() => {
    props = {
      debitCurrencyCode: 'USD',
      creditCurrencyCode: 'EUR',
      exchangeRate: 0.8817568731,
    };
  });

  it('should render debit currency symbol', () => {
    const instance = shallow(<ExchangeRateMonitor {...props} />);
    expect(
      instance.find('[data-locator="exchanger-monitor-debit-currency"]').text(),
    ).toEqual(expect.stringContaining('$'));
  });

  it('should render 4 digit of exchange rate value', () => {
    const instance = shallow(<ExchangeRateMonitor {...props} />);
    expect(
      instance.find('[data-locator="exchanger-monitor-rate"]').text(),
    ).toEqual(expect.stringContaining('0.8818'));
  });

  it('should render 4 digit of exchange rate value, filling gap with zeroes', () => {
    const instance = shallow(
      <ExchangeRateMonitor {...props} exchangeRate={0.88} />,
    );
    expect(
      instance.find('[data-locator="exchanger-monitor-rate"]').text(),
    ).toEqual(expect.stringContaining('0.8800'));
  });

  it('should render credit currency symbol', () => {
    const instance = shallow(<ExchangeRateMonitor {...props} />);
    expect(
      instance
        .find('[data-locator="exchanger-monitor-credit-currency"]')
        .text(),
    ).toEqual(expect.stringContaining('€'));
  });
});
