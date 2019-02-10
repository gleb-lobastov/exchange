import { useReducer, useCallback } from 'react';
import { delay } from 'utilities/promises';
import mockExchangeTransaction from '../apiMocks/mockExchangeTransaction';
import { POCKET_TYPES } from '../consts';
import exchangerReducer from '../state/reducer';
import { EXCHANGE_REQUEST } from '../state/actionTypes';

const initialValues = {
  accounts: {
    1: { accountId: 1, balance: Math.random() * 1000, currencyCode: 'USD' },
    2: { accountId: 2, balance: Math.random() * 1000, currencyCode: 'EUR' },
    3: { accountId: 3, balance: Math.random() * 100000, currencyCode: 'RUB' },
  },
  pockets: {
    [POCKET_TYPES.DEBIT]: { balance: 0, accountId: 1 },
    [POCKET_TYPES.CREDIT]: { balance: 0, accountId: 2 },
  },
};

export default () => {
  const [state, dispatch] = useReducer(exchangerReducer, initialValues);
  const enhancedDispatch = useCallback(
    // simulate middleware within reducer hook
    async action => {
      if (action.type === EXCHANGE_REQUEST) {
        await delay(200);
        return dispatch(mockExchangeTransaction(action));
      }
      return dispatch(action);
    },
    [dispatch],
  );
  return [state, enhancedDispatch];
};
