import reduceError from 'utilities/reduceError';
import { POCKET_TYPES, E } from '../../consts';
import {
  SET_POCKET_ACCOUNT,
  SET_POCKET_BALANCE,
  SWAP_POCKETS,
  EXCHANGE,
} from '../actionTypes';

const checkIsValidPocketType = pocketType =>
  [POCKET_TYPES.DEBIT, POCKET_TYPES.CREDIT].includes(pocketType);

const getOtherPocketType = pocketType =>
  ({
    [POCKET_TYPES.DEBIT]: POCKET_TYPES.CREDIT,
    [POCKET_TYPES.CREDIT]: POCKET_TYPES.DEBIT,
  }[pocketType]);

const actualizeBalanceReducer = (
  state = {},
  { activePocketType, exchangeRate }, // no need to be FSA compatible, because it's internal
) => {
  const actualizedBalance =
    activePocketType === POCKET_TYPES.DEBIT
      ? state[activePocketType].balance * exchangeRate
      : state[activePocketType].balance / exchangeRate;

  const passivePocketType = getOtherPocketType(activePocketType);
  return {
    ...state,
    [passivePocketType]: {
      ...state[passivePocketType],
      balance: actualizedBalance,
    },
  };
};

export default (state = {}, action) => {
  const { type, payload, meta = {} } = action;

  let actualType = type;
  if (
    type === SET_POCKET_ACCOUNT &&
    payload === state[getOtherPocketType(meta.targetPocketType)].accountId
  ) {
    actualType = SWAP_POCKETS;
  }

  switch (actualType) {
    case SET_POCKET_ACCOUNT: {
      const { targetPocketType, activePocketType, exchangeRate } = meta;
      if (!checkIsValidPocketType(targetPocketType)) {
        return reduceError(state, action, E.INVALID_TARGET_POCKET_TYPE);
      }
      if (!checkIsValidPocketType(activePocketType)) {
        return reduceError(state, action, E.INVALID_ACTIVE_POCKET_TYPE);
      }

      const interimState = {
        ...state,
        [targetPocketType]: {
          ...state[targetPocketType],
          accountId: payload,
        },
      };

      return actualizeBalanceReducer(interimState, {
        activePocketType,
        exchangeRate,
      });
    }

    case SET_POCKET_BALANCE: {
      const { targetPocketType, exchangeRate } = meta;
      if (!checkIsValidPocketType(targetPocketType)) {
        return reduceError(state, action, E.INVALID_TARGET_POCKET_TYPE);
      }
      if (payload < 0) {
        return reduceError(state, action, E.NEGATIVE_BALANCE);
      }
      const interimState = {
        ...state,
        [targetPocketType]: {
          ...state[targetPocketType],
          balance: payload,
        },
      };

      return actualizeBalanceReducer(interimState, {
        activePocketType: targetPocketType,
        exchangeRate,
      });
    }

    case SWAP_POCKETS: {
      const { exchangeRate, activePocketType } = meta;

      if (!checkIsValidPocketType(activePocketType)) {
        return reduceError(state, action, E.INVALID_ACTIVE_POCKET_TYPE);
      }

      const interimState = {
        [POCKET_TYPES.DEBIT]: {
          ...state[POCKET_TYPES.DEBIT],
          accountId: state[POCKET_TYPES.CREDIT].accountId,
        },
        [POCKET_TYPES.CREDIT]: {
          ...state[POCKET_TYPES.CREDIT],
          accountId: state[POCKET_TYPES.DEBIT].accountId,
        },
      };

      return actualizeBalanceReducer(interimState, {
        activePocketType,
        exchangeRate,
      });
    }

    case EXCHANGE: {
      return {
        [POCKET_TYPES.DEBIT]: {
          ...state[POCKET_TYPES.DEBIT],
          balance: 0,
        },
        [POCKET_TYPES.CREDIT]: {
          ...state[POCKET_TYPES.CREDIT],
          balance: 0,
        },
      };
    }

    default:
      return state;
  }
};
