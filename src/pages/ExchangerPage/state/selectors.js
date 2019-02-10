export const selectAccounts = state => state.accounts;
export const selectPockets = state => state.pockets;
export const selectPocket = (state, pocketType) => {
  const pocketState = state.pockets[pocketType];
  const accounts = selectAccounts(state);
  return {
    ...pocketState,
    pocketType,
    account: accounts[pocketState.accountId],
  };
};
export const selectIsAvailableAccountId = (state, accountId) =>
  Boolean(state.accounts[accountId]);
