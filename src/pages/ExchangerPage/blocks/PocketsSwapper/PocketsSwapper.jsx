import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import SwapIcon from '@material-ui/icons/Cached';
import { withStyles } from '@material-ui/core/styles';
import { ExchangerContext } from '../../context/exchangerContext';
import { swapPockets } from '../../state/actionCreators';

const styles = () => ({
  wrapper: {
    margin: '12px 0',
  },
});

const PocketsSwapper = ({ classes }) => {
  const { dispatch, activePocketType, exchangeRate } = useContext(
    ExchangerContext,
  );

  const handleSwap = useCallback(
    () => dispatch(swapPockets({ activePocketType, exchangeRate })),
    [dispatch, activePocketType, exchangeRate],
  );

  return (
    <SwapIcon
      className={classes.wrapper}
      data-locator="exchanger-swapper"
      color="action"
      fontSize="large"
      onClick={handleSwap}
    />
  );
};

PocketsSwapper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PocketsSwapper);
