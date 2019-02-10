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
    <Select
      {...forwardedProps}
      value={availableAccounts[selectedAccountId].currencyCode}
    >
      {/* slice 0..3 */}
      {getSortedAccountsList(availableAccounts).map(
        ({ currencyCode: suggestedCurrency }) => (
          <MenuItem key={suggestedCurrency} value={suggestedCurrency}>
            <div
              data-locator={`exchanger-pocket-selector-option-${suggestedCurrency}`}
            >
              {suggestedCurrency}
            </div>
          </MenuItem>
        ),
      )}
    </Select>
  </div>
);

AccountSelector.propTypes = {
  selectedAccountId: PropTypes.string.isRequired,
  availableAccounts: PropTypes.objectOf(
    PropTypes.shape({ currencyCode: PropTypes.string }),
  ).isRequired,
};

export default AccountSelector;
