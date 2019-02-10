import PropTypes from 'prop-types';
import { POCKET_TYPES } from './consts';

export const accountPropTypes = {
  accountId: PropTypes.number,
  balance: PropTypes.number,
  currencyCode: PropTypes.string,
};

export const pocketType = PropTypes.oneOf(Object.values(POCKET_TYPES));

export const pocketPropTypes = {
  balance: PropTypes.number,
  accountId: PropTypes.number,
};

export const denormalizedPocketPropTypes = {
  pocketType,
  balance: PropTypes.number,
  account: PropTypes.shape(accountPropTypes),
};
