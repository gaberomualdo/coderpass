// function when app is opened
const openAppScreen = (passedVaultPassword) => {
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
