import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import getCurrencySymbolOrName from 'utilities/getCurrencySymbolOrName';
import {
  pocketType,
  accountPropTypes,
  denormalizedPocketPropTypes,
} from '../../propTypes';
import { ExchangerContext } from '../../context/exchangerContext';
import { setPocketAccount, setPocketBalance } from '../../state/actionCreators';
import AccountSelector from './blocks/AccountSelector';
import AccountBalance from './blocks/AccountBalance';

const styles = () => ({
  title: {
    marginLeft: '12px', // compensation to negative margin, that used by material-ui
  },
});

const moneyToString = amount =>
  amount ? amount.toFixed(2).replace(/\.0+$/, '') : '';

const ExchangingPocket = ({
  activePocketType,
  availableAccounts,
  classes,
  inputProps,
  onFocus: handleFocus,
  pocket,
  title,
}) => {
  const [currentUserInput, setInputValue] = useState(null);
  const { dispatch, exchangeRate } = useContext(ExchangerContext);

  const isActive = activePocketType === pocket.pocketType;

  // reset currentUserInput on pocket account change
  useEffect(() => setInputValue(null), [pocket.account.currencyCode]);
  // reset currentUserInput on focus change (onBeforeNextRender)
  useEffect(() => () => setInputValue(null), [isActive]);

  const focusHandler = useCallback(() => handleFocus(pocket.pocketType), [
    pocket.pocketType,
  ]);
  const pocketInputProps = useMemo(
    forwardedInputProps => ({
      ...forwardedInputProps,
      onFocus: focusHandler,
    }),
    [inputProps, pocket.pocketType],
  );

  const handleSelectPocketAccount = useCallback(
    event => {
      const nextAccountId = event.target.value;
      if (!nextAccountId || !availableAccounts[nextAccountId]) {
        return false;
      }
      return dispatch(
        setPocketAccount(nextAccountId, {
          targetPocketType: pocket.pocketType,
          activePocketType,
        }),
      );
    },
    [dispatch, pocket.pocketType],
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
      const {
        target: { value },
      } = event;

      setInputValue(value.replace(/[^\d\s.]/, ''));

      const nextBalance = parseFloat(value.replace(/[^\d.]/, ''), 0) || 0;
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
    <Card data-locator="exchanger-pocket">
      <CardHeader
        disableTypography={true}
        title={
          <Grid
            justify="space-between"
            alignItems="baseline"
            container={true}
            spacing={24}
          >
            <Typography className={classes.title} variant="subtitle1">
              {title}
            </Typography>
            <AccountBalance
              account={pocket.account}
              onClick={handleCopyBalanceToPocket}
            />
          </Grid>
        }
      />
      <CardContent>
        <AccountSelector
          selectedAccountId={pocket.account.accountId}
          availableAccounts={availableAccounts}
          onChange={handleSelectPocketAccount}
          onFocus={focusHandler}
        />
        <div data-locator="exchanger-pocket-input">
          <Input
            fullWidth={true}
            {...pocketInputProps}
            onChange={handleChangePocketBalance}
            value={
              (isActive && currentUserInput) || moneyToString(pocket.balance)
            }
            startAdornment={
              <InputAdornment position="start">
                {getCurrencySymbolOrName(pocket.account.currencyCode)}
              </InputAdornment>
            }
          />
        </div>
      </CardContent>
    </Card>
  );
};

ExchangingPocket.propTypes = {
  activePocketType: pocketType.isRequired,
  availableAccounts: PropTypes.objectOf(PropTypes.shape(accountPropTypes))
    .isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  inputProps: PropTypes.object, // forwarded props
  pocket: PropTypes.shape(denormalizedPocketPropTypes).isRequired,
  onFocus: PropTypes.func.isRequired,
  title: PropTypes.string,
};

ExchangingPocket.defaultProps = {
  inputProps: {},
  title: '',
};

export default withStyles(styles)(ExchangingPocket);
