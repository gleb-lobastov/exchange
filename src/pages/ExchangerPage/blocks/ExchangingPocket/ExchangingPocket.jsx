import React, { useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import { accountPropTypes, denormalizedPocketPropTypes } from '../../propTypes';
import { ExchangerContext } from '../../context/exchangerContext';
import { setPocketAccount, setPocketBalance } from '../../state/actionCreators';
import AccountSelector from './blocks/AccountSelector';
import AccountBalance from './blocks/AccountBalance';

const ExchangingPocket = ({ availableAccounts, pocket, inputProps }) => {
  const {
    activePocketType,
    dispatch,
    exchangeRate,
    setActivePocketType,
  } = useContext(ExchangerContext);

  const pocketInputProps = useMemo(
    forwardedInputProps => ({
      ...forwardedInputProps,
      onFocus: () => setActivePocketType(pocket.pocketType),
    }),
    [inputProps],
  );

  const handleSelectPocketAccount = useCallback(
    event => {
      const nextAccountId = event.target.value;
      if (!nextAccountId || !availableAccounts[nextAccountId]) {
        return false;
      }
      return dispatch(
        setPocketAccount(nextAccountId, {
          activePocketType,
          targetPocketType: pocket.pocketType,
          exchangeRate,
        }),
      );
    },
    [dispatch, activePocketType, pocket.pocketType, exchangeRate],
  );

  const handleCopyBalanceToPocket = useCallback(
    () =>
      dispatch(
        setPocketBalance(pocket.account.balance, {
          targetPocketType: pocket.pocketType,
          exchangeRate,
        }),
      ),
    [dispatch, pocket.account.balance, pocket.pocketType, exchangeRate],
  );

  const handleChangePocketBalance = useCallback(
    event => {
      const nextBalance = parseInt(event.target.value, 0) || 0;
      return dispatch(
        setPocketBalance(nextBalance, {
          targetPocketType: pocket.pocketType,
          exchangeRate,
        }),
      );
    },
    [dispatch, pocket.pocketType, exchangeRate],
  );

  return (
    <div data-locator="exchanger-pocket">
      <AccountSelector
        selectedAccountId={pocket.account.accountId}
        availableAccounts={availableAccounts}
        onChange={handleSelectPocketAccount}
      />
      <AccountBalance
        account={pocket.account}
        onClick={handleCopyBalanceToPocket}
      />
      <div data-locator="exchanger-pocket-input">
        <Input
          {...pocketInputProps}
          onChange={handleChangePocketBalance}
          value={pocket.balance}
        />
      </div>
    </div>
  );
};

ExchangingPocket.propTypes = {
  availableAccounts: PropTypes.objectOf(PropTypes.shape(accountPropTypes))
    .isRequired,
  pocket: PropTypes.shape(denormalizedPocketPropTypes).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  inputProps: PropTypes.object, // forwarded props
};

ExchangingPocket.defaultProps = {
  inputProps: {},
};

export default ExchangingPocket;
