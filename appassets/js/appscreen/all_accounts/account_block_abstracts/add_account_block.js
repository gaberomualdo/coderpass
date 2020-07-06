// function for adding a given account block
const addAccountBlock = (accountID) => {
  // variable for accounts list HTML element
  const accountsListElement = document.querySelector(
    "div.tab.all_accounts > ul.accounts"
  );

  // add HTML of account block to accounts list element HTML
  accountsListElement.innerHTML =
    getHTMLOfAccountBlock(accountID) + accountsListElement.innerHTML;
};
