// add account btn
const eventAddAccountBtn = () => {
  addAccountBtnElement.blur();

  // only allow adding accounts if nothing is being edited
  let amountOfAccountsBeingEdited = 0;
  Array.from(document.querySelectorAll('div.tab.all_accounts > ul.accounts > div.account')).forEach((accountEl) => {
    if (accountEl.classList.contains('editing')) {
      amountOfAccountsBeingEdited++;
    }
  });

  // scroll to top
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  if (amountOfAccountsBeingEdited > 0) {
    alert(`Cannot Add New Account: Finish Editing ${amountOfAccountsBeingEdited === 1 ? 'An Account' : 'Accounts'} First`);
    return;
  }

  // when button is clicked, add semi-empty account
  const newAccountID = addAccountToDatabase({
    name: 'Account Name',
    properties: {
      Username: 'undefined',
      Password: 'undefined',
    },
  });

  // refresh database
  refreshVaultDatabase();

  // add block
  addAccountBlock(newAccountID);

  // edit added block
  eventEditBtn(newAccountID);
};

// map add account button onclick to event function
const addAccountBtnElement = document.querySelector('div.tab.all_accounts > nav > div.row > button.add_account');
addAccountBtnElement.addEventListener('click', eventAddAccountBtn);

ipcRenderer.on('menu-add-account', () => {
  openTab(0);
  eventAddAccountBtn();
});
