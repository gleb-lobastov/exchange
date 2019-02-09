import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const CurrencySelector = ({
  selectedCurrencyCode,
  suggestedCurrencies,
  ...forwardedProps
}) => (
  <Select {...forwardedProps} value={selectedCurrencyCode}>
    {suggestedCurrencies.map(suggestedCurrency => (
      <MenuItem key={suggestedCurrency} value={suggestedCurrency}>
        <div
          data-locator={`exchanger-pocket-selector-option-${suggestedCurrency}`}
        >
          {suggestedCurrency}
        </div>
      </MenuItem>
    ))}
  </Select>
);

CurrencySelector.propTypes = {
  selectedCurrencyCode: PropTypes.string.isRequired,
  suggestedCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CurrencySelector;
