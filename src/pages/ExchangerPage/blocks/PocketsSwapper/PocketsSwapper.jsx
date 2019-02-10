import React, { useCallback, useContext } from 'react';
import SwapIcon from '@material-ui/icons/Cached';
import { ExchangerContext } from '../../context/exchangerContext';
import { swapPockets } from '../../state/actionCreators';

const PocketsSwapper = () => {
  const { dispatch, activePocketType, exchangeRate } = useContext(
    ExchangerContext,
  );

  const handleSwap = useCallback(
    () => dispatch(swapPockets({ activePocketType, exchangeRate })),
    [dispatch, activePocketType, exchangeRate],
  );

  return (
    <SwapIcon
      data-locator="exchanger-swapper"
      color="action"
      onClick={handleSwap}
    />
  );
};

export default PocketsSwapper;
