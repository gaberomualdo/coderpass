// function when app is opened
const openAppScreen = (passedVaultPassword) => {
  // add Vault tab to app menu
  ipcRenderer.send('menu-add-vault-tab', '');

  // display app screen and hide auth screen
  document.querySelector('body > div.container > div.auth').classList.remove('active');
  document.querySelector('body > div.container > div.app').classList.add('active');

  document.body.classList.add('appscreen_shown');

  // put vault password into global variable
  vaultPassword = passedVaultPassword;

  // get vault contents and put in variable
  vaultContents = decryptJSONInFile('vault/data.txt', vaultPassword);

  vaultContents.accounts = vaultContents.accounts || {};

  // open all accounts (default) tab
  allAccounts__openTab();
};
