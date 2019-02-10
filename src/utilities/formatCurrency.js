export default (value, currencyCode, { currencyDisplay = 'symbol' } = {}) =>
  Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currencyCode,
    currencyDisplay,
  }).format(value);
