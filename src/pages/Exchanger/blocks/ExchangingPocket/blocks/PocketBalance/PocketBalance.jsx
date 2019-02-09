import React from 'react';
import PropTypes from 'prop-types';

const PocketBalance = ({ amount, currencyCode }) => {
  const formattedAmount = Intl.NumberFormat('en', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);

  return (
    <div data-locator="exchanger-pocket-balance-value">{formattedAmount}</div>
  );
};

PocketBalance.propTypes = {
  amount: PropTypes.number.isRequired,
  currencyCode: PropTypes.string.isRequired,
};

export default PocketBalance;
