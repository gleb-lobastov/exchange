import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import SwapIcon from '@material-ui/icons/Cached';
import { withStyles } from '@material-ui/core/styles';
import { ExchangerContext } from '../../context/exchangerContext';
import { swapPockets } from '../../state/actionCreators';
import { pocketType } from '../../propTypes';

const styles = () => ({
  wrapper: {
    margin: '12px 0',
  },
});

const PocketsSwapper = ({ classes, activePocketType }) => {
  const { dispatch } = useContext(ExchangerContext);

  const handleSwap = useCallback(
    () => dispatch(swapPockets({ activePocketType })),
    [dispatch, activePocketType],
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
  activePocketType: pocketType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PocketsSwapper);
