import React from 'react';
import Button from '@material-ui/core/Button';
import ExchangingPocket from './blocks/ExchangingPocket';
import ExchangeRateMonitor from './blocks/ExchangeRateMonitor';
import PocketsSwapper from './blocks/PocketsSwapper';

const ExchangerPage = () => (
  <div data-locator="exchanger-pocket-selector">
    <ExchangeRateMonitor
      creditCurrencyCode="USD"
      debitCurrencyCode="EUR"
      exchangeRate={0.88124}
    />
    <ExchangingPocket />
    <PocketsSwapper />
    <ExchangingPocket />
    <div data-locator="exchanger-action-button">
      <Button>Exchange</Button>
    </div>
  </div>
);

ExchangerPage.propTypes = {};

export default ExchangerPage;
