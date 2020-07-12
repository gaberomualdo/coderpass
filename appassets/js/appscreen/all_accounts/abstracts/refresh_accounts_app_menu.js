// function to refresh accounts tab in app menu
const refreshAccountsAppMenu = () => {
  ipcRenderer.sendSync(
    'set-accounts-menu',
    Object.keys(vaultContents.accounts)
      .reverse()
      .map((accountID) => {
        return { id: accountID, name: vaultContents.accounts[accountID].name };
      })
  );
};
