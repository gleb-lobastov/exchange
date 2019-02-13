import reduceError from 'utilities/reduceError';
import { POCKET_TYPES, E } from '../../consts';
import getOtherPocketType from '../../utilities/getOtherPocketType';
import {
  SET_POCKET_ACCOUNT,
  SET_POCKET_BALANCE,
  UPDATE_EXCHANGE_RATE,
  SWAP_POCKETS,
  EXCHANGE,
} from '../actionTypes';

const checkIsValidPocketType = pocketType =>
  [POCKET_TYPES.DEBIT, POCKET_TYPES.CREDIT].includes(pocketType);

const actualizeBalanceReducer = (
  state = {},
  { invariablePocketType, exchangeRate }, // no need to be FSA compatible, because it's internal
) => {
  const alterablePocketType = getOtherPocketType(invariablePocketType);
  const actualizedBalance =
    invariablePocketType === POCKET_TYPES.DEBIT
      ? state[invariablePocketType].balance * exchangeRate
      : state[invariablePocketType].balance / exchangeRate;

  return {
    ...state,
    [alterablePocketType]: {
      ...state[alterablePocketType],
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
      const { targetPocketType } = meta;
      if (!checkIsValidPocketType(targetPocketType)) {
        return reduceError(state, action, E.INVALID_TARGET_POCKET_TYPE);
      }

      return {
        ...state,
        [targetPocketType]: {
          ...state[targetPocketType],
          accountId: payload,
        },
      };
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
        invariablePocketType: targetPocketType,
        exchangeRate,
      });
    }

    case UPDATE_EXCHANGE_RATE: {
      const { invariablePocketType } = meta;

      if (!checkIsValidPocketType(invariablePocketType)) {
        return reduceError(state, action, E.INVALID_INVARIABLE_POCKET_TYPE);
      }

      return actualizeBalanceReducer(state, {
        invariablePocketType,
        exchangeRate: payload,
      });
    }

    case SWAP_POCKETS: {
      const { activePocketType } = meta;

      if (!checkIsValidPocketType(activePocketType)) {
        return reduceError(state, action, E.INVALID_INVARIABLE_POCKET_TYPE);
      }

      return {
        [POCKET_TYPES.DEBIT]: {
          ...state[POCKET_TYPES.DEBIT],
          accountId: state[POCKET_TYPES.CREDIT].accountId,
          balance: state[POCKET_TYPES.CREDIT].balance,
        },
        [POCKET_TYPES.CREDIT]: {
          ...state[POCKET_TYPES.CREDIT],
          accountId: state[POCKET_TYPES.DEBIT].accountId,
          balance: state[POCKET_TYPES.DEBIT].balance,
        },
      };
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
