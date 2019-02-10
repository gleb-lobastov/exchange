import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const getSortedAccountsList = availableAccounts => {
  return Object.values(availableAccounts).sort(
    ({ currencyCode: currencyCodeA }, { currencyCode: currencyCodeB }) =>
      Math.sign(currencyCodeA.charCodeAt(0) - currencyCodeB.charCodeAt(0)),
  );
};

const AccountSelector = ({
  selectedAccountId,
  availableAccounts,
  ...forwardedProps
}) => (
  <div data-locator="exchanger-pocket-selector">
    <Select {...forwardedProps} value={selectedAccountId}>
      {/* slice 0..3, onChange move here */}
      {getSortedAccountsList(availableAccounts).map(
        ({ currencyCode: suggestedCurrency, accountId }) => (
          <MenuItem key={`id${accountId}`} value={accountId}>
            <div data-locator={`exchanger-pocket-selector-option-${accountId}`}>
              {suggestedCurrency}
            </div>
          </MenuItem>
        ),
      )}
    </Select>
  </div>
);

AccountSelector.propTypes = {
  selectedAccountId: PropTypes.number.isRequired,
  availableAccounts: PropTypes.objectOf(
    PropTypes.shape({ currencyCode: PropTypes.string }),
  ).isRequired,
};

export default AccountSelector;
