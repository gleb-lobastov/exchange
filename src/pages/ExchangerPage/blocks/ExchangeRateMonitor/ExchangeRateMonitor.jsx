import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ExchangerContext } from '../../context/exchangerContext';

const getCurrencySymbolOrName = currencyCode =>
  Intl.NumberFormat('ru', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(0)
    .replace(/0\W?/, '');

const ExchangeRateMonitor = ({ debitCurrencyCode, creditCurrencyCode }) => {
  const { exchangeRate } = useContext(ExchangerContext);
  if (!exchangeRate) {
    return null;
  }
  return (
    <>
      <span>1</span>
      <span data-locator="exchanger-monitor-debit-currency">
        {getCurrencySymbolOrName(debitCurrencyCode)}
      </span>
      <span>&nbsp;=&nbsp;</span>
      <span data-locator="exchanger-monitor-rate">
        {exchangeRate.toFixed(4)}
      </span>
      <span data-locator="exchanger-monitor-credit-currency">
        {getCurrencySymbolOrName(creditCurrencyCode)}
      </span>
    </>
  );
};

ExchangeRateMonitor.propTypes = {
  debitCurrencyCode: PropTypes.string.isRequired,
  creditCurrencyCode: PropTypes.string.isRequired,
};

export default ExchangeRateMonitor;
