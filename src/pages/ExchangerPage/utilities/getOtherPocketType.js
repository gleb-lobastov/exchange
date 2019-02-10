import { POCKET_TYPES } from '../consts';

export default pocketType =>
  ({
    [POCKET_TYPES.DEBIT]: POCKET_TYPES.CREDIT,
    [POCKET_TYPES.CREDIT]: POCKET_TYPES.DEBIT,
  }[pocketType]);
