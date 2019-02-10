import React from 'react';
import PropTypes from 'prop-types';

const getCurrencySymbolOrName = currencyCode =>
  Intl.NumberFormat('ru', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(0)
    .replace(/0\W?/, '');

const ExchangeRateMonitor = ({
  debitCurrencyCode,
  creditCurrencyCode,
  exchangeRate,
}) => {
  return (
    <>
      <span data-locator="exchanger-monitor-debit-currency">
        {getCurrencySymbolOrName(debitCurrencyCode)}
      </span>
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
  exchangeRate: PropTypes.number.isRequired,
};

export default ExchangeRateMonitor;
