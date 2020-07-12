// add account btn
const eventAddAccountBtn = () => {
  addAccountBtnElement.blur();

  // only allow adding accounts if nothing is being edited
  let accountsBeingEdited = false;
  Array.from(document.querySelectorAll('div.tab.all_accounts > ul.accounts > div.account')).forEach((accountEl) => {
    if (accountEl.classList.contains('editing')) {
      accountsBeingEdited = true;
    }
  });

  if (!accountsBeingEdited) {
    // scroll to top
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

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
  } else {
    alert('Please Finish Editing Accounts Before Adding New Ones');
  }
};

// map add account button onclick to event function
const addAccountBtnElement = document.querySelector('div.tab.all_accounts > nav > div.row > button.add_account');
addAccountBtnElement.addEventListener('click', eventAddAccountBtn);

ipcRenderer.on('menu-add-account', () => {
  openTab(0);
  eventAddAccountBtn();
});
