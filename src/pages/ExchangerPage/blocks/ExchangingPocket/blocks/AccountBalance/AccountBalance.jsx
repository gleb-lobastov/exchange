import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const AccountBalance = ({
  account: { balance, currencyCode },
  onClick: handleClick,
}) => {
  const formattedAmount = Intl.NumberFormat('en', {
    style: 'currency',
    currency: currencyCode,
  }).format(balance);

  return (
    <Button onClick={handleClick}>
      <span data-locator="exchanger-pocket-balance-value">
        {formattedAmount}
      </span>
    </Button>
  );
};

AccountBalance.propTypes = {
  account: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    currencyCode: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default AccountBalance;
