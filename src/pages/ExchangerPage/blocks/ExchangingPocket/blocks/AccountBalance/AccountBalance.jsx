import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import formatCurrency from 'utilities/formatCurrency';

const styles = () => ({
  container: {
    position: 'relative',
  },
  balance: {},
  button: {
    '&:hover $balance': {
      visibility: 'hidden',
    },
    '&:hover $hint:before': {
      content: '"convert:"',
      paddingRight: '4px',
      position: 'absolute',
      textAlign: 'right',
      width: '100%',
    },
  },
  hint: {
    color: 'gray',
    fontSize: '13px',
    position: 'relative',
    textTransform: 'initial',
  },
});

const AccountBalance = ({
  classes,
  account: { balance, currencyCode },
  onClick: handleClick,
}) => (
  <div className={classes.container}>
    <Button className={classes.button} onClick={handleClick}>
      <span className={classes.hint}>
        <span className={classes.balance}>balance:&nbsp;</span>
      </span>
      <span data-locator="exchanger-pocket-balance-value">
        {formatCurrency(balance, currencyCode)}
      </span>
    </Button>
  </div>
);

AccountBalance.propTypes = {
  account: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    currencyCode: PropTypes.string.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(AccountBalance);
