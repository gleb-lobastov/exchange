/* global __OPEN_EXCHANGE_RATES_API_KEY__ */
import DataSourceObserver from 'utilities/DataSourceObserver';
import prepareQueryParams from 'utilities/prepareQueryParams';
import { useState, useEffect } from 'react';

const POOLING_LAG = 10000;
const EXCHANGE_RATES_PROVIDER_URL =
  'https://openexchangerates.org/api/latest.json';
const AVAILABLE_CURRENCIES_CODES = ['USD', 'EUR', 'GBP', 'RUB'];
const SOURCE_CURRENCY_CODE = AVAILABLE_CURRENCIES_CODES[0];

const fetchExchangeRates = () => {
  const queryParams = prepareQueryParams({
    app_id: __OPEN_EXCHANGE_RATES_API_KEY__,
    symbols: AVAILABLE_CURRENCIES_CODES.join(','),
  });

  return fetch(`${EXCHANGE_RATES_PROVIDER_URL}?${queryParams}`).then(response =>
    response.json(),
  );
};

const exchangeRatesObserver = new DataSourceObserver({
  baseCurrency: SOURCE_CURRENCY_CODE,
  comparator: (
    { rates: prevRates = {} } = {},
    { rates: nextRates = {} } = {},
  ) =>
    Object.keys(nextRates).every(
      currencyCode => prevRates[currencyCode] === nextRates[currencyCode],
    ),
  fetch: fetchExchangeRates,
  poolingLag: POOLING_LAG,
});

const reduceRates = (exchangeRates, { from, to }) => {
  if (!exchangeRates) {
    return null;
  }
  const {
    rates: { [from]: rateFrom, [to]: rateTo },
  } = exchangeRates;
  return rateFrom / rateTo;
};

export default (debitCurrencyCode, creditCurrencyCode) => {
  const [exchangeRates, setExchangeRates] = useState(null);
  useEffect(() => {
    exchangeRatesObserver.subscribe(setExchangeRates);
    return () => exchangeRatesObserver.unsubscribe(setExchangeRates);
  }, []);

  return reduceRates(exchangeRates, {
    from: debitCurrencyCode,
    to: creditCurrencyCode,
  });
};
