import React from 'react';
import PropTypes from 'prop-types';

const PocketBalance = ({ pocket: { balance, currencyCode } }) => {
  const formattedAmount = Intl.NumberFormat('en', {
    style: 'currency',
    currency: currencyCode,
  }).format(balance);

  return (
    <div data-locator="exchanger-pocket-balance-value">{formattedAmount}</div>
  );
};

PocketBalance.propTypes = {
  pocket: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    currencyCode: PropTypes.string.isRequired,
  }).isRequired,
};

export default PocketBalance;
