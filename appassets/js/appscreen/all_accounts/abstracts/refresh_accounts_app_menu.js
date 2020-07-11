// function to refresh accounts tab in app menu
const refreshAccountsAppMenu = () => {
  ipcRenderer.sendSync('set-accounts-menu', {
    accountNames: Object.values(vaultContents.accounts)
      .reverse()
      .map((account) => account.name),
  });
};
