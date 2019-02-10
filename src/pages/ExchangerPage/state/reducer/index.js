import combineReducers from 'utilities/combineReducers';
import accountsReducer from './accountsReducer';
import pocketsReducer from './pocketsReducer';

export default combineReducers({
  pockets: pocketsReducer,
  accounts: accountsReducer,
});
