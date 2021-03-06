import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { POCKET_TYPES } from '../../consts';
import { ExchangerContext } from '../../context/exchangerContext';
import { exchange } from '../../state/actionCreators';
import { pocketPropTypes, accountPropTypes } from '../../propTypes';

const ExchangeButton = ({ pockets, availableAccounts, isFormInvalid }) => {
  const { dispatch } = useContext(ExchangerContext);

  const handleExchange = useCallback(
    () => dispatch(exchange(pockets, availableAccounts)),
    [dispatch, pockets, availableAccounts],
  );

  const debitPocket = pockets[POCKET_TYPES.DEBIT];
  const hasSufficientFunds =
    debitPocket.balance > 0 &&
    debitPocket.balance <= availableAccounts[debitPocket.accountId].balance;

  return (
    <Button
      data-locator="exchanger-action-button"
      onClick={handleExchange}
      color="primary"
      size="large"
      variant="contained"
      fullWidth={true}
      disabled={isFormInvalid || !hasSufficientFunds}
    >
      Exchange
    </Button>
  );
};

ExchangeButton.propTypes = {
  isFormInvalid: PropTypes.bool.isRequired,
  pockets: PropTypes.objectOf(PropTypes.shape(pocketPropTypes)).isRequired,
  availableAccounts: PropTypes.objectOf(PropTypes.shape(accountPropTypes))
    .isRequired,
};

export default ExchangeButton;
