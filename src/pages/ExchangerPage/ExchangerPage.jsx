import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Loader from 'core/Loader';
import { POCKET_TYPES } from './consts';
import ExchangingPocket from './blocks/ExchangingPocket';
import ExchangeRateMonitor from './blocks/ExchangeRateMonitor';
import PocketsSwapper from './blocks/PocketsSwapper';
import ExchangeButton from './blocks/ExchangeButton';
import { ExchangerContext, memoizeContext } from './context/exchangerContext';
import usePockets from './hooks/usePockets';
import useExchangeRates from './hooks/useExchangeRates';
import { updateExchangeRate } from './state/actionCreators';
import { selectAccounts, selectPocket, selectPockets } from './state/selectors';

const styles = theme => ({
  card: {
    backgroundColor: theme.palette.background.card,
    width: '100%',
  },
});

const debitPocketInputProps = { autoFocus: true };

const reduceRates = (exchangeRates, { from, to }) => {
  if (!exchangeRates) {
    return null;
  }
  const {
    rates: { [from]: rateFrom, [to]: rateTo },
  } = exchangeRates;
  return rateTo / rateFrom;
};

const ExchangerPage = ({ classes }) => {
  const [activePocketType, setActivePocketType] = useState(POCKET_TYPES.DEBIT);
  const [exchangeRate, setExchangeRate] = useState(null);

  const exchangeRates = useExchangeRates();
  const [exchangerState, dispatch] = usePockets();

  const availableAccounts = selectAccounts(exchangerState);
  const debitPocket = selectPocket(exchangerState, POCKET_TYPES.DEBIT);
  const creditPocket = selectPocket(exchangerState, POCKET_TYPES.CREDIT);

  const debitCurrencyCode = debitPocket.account.currencyCode;
  const creditCurrencyCode = creditPocket.account.currencyCode;

  useEffect(() => {
    const nextExchangeRate = reduceRates(exchangeRates, {
      from: debitCurrencyCode,
      to: creditCurrencyCode,
    });
    setExchangeRate(nextExchangeRate);
    dispatch(updateExchangeRate(nextExchangeRate, { activePocketType }));
  }, [
    dispatch,
    exchangeRates,
    debitCurrencyCode,
    creditCurrencyCode,
    activePocketType,
  ]);

  if (!exchangeRate) {
    return <Loader />;
  }

  return (
    <ExchangerContext.Provider value={memoizeContext(dispatch, exchangeRate)}>
      <Card elevation={0} square={true} className={classes.card}>
        <div data-locator="exchanger-pocket-selector">
          <CardHeader
            title="Currency exchange"
            subheader={
              <ExchangeRateMonitor
                debitCurrencyCode={debitCurrencyCode}
                creditCurrencyCode={creditCurrencyCode}
              />
            }
          />
          <CardContent>
            <Grid container={true} spacing={0}>
              <Grid item={true} xs={12} sm={5}>
                <ExchangingPocket
                  activePocketType={activePocketType}
                  availableAccounts={availableAccounts}
                  inputProps={debitPocketInputProps}
                  onFocus={setActivePocketType}
                  pocket={debitPocket}
                  title="From"
                />
              </Grid>
              <Grid item={true} container={true} xs={12} sm={2}>
                <Grid
                  container={true}
                  justify="center"
                  alignItems="center"
                  direction="column"
                >
                  <PocketsSwapper activePocketType={activePocketType} />
                </Grid>
              </Grid>
              <Grid item={true} xs={12} sm={5}>
                <ExchangingPocket
                  activePocketType={activePocketType}
                  availableAccounts={availableAccounts}
                  onFocus={setActivePocketType}
                  pocket={creditPocket}
                  title="To"
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <ExchangeButton
              availableAccounts={availableAccounts}
              pockets={selectPockets(exchangerState)}
            />
          </CardActions>
        </div>
      </Card>
    </ExchangerContext.Provider>
  );
};

ExchangerPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExchangerPage);
