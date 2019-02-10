import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { ExchangerContext } from '../../context/exchangerContext';
import { exchange } from '../../state/actionCreators';
import { pocketPropTypes, accountPropTypes } from '../../propTypes';

const ExchangeButton = ({ pockets, availableAccounts }) => {
  const { dispatch } = useContext(ExchangerContext);

  const handleExchange = useCallback(
    () => dispatch(exchange(pockets, availableAccounts)),
    [dispatch, pockets, availableAccounts],
  );

  return (
    <Button
      data-locator="exchanger-action-button"
      onClick={handleExchange}
      color="primary"
      size="large"
      variant="contained"
      fullWidth={true}
    >
      Exchange
    </Button>
  );
};

ExchangeButton.propTypes = {
  pockets: PropTypes.objectOf(PropTypes.shape(pocketPropTypes)).isRequired,
  availableAccounts: PropTypes.objectOf(PropTypes.shape(accountPropTypes))
    .isRequired,
};

export default ExchangeButton;
