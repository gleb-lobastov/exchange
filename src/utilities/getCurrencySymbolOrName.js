export default currencyCode =>
  Intl.NumberFormat('ru', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(0)
    .replace(/0\W?/, '');
