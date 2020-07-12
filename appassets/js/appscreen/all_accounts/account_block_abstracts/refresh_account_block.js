// function for refreshing a given account block
const refreshAccountBlock = (accountID) => {
  // variable for account HTML element
  const accountElement = document.querySelector('div.tab.all_accounts > ul.accounts > div.account#accountid_' + accountID);

  // refresh HTML of account element
  if (vaultContents.accounts[accountID]) {
    accountElement.querySelector('section.display').outerHTML = getHTMLOfAccountBlock(accountID, true);
  } else {
    delete codeEditors[accountID];
    accountElement.outerHTML = '';
  }

  // refresh accounts tab in app menu
  refreshAccountsAppMenu();
};
