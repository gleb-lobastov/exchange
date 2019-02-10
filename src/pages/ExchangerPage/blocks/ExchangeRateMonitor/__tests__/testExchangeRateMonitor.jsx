import React from 'react';
import { render, cleanup, getNodeText } from 'react-testing-library';
import { ExchangerContext } from '../../../context/exchangerContext';
import ExchangeRateMonitor from '../ExchangeRateMonitor';

afterEach(cleanup);

describe('ExchangeRateMonitor', () => {
  it('should render debit currency symbol', () => {
    const { getByTestId } = render(
      <ExchangerContext.Provider value={{ exchangeRate: 0.8817568731 }}>
        <ExchangeRateMonitor debitCurrencyCode="USD" creditCurrencyCode="EUR" />
      </ExchangerContext.Provider>,
    );
    expect(
      getNodeText(getByTestId('exchanger-monitor-debit-currency')),
    ).toEqual(expect.stringContaining('$'));
  });

  it('should render 4 digit of exchange rate value', () => {
    const { getByTestId } = render(
      <ExchangerContext.Provider value={{ exchangeRate: 0.8817568731 }}>
        <ExchangeRateMonitor debitCurrencyCode="USD" creditCurrencyCode="EUR" />
      </ExchangerContext.Provider>,
    );

    expect(getNodeText(getByTestId('exchanger-monitor-rate'))).toEqual(
      expect.stringContaining('0.8818'),
    );
  });

  it('should render 4 digit of exchange rate value, filling gap with zeroes', () => {
    const { getByTestId } = render(
      <ExchangerContext.Provider value={{ exchangeRate: 0.88 }}>
        <ExchangeRateMonitor debitCurrencyCode="USD" creditCurrencyCode="EUR" />
      </ExchangerContext.Provider>,
    );

    expect(getNodeText(getByTestId('exchanger-monitor-rate'))).toEqual(
      expect.stringContaining('0.8800'),
    );
  });

  it('should render credit currency symbol', () => {
    const { getByTestId } = render(
      <ExchangerContext.Provider value={{ exchangeRate: 0.8817568731 }}>
        <ExchangeRateMonitor debitCurrencyCode="USD" creditCurrencyCode="EUR" />
      </ExchangerContext.Provider>,
    );

    expect(
      getNodeText(getByTestId('exchanger-monitor-credit-currency')),
    ).toEqual(expect.stringContaining('€'));
  });
});
