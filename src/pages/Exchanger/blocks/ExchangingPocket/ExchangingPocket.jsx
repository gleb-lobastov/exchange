import React from 'react';
import Input from '@material-ui/core/Input';
import CurrencySelector from './blocks/CurrencySelector';
import PocketBalance from './blocks/PocketBalance';

const availablePockets = {
  USD: {
    currencyCode: 'USD',
    balance: 422.2123,
  },
  EUR: {
    currencyCode: 'EUR',
    balance: 71.7993,
  },
  RUB: {
    currencyCode: 'RUB',
    balance: 8991.8582,
  },
};

const ExchangingPocket = () => {
  const bucksPocket = availablePockets.USD;
  return (
    <div data-locator="exchanger-pocket">
      <CurrencySelector
        selectedCurrencyCode={bucksPocket.currencyCode}
        suggestedCurrencies={Object.keys(availablePockets)}
      />
      <PocketBalance pocket={bucksPocket} />
      <div data-locator="exchanger-pocket-input">
        <Input />
      </div>
    </div>
  );
};

ExchangingPocket.propTypes = {};

export default ExchangingPocket;
