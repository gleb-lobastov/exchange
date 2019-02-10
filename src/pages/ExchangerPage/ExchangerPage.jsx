import React, { useState } from 'react';
import { POCKET_TYPES } from './consts';
import ExchangingPocket from './blocks/ExchangingPocket';
import ExchangeRateMonitor from './blocks/ExchangeRateMonitor';
import PocketsSwapper from './blocks/PocketsSwapper';
import ExchangeButton from './blocks/ExchangeButton';
import { ExchangerContext, memoizeContext } from './context/exchangerContext';
import usePockets from './hooks/usePockets';
import useExchangeRate from './hooks/useExchangeRate';
import { selectAccounts, selectPocket, selectPockets } from './state/selectors';

const debitPocketInputProps = { autoFocus: true };

const ExchangerPage = () => {
  const [activePocketType, setActivePocketType] = useState(POCKET_TYPES.DEBIT);
  const [exchangerState, dispatch] = usePockets();

  const availableAccounts = selectAccounts(exchangerState);
  const debitPocket = selectPocket(exchangerState, POCKET_TYPES.DEBIT);
  const creditPocket = selectPocket(exchangerState, POCKET_TYPES.CREDIT);

  const debitCurrencyCode = debitPocket.account.currencyCode;
  const creditCurrencyCode = creditPocket.account.currencyCode;

  const exchangeRate = useExchangeRate(debitCurrencyCode, creditCurrencyCode);

  if (!exchangeRate) {
    return <div>...Loading</div>;
  }

  return (
    <ExchangerContext.Provider
      value={memoizeContext(
        activePocketType,
        dispatch,
        exchangeRate,
        setActivePocketType,
      )}
    >
      <div data-locator="exchanger-pocket-selector">
        <ExchangeRateMonitor
          debitCurrencyCode={debitCurrencyCode}
          creditCurrencyCode={creditCurrencyCode}
        />
        <ExchangingPocket
          availableAccounts={availableAccounts}
          pocket={debitPocket}
          inputProps={debitPocketInputProps}
        />
        <PocketsSwapper />
        <ExchangingPocket
          availableAccounts={availableAccounts}
          pocket={creditPocket}
        />
        <ExchangeButton
          availableAccounts={availableAccounts}
          pockets={selectPockets(exchangerState)}
        />
      </div>
    </ExchangerContext.Provider>
  );
};

export default ExchangerPage;
