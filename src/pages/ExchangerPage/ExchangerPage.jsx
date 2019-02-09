import React from 'react';
import Button from '@material-ui/core/Button';
import ExchangingPocket from './blocks/ExchangingPocket';

const ExchangerPage = () => (
  <div data-locator="exchanger-pocket-selector">
    <ExchangingPocket />
    <ExchangingPocket />
    <div data-locator="exchanger-action-button">
      <Button>Exchange</Button>
    </div>
  </div>
);

ExchangerPage.propTypes = {};

export default ExchangerPage;
